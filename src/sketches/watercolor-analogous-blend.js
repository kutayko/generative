let sketch = new p5((p) => {

    // Colors
    let COLORS = {
        bg: [40, 50, 97],
        b1: [190, 80, 80],
        b2: [200, 60, 60],
        b3: [215, 40, 40],
        o1: [11, 59, 80]
    };

    p.setup = function () {
        p.createCanvas(600, 600);

        p.colorMode(p.HSL);
        p.background(...COLORS.bg);

        p.noLoop();
    };

    p.draw = function () {
        let strokes = [];

        for(let i=1; i < 7; i++) {
            for(let j=1; j < 7; j++) {

                let color;
                if(j < 2) {
                    color = COLORS.b1;
                } else if( j < 5) {
                    color = COLORS.b2;
                } else {
                    color = COLORS.b3;
                }

                strokes.push(new Watercolor({
                    p,
                    size: p.randomGaussian(50, 25),
                    x: i * 100,
                    y: j * 100,
                    color: color,
                }));
            }
        }

        Watercolor.draw(strokes);

        p.strokeWeight(2);
        p.noFill();
        let step = 30;
        for(let i=0; i < p.width; i+=step) {
            p.stroke(...COLORS.o1, 0.5 - i * 0.001);
            p.circle(300, 300, 50 + i);
        }
    };

}, 'sketch-container');