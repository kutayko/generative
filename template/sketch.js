let sketch = new p5((p) => {

    // Colors
    let bgColor = [40, 50, 97];
    let fgColor = [210, 29, 22];

    p.setup = function () {
        p.createCanvas(600, 600);
        p.colorMode(p.HSL);
        p.background(...bgColor);
        p.stroke(...fgColor);
        p.fill(...bgColor);

    };

    p.draw = function () {

    };

}, 'p5Container');