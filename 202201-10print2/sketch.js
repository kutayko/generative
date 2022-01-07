let sketch = new p5((p) => {

    let x = 0;
    let y = 0;
    let a = 15;

    p.setup = function () {
        p.createCanvas(600, 600);
        p.background(255);
        p.stroke(0);
    };

    p.draw = function () {
        let r = p.random();
        if (r < 0.25) {
            p.line(x, y, x, y + a);
        } else if (r < 0.50) {
            p.line(x, y, x + a, y + a);
        } else if (r < 0.75) {
            p.line(x, y + a, x + a, y);
        } else {
            p.line(x, y + a, x + a, y + a);
        }
        
        x = x + a;
        if (x > p.width) {
            x = 0;
            y = y + a;
        }
    };

}, 'p5Container');