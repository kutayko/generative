// Colors
const COLORS = {
    bg: [40, 50, 97],
    fg: [210, 29, 22]
};

let res;

let flowField = [];
let noiseInc;
let timeInc;
let maxVectorAngle;
let vectorMag;

let particles;
let particleCount;

let zoff = 0;
let rows;
let cols;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');
    background(255);

    // settings
    res = 10;
    noiseInc = 0.1;
    timeInc = 0.0005;
    maxVectorAngle = TWO_PI * 4;
    vectorMag = 0.5;
    particleCount = 300;

    rows = height / res;
    cols = width / res;

    particles = [...Array(particleCount)].map(p => new Particle(res));
}

function draw() {
    stroke(0, 50);
    noFill();

    let yoff = 0;
    for(let row=0; row < rows; row++) {
        let fieldRow = [];
        let xoff = 0;
        for(let col=0; col < cols; col++) {
            let n = noise(xoff, yoff, zoff) * maxVectorAngle;

            let v = p5.Vector.fromAngle(n);
            v.setMag(vectorMag);
            fieldRow.push(v);

            // // draw vectors
            // push();
            // translate(col * res, row * res);
            // rotate(v.heading());
            // line(0, 0, res, 0);
            // pop();


            xoff += noiseInc;
        }

        flowField.push(fieldRow);

        yoff += noiseInc;
        zoff += timeInc;
    }

    particles.map(particle => {
        particle.follow(flowField);
        particle.update();
        particle.show();
    });

}