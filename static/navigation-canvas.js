// forked from akm2's "Particle Triangulation" http://jsdo.it/akm2/cu5u
// Configs
var PARTICLE_NUM = 25; // 開始時分割点数
var PARTICLE_MAX_NUM = 50; // 最大分割点数
var PARTICLE_DEF_SPEED_MAX = 1; // 分割点の最大初速
var PARTICLE_DEF_SPEED_MIN = 0.5; // 分割点の最小初速
var BACKGROUND_COLOR = '#eff1ea'; // 背景色
var LINE_COLOR = '#303030'; // 線の色
var FILL_COLORS = [ // 塗りに使用する色, 三角形の生成順に選択される
    '#00cbd6', '#83d302', '#e80051', '#2087db', '#f4d002',
    '#eda3d4', '#2e8720', '#ea2ebb', '#213877', '#fc771e',
    '#a6dbd9', '#c8e067', '#ed5131', '#e2d9d9', '#f4eea8'
];
var RIPPLE_RADIUS = 15; // 分割点追加時のエフェクトの半径

// Constants
var PATTERNS_URL = [ // パターンの画像 URL, 三角形の生成順に選択される
    'http://jsrun.it/assets/o/S/2/H/oS2Hk.png',
    'http://jsrun.it/assets/a/O/9/d/aO9d8.png',
    'http://jsrun.it/assets/y/b/y/3/yby3x.png',
    'http://jsrun.it/assets/a/Q/Z/h/aQZhn.png',
    'http://jsrun.it/assets/i/F/Y/g/iFYgC.png',
    'http://jsrun.it/assets/8/i/5/b/8i5bd.png'
];

// Vars
var canvas, context;
var screenWidth, screenHeight;
var delaunay;
var particles = [];
var colorIndex = 0;
var colorTable = {};
var patterns = [];
var patternIndex = 0;
var patternTable = {};
var backgroundPattern;
var ripples = [];

/**
 * requestAnimationFrame
 */
var requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

/**
 * Init
 */
function init() {
    document.body.style.backgroundColor = BACKGROUND_COLOR;
    
    canvas = document.getElementById('navigation-canvas');
    console.log('hoge');
    
    //window.addEventListener('resize', resize, false);
    //resize(null);
    
    delaunay = new Delaunay(screenWidth, screenHeight);
    
    var i;
    
    for (i = 0; i < PARTICLE_NUM; i++) {
        addParticle(Math.random() * (screenWidth - 150) + 75, Math.random() * (screenHeight - 150) + 75);
    }
    
    var len, img;
    var count = PATTERNS_URL.length;
    
    // パターン画像をロード
    for (i = 0, len = PATTERNS_URL.length; i < len; i++) {
        img = new Image();
        img.addEventListener('load', function(e) {
            patterns.push(context.createPattern(e.target, 'repeat'));
            
            // ロードが完了したら, アニメーションを開始
            if (--count === 0) {
                // 背景用パターンを選択
                backgroundPattern = patterns[Math.floor(patterns.length * Math.random())];
                // パターンにパターン無しを追加
                patterns.push('rgba(0, 0, 0, 0)');
                
                document.addEventListener('click', click, false);
                requestAnimationFrame(loop);
            }
        });
        img.src = PATTERNS_URL[i];
    }
}

/**
 * Resize event handler
 */
function resize(e) {
    screenWidth = canvas.width = window.innerWidth;
    screenHeight = canvas.height = window.innerHeight;
    context = canvas.getContext('2d');
    context.lineWidth = 3;
    context.strokeStyle = LINE_COLOR;
    context.lineCap = context.lineJoin = 'round';
    
    if (delaunay) {
        delaunay.width = screenWidth;
        delaunay.height = screenHeight;
    }
}

/**
 * Mouse click event handler
 */
function click(e) {
    addParticle(e.clientX, e.clientY, true);
}

/**
 * Animation loop
 */
