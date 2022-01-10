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

        p.strokeWeight(4);

        p.noLoop();
    };

    p.draw = function () {
        squares.push(createSquare(0, 0, 600, 600));

        i = 0;
        let step = 90;
        while (i < p.width) {
            squares.forEach((sq, index, arr) => {
                let xSplit = p.random() < 0.5 ? sq.splitOn({ x: i }) : [];
                let ySplit = p.random() < 0.5 ? sq.splitOn({ y: i }) : [];
                let newSquares = xSplit.concat(ySplit);
                if (newSquares.length) {
                    squares.splice(index, 1);
                }
                squares = squares.concat(xSplit).concat(ySplit);
            });

            i += step;
        }

        squares.map(sq => sq.draw());

        colors.forEach(color => {
            squares[Math.floor(p.random() * squares.length)].addColor(color);
        });
    };

    let createSquare = (x, y, w, h) => {
        let draw = () => p.rect(x, y, w, h);

        let splitOn = (coordinates) => {
            let { x: sx, y: sy } = coordinates;

            if (sx && sx > x && sx < x + w) {
                let size1 = sx - x;
                let size2 = x + w - sx;

                return [
                    createSquare(x, y, size1, h),
                    createSquare(x + size1, y, size2, h)
                ];
            }

            if (sy && sy > y && sy < y + h) {
                let size1 = sy - y;
                let size2 = y + h - sy;

                return [
                    createSquare(x, y, w, size1),
                    createSquare(x, y + size1, w, size2)
                ]
            }

            return [];
        };

        let addColor = (color) => {
            p.fill(color);
            p.rect(x, y, w, h);
        };

        return {
            x,
            y,
            w,
            h,
            draw,
            splitOn,
            addColor
        }
    };

}, 'p5Container');
