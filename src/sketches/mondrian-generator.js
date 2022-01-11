let sketch = new p5((p) => {

    // Colors
    let bgColor = '#F2F5F1';
    let fgColor = 'black'

    let colors = ['#D40920', '#1356A2', '#F7D842']


    let squares = [];

    p.setup = function () {
        p.createCanvas(600, 600);

        p.background(bgColor);
        p.stroke(fgColor);
        p.noFill();

        p.strokeWeight(8);

        p.noLoop();
    };

    p.draw = function () {
        squares.push(new Square(p, 0, 0, 600, 600));

        let final = [];

        i = 0;
        let step = 100;
        while (i < p.width) {
            tmp = [];
            squares.forEach((sq, index) => {
                let newSquares = p.random() < 0.5 ? sq.splitOn({ x: i }) : [sq];

                let tmp2 = [];
                newSquares.forEach((sq2, index2) => {
                    tmp2 = tmp2.concat(
                        p.random() < 0.5 ? sq2.splitOn({ y: i }) : [sq2]
                    );
                });

                tmp = tmp.concat(tmp2);
            });
            squares = tmp

            i += step;
            p.background(bgColor);
        }

        colors.forEach(color => {
            squares[Math.floor(p.random() * squares.length)].color = color;
        });

        squares.map((sq, index) => sq.draw(index));

        console.log(squares);
    };

}, 'sketch-container');


class Square {
    constructor(p, x, y, w, h) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(index) {
        if (this.color) {
            this.p.fill(this.color);
        }
        this.p.rect(this.x, this.y, this.w, this.h);
        this.p.noFill();
    }

    splitOn(coordinates) {
        let { x: sx, y: sy } = coordinates;

        if (sx && sx > this.x && sx < this.x + this.w) {
            let size1 = sx - this.x;
            let size2 = this.x + this.w - sx;

            return [
                new Square(this.p, this.x, this.y, size1, this.h),
                new Square(this.p, this.x + size1, this.y, size2, this.h)
            ];
        }

        if (sy && sy > this.y && sy < this.y + this.h) {
            let size1 = sy - this.y;
            let size2 = this.y + this.h - sy;

            return [
                new Square(this.p, this.x, this.y, this.w, size1),
                new Square(this.p, this.x, this.y + size1, this.w, size2)
            ];
        }

        return [this];
    }
}