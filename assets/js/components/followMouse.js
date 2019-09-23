/* followMouse.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Behaviour to make gameObject follow mouse clicks
 */

class FollowMouseBehaviour extends Component {
    constructor(gameObject) {
        super(gameObject);

        this.mouseDown = false;
        this.currentTime = 0.0;
        this.currentCurve = null;
    }

    update() {
        this.currentTime += TimingSystem.dt_ms();
        if (mouseIsPressed) {
            this.mouseDown = true;
        }
        // Only trigger it once
        if (!mouseIsPressed && this.mouseDown) {
            this.currentTime = 0.0;
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
            // First point is straight forward along current heading
            let p1 = p5.Vector.add(
                this.gameObject.transform.position,
                p5.Vector.mult(this.gameObject.transform.forward, toNextMag / 3),
            );
            // Second point is along the line from current position to click,
            // and offset by a little
            let p2 = p5.Vector.add(
                this.gameObject.transform.position,
                p5.Vector.add(
                    p5.Vector.mult(toNextDir, 2 * toNextMag / 3),
                    p5.Vector.mult(perp, toNextMag / 6),
                )
            );

            // Create the Bezier curve, starting at current pos and ending at
            // mouse click
            this.currentCurve = new CubicBezierCurve([
                this.gameObject.transform.position,
                p1,
                p2,
                mousePos,
            ]);
        }
        if (this.currentCurve != null) {
            this.gameObject.transform = this.currentCurve.transformAt(this.currentTime);
        }
    }
}
