let sketch = new p5((p) => {

    // Colors
    let bgColor = [40, 50, 97];
    let fgColor = [11, 59, 51];

    p.setup = function () {
        p.createCanvas(600, 600);

        p.colorMode(p.HSL);
        p.background(...bgColor);

        p.noLoop();
    };

    p.draw = function () {
        let x = 300;
        let y = 300;
        let basePolygon = getBasePolygon(75, 10);

        let i = 0;
        while(i < 50) {
            let polygon = expandPolygon(basePolygon);
            drawPolygon(x, y, polygon, 0.04);
            i++;
        }

    };

    let expandPolygon = (corners, depth=7) => {
        if (depth <= 0) { return corners; }

        let tmpVectors = [...corners];

        for (let i = 0; i < corners.length - 1; i++) {
            let newCorner = getNewCorner(corners[i], corners[i + 1]);
            tmpVectors.splice(i + 1, 0, newCorner);
        }
        return expandPolygon(tmpVectors, depth - 1);
    }

    let getBasePolygon = (r, corners) => {
        let vectors = [];
        for (let i = 0; i < p.TWO_PI; i += p.TWO_PI / corners) {
            let x = r * p.cos(i);
            let y = r * p.sin(i);
            vectors.push(p.createVector(x, y));
        }
        return vectors;
    };

    let getNewCorner = (v1, v2) => {
        let magMultiplier = p.random(0, 0.5);
        let angle = p.randomGaussian(p.PI / 2, p.PI / 6);

        let vDist = p5.Vector.dist(v1, v2);
        let pointPos = p.randomGaussian(vDist / 2, vDist / 5);

        let slope = p.atan2(v2.y - v1.y, v2.x - v1.x);
        let midPoint = p.createVector(
            v1.x + pointPos * p.cos(slope),
            v1.y + pointPos * p.sin(slope),
        );

        let tmpVector = p5.Vector.sub(v1, v2);
        tmpVector.mult(magMultiplier);
        tmpVector.rotate(angle);

        let newCorner = p5.Vector.add(midPoint, tmpVector);
        return newCorner;
    };

    let drawPolygon = (x, y, vectors, opacity) => {
        p.noStroke();
        p.fill(...fgColor, opacity);

        p.push();
        p.translate(x, y);

        p.beginShape();
        vectors.map(v => {
            p.vertex(v.x, v.y);
        });
        p.endShape(p.CLOSE);

        p.pop();
    };

}, 'sketch-container');