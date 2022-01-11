let sketch = new p5((p) => {

    let len = 150;
    let slider;

    p.setup = function () {
        p.createCanvas(600, 600);
        p.stroke(0);
        slider = p.createSlider(0, p.PI, p.PI / 4, 0.05);
    };
    
    p.draw = function () {
        p.background(255);
        p.translate(300, p.height);
        branch(len);
    };
    
    let branch = (len) => {
        let angle = slider.value();
        let dec = 0.7;

        p.line(0, 0, 0, - len);

        p.translate(0, - len);

        if(len > 4) {
            p.push();
            p.rotate(angle);
            branch(len * dec);
            p.pop();

            p.push();
            p.rotate(-angle);
            branch(len * dec);
            p.pop();
        }
    }

}, 'sketch-container');