/* followMouse.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Behaviour to make gameObject follow mouse clicks
 */

const TURN_LENGTH = 50;
const TURN_ANGLE = Math.PI/6;

class FollowMouseBehaviour extends Component {
    constructor(gameObject) {
        super(gameObject);

        this.nextTF = Transform2D.identity();
        this.mouseDown = false;
    }

    update() {
        if (mouseIsPressed) {
            this.mouseDown = true;
        }
        if (!mouseIsPressed && this.mouseDown) {
            this.mouseDown = false;
            // this.updating = true;
            this.nextTF.position = createVector(mouseX, mouseY);

            // Find vector to the clicked point
            let toNext = p5.Vector.sub(this.nextTF.position, this.gameObject.transform.position);
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

            strokeWeight(5);
            stroke(0);
            point(this.gameObject.transform.position.x, this.gameObject.transform.position.y);
            stroke(255, 0, 0);
            point(p1.x, p1.y);
            stroke(0, 255, 0);
            point(p2.x, p2.y);
            stroke(0, 0, 255);
            point(this.nextTF.position.x, this.nextTF.position.y);

            // Create the Bezier curve, starting at current pos and ending at
            // mouse click
            let proposedTurn = new CubicBezierCurve([
                this.gameObject.transform.position,
                p1,
                p2,
                this.nextTF.position,
            ]);

            proposedTurn.draw();
        }
    }
}
