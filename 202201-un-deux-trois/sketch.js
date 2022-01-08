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
        p.strokeWeight(4);

        p.angleMode(p.DEGREES);

        let lineSizeX = 20;
        let lineSizeY = 20;

        let y = 0;
        while (y < p.height) {
            let x = 0;
            while (x < p.width) {
                p.push();

                p.translate(x + lineSizeX / 2, y + lineSizeY / 2); // rotate from center
                p.rotate(p.random(-90, 90));
                p.translate(-lineSizeX / 2, -lineSizeY / 2); // draw from 0,0

                if(y < p.height / 3) {
                    p.line(lineSizeX / 2, 0, lineSizeX / 2, lineSizeY);
                } else if (y < p.height / 3 * 2) {
                    p.line(lineSizeX / 3, 0, lineSizeX / 3, lineSizeY);
                    p.line(lineSizeX / 3 * 2, 0, lineSizeX / 3 * 2, lineSizeY);
                } else {
                    p.line(lineSizeX / 6, 0, lineSizeX / 6, lineSizeY);
                    p.line(lineSizeX / 2, 0, lineSizeX / 2, lineSizeY);
                    p.line(lineSizeX / 6 * 5, 0, lineSizeX / 6 * 5, lineSizeY);
                }

                p.pop();
                x += lineSizeX;
            }
            y += lineSizeY;
        }
    };

    p.draw = function () {

    };

}, 'p5Container');

xxxxxx