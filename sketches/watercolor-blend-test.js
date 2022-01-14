let sketch = new p5((p) => {

    // Colors
    let COLORS = {
        bg: [40, 50, 97],
        c1: [33, 60, 72],
        c2: [0, 50, 54],
        c3: [249, 40, 55],
        c4: [217, 30, 41]
    };

    p.setup = function () {
        p.createCanvas(600, 600);

        p.colorMode(p.HSL);
        p.background(...COLORS.bg);

        p.noLoop();
    };

    p.draw = function () {
        let blobs = [];

        let div = 8;
        let step = p.width / 6;
        for (let i = 0; i < div; i++) {
            for (let j = 0; j < div; j++) {

                let color;
                if(i < 2) {
                    color = COLORS.c1;
                } else if(i < 3) {
                    color = COLORS.c2;
                } else if (i < 5) {
                    color = COLORS.c3;
                } else {
                    color = COLORS.c4;
                }

                blobs.push(new Watercolor({
                    p,
                    size: p.randomGaussian(50, 25),
                    x: j * step,
                    y: i * step,
                    color: color,
                }));
            }
        }

        Watercolor.draw({
            p,
            blobs,
            overlay: new CanvasOverlay({ p, lineCount: 30000 })
        });
    };

}, 'sketch-container');