function loop() {
    var TWO_PI = Math.PI * 2;
    var w = screenWidth;
    var h = screenHeight;
    var ctx = context;
    
    ctx.save();
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, screenWidth, screenHeight);
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = backgroundPattern;
    ctx.fillRect(0, 0, screenWidth, screenHeight);
    ctx.restore();
    
    // 三角形をクリア
    delaunay.clear();
    
    var i, len, p;
    var dx, dy, distSq, ax, ay;
    
    // 分割点の処理
    for (len = particles.length, i = 0; i < len; i++) {
        p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        
        // 反射
        if (p.x < 0) {
            p.x = 0;
            if (p.vx < 0) p.vx *= -1;
        }
        if (p.x > w) {
            p.x = w;
            if (p.vx > 0) p.vx *= -1;
        }
        if (p.y < 0) {
            p.y = 0;
            if (p.vy < 0) p.vy *= -1;
        }
        if (p.y > h) {
            p.y = h;
            if (p.vy > 0) p.vy *= -1;
        }
    }
    
    // 三角形分割して三角形を取得
    var triangles = delaunay.multipleInsert(particles).getTriangles();
    
    var t, id, p0, p1, p2;
    var ct = colorTable;
    var pt = patternTable;
    var cl = FILL_COLORS.length;
    var pl = patterns.length;
    
    // 描画
    for (len = triangles.length, i = 0; i < len; i++) {
        t = triangles[i];
        id = t.id;
        p0 = t.nodes[0];
        p1 = t.nodes[1];
        p2 = t.nodes[2];
        
        // 四隅に接する三角形 (いずれかのノードの識別子が null -> 三角形の識別子が null) の場合は描画をスキップ
        if (id === null) continue;
        
        // 三角形ごとの描画スタイルを決定, 色とパターンを三角形の ID に応じて振り分ける
        if (!ct[id]) {
            ct[id] = FILL_COLORS[colorIndex];
            colorIndex = (colorIndex + 1) % cl;
        }
        if (!pt[id]) {
            pt[id] = patterns[patternIndex];
            patternIndex = (patternIndex + 1) % pl;
        }
        
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        // 描画色で塗る
        ctx.fillStyle = ct[id];
        ctx.fill();
        // パターンで塗る, 三角形の位置と傾きに応じて変形
        ctx.translate(p0.x, p0.y);
        ctx.rotate(Math.atan2(p0.y - p1.y, p0.x - p1.x));
        ctx.fillStyle = pt[id];
        ctx.fill();
        // 線を引く
        ctx.stroke();
        ctx.restore();
    }
    
    // 波紋があれば描画
    var r;
    for (len = ripples.length, i = 0; i < len; i++) {
        r = ripples[i];
        
        if (r.death) {
            ripples.shift(i, 1);
            len--;
            i--;
        }
        
        r.update();
        
        p = r.particle;
        
        ctx.beginPath();
        ctx.moveTo(p.x + r.radius, p.y);
        ctx.arc(p.x, p.y, r.radius, 0, TWO_PI, false);
        ctx.fillStyle = LINE_COLOR;
        ctx.fill();
    }
    
    // デバッグ用, true で外接円を描画する
    if (false) {
        var r;
        ctx.beginPath();
        for (i = 0; i < len; i++) {
            t = triangles[i];
            if (t.id === null) continue;
            r = Math.sqrt(t._circle.radiusSq);
            ctx.moveTo(t._circle.x + r, t._circle.y);
            ctx.arc(t._circle.x, t._circle.y, r, 0, Math.PI * 2, false);
        }
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.restore();
    }
    
    requestAnimationFrame(loop);
}

/**
 * Add particle
 */
function addParticle(x, y, rippleOut) {
    if (particles.length >= PARTICLE_MAX_NUM) {
        particles.shift();
        addParticle(x, y, rippleOut);
        return;
    }
    var p = new Particle(x, y);
    var l = (PARTICLE_DEF_SPEED_MAX - PARTICLE_DEF_SPEED_MIN) * Math.random() + PARTICLE_DEF_SPEED_MIN;
    var a = Math.PI * 2 * Math.random();
    p.vx = l * Math.cos(a);
    p.vy = l * Math.sin(a);
    particles.push(p);
    if (rippleOut) ripples.push(new Ripple(p));
}


//-----------------------------
// CLASS
//-----------------------------

/**
 * Ripple
 */
function Ripple(p) {
    this.particle = p;
}

Ripple.prototype = {
    _TARGET_RADIUS: RIPPLE_RADIUS,
    _PI: Math.PI,
    
    radius: 0,
    death: false,
    _radian: 0,
    
    update: function() {
        if (this.death) return;
        
        this._radian += 0.15;
        if (this._radian > this._PI) {
            this.radius = 0;
            this.death = true;
            return;
        }
        
        this.radius = Math.sin(this._radian) * this._TARGET_RADIUS;
    }
}

/**
 * Delaunay
 */
