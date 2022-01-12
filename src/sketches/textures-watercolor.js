let sketch = new p5((p) => {

    // Colors
    let COLORS = {
        bg: [40, 50, 97],
        fg: [11, 59, 51]
    };

    p.setup = function () {
        p.createCanvas(600, 600);

        p.colorMode(p.HSL);
        p.background(...COLORS.bg);

        p.noLoop();
    };

    p.draw = function () {
        let i = 0;
        while(i < 50) {
            let polygon = new Polygon(75);
            polygon.expand(3);
            polygon.draw();
            i++;
        }

    };

    class Corner {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.varience = 0.5;
        }

        static createNew(c1, c2) {
            let magMultiplier = p.random(0.2, 0.8);
            let angle = p.randomGaussian(p.PI / 2, p.PI / 6);

            let vDist = p5.Vector.dist(c1, c2);
            let pointPos = p.randomGaussian(vDist / 2, vDist / 5);

            let slope = p.atan2(c2.y - c1.y, c2.x - c1.x);
            let midPoint = p.createVector(
                c1.x + pointPos * p.cos(slope),
                c1.y + pointPos * p.sin(slope),
            );

            let tmpVector = p5.Vector.sub(c1, c2);
            tmpVector.mult(magMultiplier);
            tmpVector.rotate(angle);

            let newCorner = p5.Vector.add(midPoint, tmpVector);
            return newCorner;
        }

        static splitAll(corners, depth=3) {
            if (depth <= 0) { return corners; }

            let tmpVectors = [...corners];

            let j = 0;
            for (let i = 0; i < corners.length - 1; i++) {
                let newCorner = Corner.createNew(corners[i], corners[i + 1]);
                tmpVectors.splice(j + i + 1, 0, newCorner);
                j++;
            }

            // last point to first
            let newCorner = Corner.createNew(corners[corners.length - 1], corners[0]);
            tmpVectors.splice(tmpVectors.length, 0, newCorner);

            return Corner.splitAll(tmpVectors, depth - 1);
        }
    }

    class Polygon {
        constructor(size, x = p.width / 2, y = p.height / 2, edges = 10) {
            this.size = size;
            this.x = x;
            this.y = y;
            this.edges = edges;

            this.opacity = 0.04;

            this.corners = this.getBaseCorners();
        }

        getBaseCorners() {
            let corners = [];
            for (let i = 0; i < p.TWO_PI; i += p.TWO_PI / this.edges) {
                let x = this.size * p.cos(i);
                let y = this.size * p.sin(i);
                corners.push(p.createVector(x, y));
            }
            return corners;
        }

        expand(depth=3) {
            this.corners = Corner.splitAll(this.corners, depth);
        }

        draw() {
            p.noStroke();
            p.fill(...COLORS.fg, this.opacity);

            p.push();
            p.translate(this.x, this.y);

            p.beginShape();
            this.corners.map(c => {
                p.vertex(c.x, c.y);
            });
            p.endShape(p.CLOSE);

            p.pop();
        }

    }

}, 'sketch-container');