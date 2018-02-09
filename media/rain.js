var drops = [];

var lim = Math.floor(Math.random()*50+1);
var delay = 0;

function setup() {
    var c = createCanvas(898, 500);
    c.parent('sketch');
    colorMode(HSB, 255);
    ellipseMode(CENTER);
    angleMode(DEGREES);
}


function draw() {
    background(0,0,0,100);

    for(var d in drops){
        drops[d].update();
        noFill();
        stroke(255);
        strokeWeight(1);
        push();
        translate(drops[d].pos.x, drops[d].pos.y);
        rotate((drops[d].pos.x-width/2)/width*50);
        if(drops[d].falling){
            line(0, drops[d].pos.z, 0, drops[d].pos.z - drops[d].vel.z/2);
        }else{
            //camera math
            for(var dl in drops[d].droplets){
                noStroke();
                fill(150);
                ellipse(drops[d].droplets[dl].pos.x, drops[d].droplets[dl].pos.z, 1, 1);
                noFill();
                stroke(255);
            }
            stroke(drops[d].maxradius-drops[d].radius);
            ellipse(0,0, drops[d].radius, (drops[d].radius/2)*drops[d].pos.y/(height*1.5)+drops[d].radius/2);
        }
        if(!drops[d].alive){
            drops.splice(d,1);
        }
        pop();
    }

    if(frameCount%lim==0){
        if(delay > 0){
            delay--;
        }
        if(delay < 50){
            drops.push(new Drop(createVector(random(width), random(height), -1000)));
            lim = Math.floor(Math.random()*(10 + delay)+(1));
        }
    }
    fill(255);
    //text(drops.length + " " + lim + " " + delay, 10, 10);
    noFill();
}

function mouseClicked() {
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        drops.push(new Drop(createVector(mouseX, mouseY, -1000)));
        delay = 60;
        lim = 25;
    }
}

function Drop(position) {
    this.acc = createVector(0, 0, height/500);
    this.vel = createVector(0, 0, 0);
    this.pos = position; //x y h
    this.oldpos;
    this.droplets = [];
    this.falling = true; //signal to logic that this object should be destroyed after its done working
    this.radius = 0;
    this.maxradius;
    this.alive = true; //signal to logic that this object should be destroyed after its done working

    this.update = function() {
        if(this.falling){
            this.oldpos = this.pos;
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            if(this.pos.z >= 0) this.falling = false;
        }else{

            if(this.droplets.length == 0){
                for(var d = 0; d < Math.floor(random(4)); d++){
                    this.droplets.push(new Droplet(createVector(0,0,0)));
                }
                this.maxradius = random(100, 255);
            }

            for(var d in this.droplets){
                this.droplets[d].update();
            }

            this.radius+=4;
            if(this.radius >= this.maxradius){
                this.alive = false;
            }
        }
    }
}

function Droplet(position){
    this.acc = createVector(0, 0, 0.04);
    this.vel = createVector(random(-width/500, width/500), 0, random(height/500, -height/250));
    this.pos = position; //x y h

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
}