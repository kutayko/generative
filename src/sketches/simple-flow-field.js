// Colors
const COLORS = {
    bg: [40, 50, 97],
    fg: [210, 29, 22]
};

let res = 10;
let inc = 0.1;

let zoff = 0;
let rows;
let cols;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-container');

    colorMode(HSL);
    stroke(...COLORS.fg);
    noFill();

    rows = height / res;
    cols = width / res;
}

function draw() {
    background(...COLORS.bg);

    let yoff = 0;
    for(let row=0; row < rows; row++) {
        let xoff = 0;
        for(let col=0; col < cols; col++) {
            let n = noise(xoff, yoff, zoff) * TWO_PI;

            let v = p5.Vector.fromAngle(n);
            push();
            translate(col * res, row * res);
            rotate(v.heading());
            line(0, 0, res, 0);
            pop();


            xoff += inc;
        }
        yoff += inc;
        zoff += 0.0001;
    }

}