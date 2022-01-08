let sketch = new p5((p) => {

    // Colors
    let bgColor = [40, 50, 97];
    let fgColor = [210, 29, 22];

    let x = 0;
    let y = 0;
    let a = 15;

    p.setup = function () {
        p.createCanvas(600, 600);
        p.colorMode(p.HSL);
        p.background(...bgColor);
        p.stroke(...fgColor);
        p.fill(...bgColor);
    };

    p.draw = function () {
        if (p.random() < 0.5) {
            p.line(x, y, x + a, y + a);
        } else {
            p.line(x, y + a, x + a, y);
        }
        
        x = x + a;
        if (x > p.width) {
            x = 0;
            y = y + a;
        }
    };

}, 'p5Container');