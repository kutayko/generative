let sketch = new p5((p) => {

    let x = 0;
    let y = 5;
    let sp = 12;
    let r1 = 0;
    let r2 = 0;

    p.setup = function () {
        p.createCanvas(600, 600);
        p.background(255);
        p.stroke(0);
    };

    p.draw = function () {
        r2 = p.random() * p.map(x + y, 0, 1200, 0, y / 10);

        p.line(x, y + r1, x + sp, y + r2);
        
        x = x + sp; 
        r1 = r2;
        if (x > p.width) {
            x = 0;
            y = y + sp;
            r1 = 0;
        }
    };

}, 'p5Container');