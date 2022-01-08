let sketch = new p5((p) => {

    let x = 0;
    let y = 0;

    p.setup = function () {
        p.createCanvas(600, 600);
        p.background(255);
        p.stroke(0);
    };

    p.draw = function () {

    };

}, 'p5Container');