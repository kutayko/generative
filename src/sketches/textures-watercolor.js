let sketch = new p5((p) => {

    // Colors
    let COLORS = {
        bg: [40, 50, 97],
        orange: [11, 59, 51],
        blue: [276, 34 , 69]
    };

    p.setup = function () {
        p.createCanvas(600, 600);

        p.colorMode(p.HSL);
        p.background(...COLORS.bg);

        p.noLoop();
    };

    p.draw = function () {
        let w1 = new Watercolor({
            size: 75,
            x: 250,
            y: 300,
            color: COLORS.orange
        });

        let w2 = new Watercolor({
            size: 75,
            x: 350,
            y: 300,
            color: COLORS.blue
        });

        Watercolor.draw([w1, w2]);
    };

    class Corner extends p5.Vector {
        constructor(x, y, variance) {
            super(x, y);
            this.variance = variance;
        }

        static createNew(c1, c2) {
            let magMultiplier = p.randomGaussian(0.5, c2.variance);
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
            return new Corner(newCorner.x, newCorner.y, c2.variance);
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
            tmpVectors.push(newCorner);

            return Corner.splitAll(tmpVectors, depth - 1);
        }
    }

    class Watercolor {
        constructor({ base = {}, size, x, y, edges, color }) {
            this.size = size || base.size;
            this.x = x || base.x || p.width / 2;
            this.y = y || base.y || p.height / 2;;
            this.edges = edges || base.edges || 10;
            this.color = color || base.color;

            this.opacity = 0.04;
            this.maxCornerVarience = 0.5;

            this.corners = base.corners || this.getBaseCorners();
        }

        getBaseCorners() {
            let corners = [];
            for (let i = 0; i < p.TWO_PI; i += p.TWO_PI / this.edges) {
                let x = this.size * p.cos(i);
                let y = this.size * p.sin(i);
                let variance = p.random(0, this.maxCornerVarience);
                corners.push(new Corner(x, y, variance));
            }
            return corners;
        }

        expand(depth=3) {
            this.corners = Corner.splitAll(this.corners, depth);
        }

        drawLayer() {
            p.noStroke();
            p.fill(...this.color, this.opacity);

            p.push();
            p.translate(this.x, this.y);

            p.beginShape();
            this.corners.map(c => {
                p.vertex(c.x, c.y);
            });
            p.endShape(p.CLOSE);

            p.pop();
        }

        static draw(blobs) {
            let i = 1;
            while (i <= 3) {
                blobs.map(b => b.expand(1));

                let j = 0;
                while (j < 17) {
                    blobs.map(b => {
                        let layer = new Watercolor({ base: b });
                        layer.expand(3);
                        layer.drawLayer();

                    });
                    j++;
                }
                i++;
            }
        }
    }

}, 'sketch-container');