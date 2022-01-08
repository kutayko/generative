let sketch = new p5((p) => {

    p.setup = function () {
        p.createCanvas(600, 600);
        p.background(255);
        p.noFill();
        p.stroke(0);
        p.strokeWeight(4);
        p.angleMode(p.DEGREES);

        let edgeSize = p.width / 10;

        let y = 0;
        while (y + edgeSize <= p.height) {
            let x = 0;
            while (x + edgeSize <= p.width) {
                p.push();
                p.translate(x, y);
                p.rotate(getRotation(y));

                p.rect(0, 0, edgeSize, edgeSize);
                x = x + edgeSize;

                p.pop();
            }
            y = y + edgeSize;
        }
    };

    p.draw = function () {

    };

    getRotation = (y) => {
         return p.random(-1, 1) * p.map(y, 0, p.height, 0, 20);
    };

}, 'p5Container');


