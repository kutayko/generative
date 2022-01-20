// Colors
const COLORS = {
    bg: [40, 50, 97],
    fg: [210, 29, 22]
};

let res = 10;
let inc = 0.1;
let particleCount = 100;

let zoff = 0;
let rows;
let cols;

let particles;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');

    // colorMode(HSL);
    stroke(0, 50);
    noFill();

    rows = height / res;
    cols = width / res;


    particles = Array(particleCount).fill(new Particle());
}

function draw() {
    background(255);

    let yoff = 0;
    for(let row=0; row < rows; row++) {
        let xoff = 0;
        for(let col=0; col < cols; col++) {
            let n = noise(xoff, yoff, zoff) * TWO_PI;
            
            let v = p5.Vector.fromAngle(n);
            push();
            translate(col * res, row * res);
            line(0, 0, v.x * res, v.y * res);
            pop();


            xoff += inc;
        }
        yoff += inc;
        // zoff += 0.0001;
    }

    particles.map(particle => {
        particle.update();
        particle.show();
    });

}