class Watercolor {
    constructor({ p, base = {}, size, x, y, edges, color }) {
        this.p = p || base.p;
        this.size = size || base.size;
        this.x = x || base.x || this.p.width / 2;
        this.y = y || base.y || this.p.height / 2;;
        this.edges = edges || base.edges || 10;
        this.color = color || base.color;

        this.opacity = 0.04;
        this.maxCornerVarience = 0.5;

        this.corners = base.corners || this.getBaseCorners();
    }

    getBaseCorners() {
        let corners = [];
        for (let i = 0; i < this.p.TWO_PI; i += this.p.TWO_PI / this.edges) {
            let x = this.size * this.p.cos(i);
            let y = this.size * this.p.sin(i);
            let variance = this.p.random(0, this.maxCornerVarience);
            corners.push(new Corner(x, y, variance));
        }
        return corners;
    }

    expand(depth = 1) {
        this.corners = Corner.splitAll(this.p, this.corners, depth);
    }

    drawLayer(pg) {
        pg.colorMode(pg.HSL);
        pg.noStroke();
        pg.fill(...this.color, this.opacity);

        pg.push();
        pg.translate(this.x, this.y);

        pg.beginShape();
        this.corners.map(c => {
            pg.vertex(c.x, c.y);
        });
        pg.endShape(this.p.CLOSE);

        pg.pop();
    }

    static draw({ p, blobs, layers=17, overlay }) {
        let i = 1;
        while (i <= 3) {
            let pg = p.createGraphics(p.width, p.height);
            blobs.map(b => b.expand());

            let j = 0;
            while (j < layers) {
                blobs.map(b => {
                    let layer = new Watercolor({ base: b });
                    layer.expand(3);
                    layer.drawLayer(pg);

                });
                j++;
            }

            if(overlay) {
                let layerImg= pg.get();
                layerImg.mask(overlay.getOverlay());
                p.image(layerImg, 0, 0);
            } else {
                p.image(pg, 0, 0);
            }

            i++;
        }
    }
}

class Corner extends p5.Vector {
    constructor(x, y, variance) {
        super(x, y);
        this.variance = variance;
    }

    static createNew(p, c1, c2) {
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

    static splitAll(p, corners, depth = 3) {
        if (depth <= 0) { return corners; }

        let tmpVectors = [...corners];

        let j = 0;
        for (let i = 0; i < corners.length - 1; i++) {
            let newCorner = Corner.createNew(p, corners[i], corners[i + 1]);
            tmpVectors.splice(j + i + 1, 0, newCorner);
            j++;
        }

        // last point to first
        let newCorner = Corner.createNew(p, corners[corners.length - 1], corners[0]);
        tmpVectors.push(newCorner);

        return Corner.splitAll(p, tmpVectors, depth - 1);
    }
}
