let sketch = new p5((p) => {

    // Colors
    let COLORS = {
        bg: [40, 50, 97],
        s1: {
            gradient: [
                [229, 41, 37],
                [455, 31, 65]
            ],
            clouds: [
                [33, 60, 72],
                [40, 50, 97],
                [214, 45, 90],
                [300, 34, 70]
            ]
        },

        s2: {
            gradient: [
                [203, 60, 37],
                [196, 67, 82]
            ],
            clouds: [
                [33, 40, 86],
                [214, 45, 90],
                [40, 30, 87],
                [40, 50, 97]
            ]
        }
    };

    p.setup = function () {
        p.createCanvas(1600, 900);

        p.colorMode(p.HSL);
        p.background(...COLORS.bg);

        p.noLoop();
    };

    p.draw = function () {
        let colors = COLORS.s2;

        // background gradient
        for (let i = 0; i < p.height; i++) {
            let c = p.lerpColor(
                p.color(colors.gradient[0]),
                p.color(colors.gradient[1]),
                p.map(i, 0, p.height, 0, 1)
            );
            p.stroke(c);
            p.line(0, i, p.width, i);
        }

        let blobs = [];
        let div = 8;
        let step = p.width / 8;

        for (let i = 3; i < div - 2; i++) {
            for (let j = 0; j < div; j++) {

                blobs.push(new Watercolor({
                    p,
                    size: p.randomGaussian(100, 25),
                    x: j * step,
                    y: i * step,
                    color: p.random([
                        COLORS.bg, colors.clouds[0], colors.clouds[1], colors.clouds[2], colors.clouds[3]
                    ])
                }));
            }
        }

        Watercolor.draw({
            p,
            blobs
        });
    };

}, 'sketch-container');
