/* followMouse.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Behaviour to make gameObject follow mouse clicks
 */

const TURN_LENGTH = 50;
const TURN_ANGLE = Math.PI / 6;

class FollowMouseBehaviour extends Component {
    constructor(gameObject) {
        super(gameObject);

        this.mouseDown = false;
        this.keyframes = [];
    }

    update() {
        if (mouseIsPressed) {
            this.mouseDown = true;
        }
        // Only trigger it once
        if (!mouseIsPressed && this.mouseDown) {
            this.mouseDown = false;
            let mousePos = createVector(mouseX, mouseY);

            // Find vector to the clicked point
            let toNext = p5.Vector.sub(mousePos, this.gameObject.transform.position);
            let toNextDir = toNext.copy().normalize();
            let toNextMag = toNext.mag();

            // Find its perpendicular vector and see if it's in the direction
            // we're going
            let perp = toNextDir.copy().rotate(Math.PI / 2);
            if (perp.dot(this.gameObject.transform.forward) < 0) {
                perp.mult(-1.0);
            }

            // Create the intermediate points for the Bezier Curve
            let p1 = p5.Vector.add(
                this.gameObject.transform.position,
                p5.Vector.mult(this.gameObject.transform.forward, toNextMag / 3),
            );
            let p2 = p5.Vector.add(
                this.gameObject.transform.position,
                p5.Vector.add(
                    p5.Vector.mult(toNextDir, 2 * toNextMag / 3),
                    p5.Vector.mult(perp, toNextMag / 6),
                )
            );

            // Create the Bezier curve, starting at current pos and ending at
            // mouse click
            let curve = new CubicBezierCurve([
                this.gameObject.transform.position,
                p1,
                p2,
                mousePos,
            ]);
            
            for (let t = 0; t <= 1.0; t += 0.01) {
                curve.transformAt(t).debugDraw();
            }
        }
    }
}
