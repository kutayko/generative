let sketch = new p5((p) => {

    // Colors
    let COLORS = {
        bg: [40, 50, 97],
        orange: [11, 59, 51],
        purple: [276, 34 , 69],
        blue: [191, 56, 51]
    };

    p.setup = function () {
        p.createCanvas(600, 600);

        p.colorMode(p.HSL);
        p.background(...COLORS.bg);

        p.noLoop();
    };

    p.draw = function () {
        let strokes = [];
        let coordinates = [
            {x: 200, y: 200},
            { x: 400, y: 200 },
            { x: 200, y: 400 },
            { x: 400, y: 400 },
        ];
        let colors = [COLORS.orange, COLORS.purple, COLORS.blue];

        coordinates.map(c => {
            strokes.push(new Watercolor({
                p,
                size: p.randomGaussian(50, 25),
                x: c.x,
                y: c.y,
                color: p.random(colors),
            }));
        });
        Watercolor.draw(strokes);
    };

}, 'sketch-container');