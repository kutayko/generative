let sketch = new p5((p) => {

    let tree = [];
    
    p.setup = function () {
        p.createCanvas(600, 600);
        p.stroke(0);
        
        let len = 100;
        let a = p.createVector(p.width / 2, p.height);
        let b = p.createVector(p.width / 2, p.height - len); 

        let root = new Branch(p, a, b);
        tree.push(root);

        let treeLength = 0;
        while(treeLength < 1000) {
            let angle1 = p.random(0, p.PI / 3);
            let angle2 = p.random(0, p.PI / 3);
            tree.push(tree[treeLength].branch(angle1));
            tree.push(tree[treeLength].branch(-angle2));
            treeLength++;
        }
    };
    
    p.draw = function () {
        p.background(255);

        tree.map(x => x.show());
    };

}, 'p5Container');


class Branch {
    constructor(p, begin, end) {
        this.begin = begin;
        this.end = end;
        this.p = p;
    }

    show() {
        this.p.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        this.branch();
    }

    branch(angle) {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(angle);
        dir.mult(this.p.random(0.6, 0.95));
        
        let newEnd = p5.Vector.add(this.end, dir)
        return new Branch(this.p, this.end, newEnd);
    }
}