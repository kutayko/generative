let sketch = new p5((p) => {

    // Colors
    let COLORS = {
        bg: [40, 50, 97],
        c1: [33, 60, 72],
        c2: [40, 50, 97],
        c3: [214, 45, 90],
        c4: [300, 34, 70]
    };

    p.setup = function () {
        p.createCanvas(1600, 900);

        p.colorMode(p.HSL);
        p.background(...COLORS.bg);

        p.noLoop();
    };

    p.draw = function () {
        // background gradient
        for (let i = 0; i < p.height; i++) {
            p.stroke(
                p.map(i, p.height, 0, 455, 229),
                p.map(i, p.height, 0, 31, 41),
                p.map(i, p.height, 0, 65, 37)
            );
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
                    color: p.random([COLORS.bg, COLORS.c1, COLORS.c2, COLORS.c3, COLORS.c4])
                }));
            }
        }

        Watercolor.draw({
            p,
            blobs,
            // overlay: new CanvasOverlay({ p, lineCount: 100000 })
        });
    };

    let disperseMask = () => {
        pImg = p.get();
        p.background(...COLORS.bg);

        let twothirds = p.width / 3 * 2;
        let alphaMask = p.createGraphics(p.width, p.height);
        alphaMask.fill('black');
        alphaMask.rect(0, 0, twothirds, p.height);
        for (i = 0; i < 20; i++) {
            alphaMask.rect(twothirds + fibonacci(i) + 12 * i, 0, 10, p.height);
        }

        pImg.mask(alphaMask);
        p.image(pImg, 0, 0);
    }

}, 'sketch-container');

let fibonacci = (n) => {
    if(n == 0) { return 0; }
    if(n == 1) { return 1; }
    return fibonacci(n - 1) + fibonacci(n - 2);
};