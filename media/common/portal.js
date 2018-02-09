var rx = 0;
var ry = 0;
var rz = 0;
var nx = 0;
var ny = 0;
var nz = 0;

var t;

var a;

var m = 0;

function setup() {
	var c = createCanvas(898, 500);
        c.parent('sketch');
        
        a = createGraphics(898, 500, WEBGL);        
}

function draw() {
	a.background(0,0,0,80);
	a.stroke(255);
        a.strokeWeight(1);
	a.pointLight(255, 255, 255, 200, 200, 100);
	a.ambientLight(220);
	a.noFill();
	//stroke(0);

	t = frameCount / 500;

	if (frameCount % 500 == 0) {
		choose();
	}
	
//	if(nx<0.001){nx=0}else{nx=nx*0.58;};
//	if(ny<0.001){ny=0}else{ny=ny*0.58;};
//	if(nz<0.001){nz=0}else{nz=nz*0.58;};
    
        if(m<0.001){m=0}else{m=m*0.98;};

	rx += nx * m;
	ry += ny * m;
	rz += nz * m;

	a.rotateX(nx*m);
	a.rotateY(ny*m);
	a.rotateZ(nz*m);
	a.box(100, 100, 100);
            
        image(a,0,0);
        fill(255);
        //text(m, 10, 10);
}

function choose(){
	nx = noise(t)-0.5;
	ny = noise(t+10)-0.5;
	nz = noise(t+20)-0.5;
        m = 1;
}

function mouseClicked() {
	choose();
}