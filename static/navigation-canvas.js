// forked from akm2's "Abstriangulation" http://jsdo.it/akm2/wTcC
// Configs
var LINE_COLOR = '#FFFFFF'; // 線の色
var FILL_COLORS = [ // 塗りに使用する色, 三角形の生成順に選択される
    '#55c600', '#71c600', '#71f600', '#aac600', '#c6c600',
    '#aae200', '#aad400', '#aac600', '#c6c600', '#ffc600',
    '#fa0', '#ff9c00', '#e28d00', '#e2aa00', '#ff7100'
];
var PARTICLE_MAX_COLUMN = 64;
var PARTICLE_START_X = -48;
var PARTICLE_START_Y = 20;
var PARTICLE_INTERVAL = 36;
var PARTICLE_ROW = 5;

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

var canvasIsPlaying = true;

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
    context.lineWidth = 0.6;
    context.strokeStyle = LINE_COLOR;
    context.lineCap = context.lineJoin = 'round';

    console.log(canvas.width);
    console.log(canvas.height);
    
    // for (var i = 0; i < PARTICLE_NUM; i++) {
    //     addParticle(Math.random() * (canvas.width + 40) - 20, Math.random() * (canvas.height - 80) + 40);
    // }

    triangles = [];

    var particleColumn = Math.floor(Math.min((canvas.width + 96) / PARTICLE_INTERVAL,PARTICLE_MAX_COLUMN));

    for(var i = 0; i < PARTICLE_ROW; i++) {
        for(var j = 0; j < particleColumn; j++){
            let x = PARTICLE_START_X + (PARTICLE_INTERVAL * (j+(i%2==0?0:0.5))) + (Math.random() - 0.5)*16;
            let y = PARTICLE_START_Y + (PARTICLE_INTERVAL * 0.2 * i) + (i*i*6) + (Math.random() - 0.5)*4*i;
            addParticle(x, y, i+3);
            if(i != 0 && j != 0) {
                if(!(i%2==0 && j==1)) {
                    triangles.push(new Triangle(
                        particles[particleColumn*(i-1)+j-1],
                        particles[particleColumn*i+j-1],
                        particles[particleColumn*(i-1)+j])); //v形
                }
                triangles.push(new Triangle(
                    particles[particleColumn*i+j-1],
                    particles[particleColumn*(i-1)+j],
                    particles[particleColumn*i+j])); //∧形
            }
        }
    }

    delaunay = new Delaunay(canvas.width, canvas.height);

    //triangles = delaunay.multipleInsert(particles).getTriangles();
    
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

    ctx.clearRect(0,0,w,h);
    
    // 三角形をクリア
    delaunay.clear();
    
    var i, len, p;
    var dx, dy, distSq, ax, ay;
    
    // 分割点の処理
    for (len = particles.length, i = 0; i < len; i++) {
        p = particles[i];
        
        p.vy = (Math.sin(frame*0.001*TWO_PI+p.x*0.01) * 4
         + Math.sin(-frame*0.001*TWO_PI+p.x*0.02) * 2)
          * p.z
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
        ctx.moveTo(p0.x + p0.vx, p0.y + p0.vy);
        ctx.lineTo(p1.x + p1.vx, p1.y + p1.vy);
        ctx.lineTo(p2.x + p2.vx, p2.y + p2.vy);
        ctx.closePath();
        // 描画色で塗る
        ctx.fillStyle = ct[id];
        ctx.globalAlpha = p0.z*0.25 - 0.6;
        ctx.fill();
        // パターンで塗る, 三角形の位置と傾きに応じて変形
        // ctx.translate(p0.x, p0.y);
        // ctx.rotate(Math.atan2(p0.y - p1.y, p0.x - p1.x));
        // ctx.fillStyle = pt[id];
        // ctx.fill();
        // 線を引く
        ctx.stroke();
        ctx.restore();
    }
    for(len = particles.length, i = 0; i < len; i++) {
        p = particles[i];
        ctx.beginPath();
        ctx.moveTo(p.x + p.vx + 2, p.y + p.vy);
        ctx.arc(p.x + p.vx, p.y + p.vy, 2, 0, TWO_PI, false);
        ctx.fillStyle = LINE_COLOR;
        ctx.globalAlpha = p.z*0.2 - 0.5;
        ctx.fill();
    }

    // Draw Fog
    // context.beginPath();
    // context.rect(0,0,w,h);
    // var grdLinear = context.createLinearGradient(0, 0, 0, h);
    // grdLinear.addColorStop(0, "rgba(247, 247, 247, 0.5)");
    // grdLinear.addColorStop(1, 'rgba(247, 247, 247, 0)');
    // context.fillStyle = grdLinear;
    // context.fill();  
    // context.closePath();
    
    if(canvasIsPlaying) requestAnimationFrame(loop);
}

/**
 * Add particle
 */
function addParticle(x, y, z) {
    var p = new Particle(x, y);
    p.vx = 0;
    p.vy = 0;
    p.z = z;
    particles.push(p);
}

function Triangle(p0, p1, p2) {
    this.nodes = [p0, p1, p2];
    this.edges = [new Edge(p0, p1), new Edge(p1, p2), new Edge(p2, p0)];
    this._createId();
}

Triangle.prototype = {
    id: null, // ノードの組み合わせによる識別子
    
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
    }
}
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
function Edge(p0, p1) {
    this.nodes = [p0, p1];
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
 * @super Node
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
    
})(Node);


// Init
//window.addEventListener('load', init, false);