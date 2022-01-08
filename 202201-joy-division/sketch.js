let sketch = new p5((p) => {

    let rows = [];

    p.setup = function () {
        p.createCanvas(400, 600);

        let marginTop = 100;
        let marginBottom = 50;

        let y = marginTop;
        let spacingX = 20;
        let spacingY = 12;

        while (y < p.height - marginBottom) {
            rows.push(new Row(p, y, spacingX));
            y = y + spacingY;
        }
    };

    p.draw = function () {
        p.background(255);
        rows.map(row => row.draw());
    };

}, 'p5Container');

class Row {
    constructor(p, y, spacing) {
        this.p = p;
        this.y = y;
        this.spacing = spacing;
        this.points = [];

        let x = 0;
        let r;
        while (x <= p.width) {
            r = this.getVariance(x);
            this.points.push(p.createVector(x, this.y - r));
            x = x + this.spacing;
        }
    }

    draw() {
        this.p.stroke(0);
        this.p.beginShape();
        this.points.map(point => this.p.curveVertex(point.x, point.y));
        this.p.endShape();
    }

    getVariance(x) {
        let midPoint = this.p.width / 2;
        let centerProximity = Math.abs(midPoint - x);
        let randomMax = this.p.map(centerProximity, 0, midPoint, 75, -20);
        return Math.max(this.p.random(-70, randomMax), 0);
    }
}