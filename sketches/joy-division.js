let sketch = new p5((p) => {

    // Colors
    let bgColor = [210, 29, 22];
    let fgColor = [40, 50, 97];

    let rows = [];

    p.setup = function () {
        p.createCanvas(400, 600);
        p.colorMode(p.HSL);
        p.background(...bgColor);
        p.stroke(...fgColor);
        p.fill(...bgColor);
        p.noLoop();

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
        p.print("A");
        rows.map(row => row.draw());
    };

}, 'sketch-container');

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
        this.p.stroke(255);
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