var Delaunay = (function() {
    
    /**
     * Node
     * 
     * @param {Number} x
     * @param {Number} y
     * @param {Number} id
     */
    function Node(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = !isNaN(id) && isFinite(id) ? id : null;
    }
    
    Node.prototype = {
        eq: function(p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            return (dx < 0 ? -dx : dx) < 0.0001 && (dy < 0 ? -dy : dy) < 0.0001;
        },
        
        toString: function() {
            return '(x: ' + this.x + ', y: ' + this.y + ')';
        }
    };

    /**
     * Edge
     * 
     * @param {Node} p0
     * @param {Node} p1
     */
    function Edge(p0, p1) {
        this.nodes = [p0, p1];
    }
    
    Edge.prototype = {
        eq: function(edge) {
            var na = this.nodes, nb = edge.nodes;
            var na0 = na[0], na1 = na[1], nb0 = nb[0], nb1 = nb[1];
            return (na0.eq(nb0) && na1.eq(nb1)) || (na0.eq(nb1) && na1.eq(nb0));
        }
    };
    
    /**
     * Triangle
     * 
     * @param {Node} p0
     * @param {Node} p1
     * @param {Node} p2
     */
    function Triangle(p0, p1, p2) {
        this.nodes = [p0, p1, p2];
        this.edges = [new Edge(p0, p1), new Edge(p1, p2), new Edge(p2, p0)];
        this._createId();
        this._createCircumscribedCircle();
    }

    Triangle.prototype = {
        id: null, // ノードの組み合わせによる識別子
        _circle: null, // 外接円
        
        /**
         * ノードの組み合わせによる識別子を作成する
         * 識別子の設定されていないノードがある場合 id は null
         */
        _createId: function() {
            var nodes = this.nodes;
            var id0 = nodes[0].id;
            var id1 = nodes[1].id;
            var id2 = nodes[2].id;
            if (id0 !== null && id1 !== null && id2 !== null) {
                this.id = [id0, id1, id2].sort().join('_');
            }
        },
        
        /**
         * この三角形の外接円を作成する
         */
        _createCircumscribedCircle: function() {
            var nodes = this.nodes;
            var p0 = nodes[0];
            var p1 = nodes[1];
            var p2 = nodes[2];

            var ax = p1.x - p0.x, ay = p1.y - p0.y;
            var bx = p2.x - p0.x, by = p2.y - p0.y;
            var c = 2 * (ax * by - ay * bx);

            var t = (p1.x * p1.x - p0.x * p0.x + p1.y * p1.y - p0.y * p0.y);
            var u = (p2.x * p2.x - p0.x * p0.x + p2.y * p2.y - p0.y * p0.y);
            
            if (!this._circle) this._circle = {};

            var circle = this._circle;
            circle.x = ((p2.y - p0.y) * t + (p0.y - p1.y) * u) / c;
            circle.y = ((p0.x - p2.x) * t + (p1.x - p0.x) * u) / c;

            var dx = p0.x - circle.x;
            var dy = p0.y - circle.y;
            circle.radiusSq = dx * dx + dy * dy;
        },
        
        /**
         * 座標がこの外接円に含まれるか示す
         */
        circleContains: function(p) {
            var circle = this._circle;
            var dx = circle.x - p.x;
            var dy = circle.y - p.y;
            var distSq = dx * dx + dy * dy;
            
            return distSq < circle.radiusSq;
        }
    };
    
    
    /**
     * Delaunay
     * 
     * @param {Number} width
     * @param {Number} height
     */
    function Delaunay(width, height) {
        this.width = width;
        this.height = height;
        
        this._triangles = null;
        
        this.clear();
    }

    Delaunay.prototype = {
        
        clear: function() {
            var p0 = new Node(0, 0);
            var p1 = new Node(this.width, 0);
            var p2 = new Node(this.width, this.height);
            var p3 = new Node(0, this.height);
            
            this._triangles = [
                new Triangle(p0, p1, p2),
                new Triangle(p0, p2, p3)
            ];
            
            return this;
        },
        
        multipleInsert: function(m) {
            for (var i = 0, len = m.length; i < len; i++) {
                this.insert(m[i]);
            }
            
            return this;
        },
        
        insert: function(p) {
            var triangles = this._triangles;
            var t;
            var temps = [];
            var edges = [];
            
            var i, ilen;

            for (ilen = triangles.length, i = 0; i < ilen; i++) {
                t = triangles[i];
                
                // 座標が三角形の外接円に含まれるか調べる
                if (t.circleContains(p)) {
                    // 含まれる場合三角形の辺を保存
                    edges.push(t.edges[0], t.edges[1], t.edges[2]);
                } else {
                    // 含まれない場合は持ち越し
                    temps.push(t);
                }
            }
            
            var edge;
            var polygon = [];
            var j, jlen;
            var isDuplicate;

            // 辺の重複をチェック, 重複する場合は削除する
            edgesLoop: for (ilen = edges.length, i = 0; i < ilen; i++) {
                edge = edges[i];
                
                // 辺を比較して重複していれば削除
                for (jlen = polygon.length, j = 0; j < jlen; j++) {
                    if (edge.eq(polygon[j])) {
                        polygon.splice(j, 1);
                        continue edgesLoop;
                    }
                }
                
                polygon.push(edge);
            }
            
            for (ilen = polygon.length, i = 0; i < ilen; i++) {
                edge = polygon[i];
                temps.push(new Triangle(edge.nodes[0], edge.nodes[1], p));
            }
            
            this._triangles = temps;
            
            return this;
        },
        
        getTriangles: function() {
            return this._triangles.slice();
        }
    };
    
    Delaunay.Node = Node;
    
    return Delaunay;
    
})();


/**
 * Particle
 * 
 * @param {Number} x
 * @param {Number} y
 * @super Delaunay.Node
 */
var Particle = (function(Node) {
    
    // 生成順に数値の ID を付与する
    var currentId = 0;
    function getId() { return currentId++; }
    
    function Particle(x, y) {
        Node.call(this, x, y, getId());
        this.vx = 0;
        this.vy = 0;
    }

    Particle.prototype = new Node();

    return Particle;
    
})(Delaunay.Node);


// Init
window.addEventListener('load', init, false);