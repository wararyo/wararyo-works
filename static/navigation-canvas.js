// forked from akm2's "Particle Triangulation" http://jsdo.it/akm2/cu5u
// Configs
var PARTICLE_NUM = 25; // 開始時分割点数
var PARTICLE_MAX_NUM = 25; // 最大分割点数
var PARTICLE_DEF_SPEED_MAX = 0.2; // 分割点の最大初速
var PARTICLE_DEF_SPEED_MIN = 0.1; // 分割点の最小初速
var BACKGROUND_COLOR = '#eff1ea'; // 背景色
var LINE_COLOR = '#FFFFFF'; // 線の色
var FILL_COLORS = [ // 塗りに使用する色, 三角形の生成順に選択される
    '#55c600', '#71c600', '#71f600', '#aac600', '#c6c600',
    '#aae200', '#aad400', '#aac600', '#c6c600', '#ffc600',
    '#fa0', '#ff9c00', '#e28d00', '#e2aa00', '#ff7100'
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
var delaunay;
var triangles;
var particles = [];
var colorIndex = 0;
var colorTable = {};
var patterns = [];
var patternIndex = 0;
var patternTable = {};
var backgroundPattern;
var frame = 0;

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
    
    canvas = document.getElementById('navigation-canvas');

    canvas.height = 200;
    canvas.width = window.innerWidth;

    context = canvas.getContext('2d');
    context.lineWidth = 1;
    context.strokeStyle = LINE_COLOR;
    context.lineCap = context.lineJoin = 'round';

    console.log(canvas.width);
    console.log(canvas.height);
    
    for (var i = 0; i < PARTICLE_NUM; i++) {
        addParticle(Math.random() * (canvas.width + 40) - 20, Math.random() * (canvas.height - 80) + 40);
    }

    delaunay = new Delaunay(canvas.width, canvas.height);

    triangles = delaunay.multipleInsert(particles).getTriangles();
    
    if (delaunay) {
        delaunay.width = canvas.width;
        delaunay.height = canvas.height;
    }

    patterns.push('rgba(0, 0, 0, 0)');
    backgroundPattern = patterns[Math.floor(patterns.length * Math.random())];
    //document.addEventListener('click', click, false);
    requestAnimationFrame(loop);
}

/**
 * Resize event handler
 */
function resize(e) {
    screenWidth = canvas.width = window.innerWidth;
    screenHeight = canvas.height = window.innerHeight;
}

/**
 * Animation loop
 */
function loop() {
    var TWO_PI = Math.PI * 2;
    var w = canvas.width;
    var h = canvas.height;
    var ctx = context;

    frame++;
    
    /*ctx.save();
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();*/
    ctx.clearRect(0,0,w,h);
    
    // 三角形をクリア
    delaunay.clear();
    
    var i, len, p;
    var dx, dy, distSq, ax, ay;
    
    // 分割点の処理
    for (len = particles.length, i = 0; i < len; i++) {
        p = particles[i];
        
        p.y += Math.sin(frame*0.001*TWO_PI+p.x*0.01) * 0.1
    }
    
    // 三角形分割して三角形を取得
    //triangles = delaunay.multipleInsert(particles).getTriangles();
    
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
    for(len = particles.length, i = 0; i < len; i++) {
        p = particles[i];
        ctx.beginPath();
        ctx.moveTo(p.x + 3, p.y);
        ctx.arc(p.x, p.y, 3, 0, TWO_PI, false);
        ctx.fillStyle = LINE_COLOR;
        ctx.fill();
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
//window.addEventListener('load', init, false);