const s = (p) => {

    let x = 100;
    let y = 100;

    p.setup = function () {
        p.createCanvas(700, 600);
    };

    p.draw = function () {
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);
    };
};

let myp5 = new p5(s, 'p5Container');