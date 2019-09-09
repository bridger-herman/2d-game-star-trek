/* followMouse.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Behaviour to make gameObject follow mouse clicks
 */

const FOLLOW_RATE = 0.01;

class FollowMouseBehaviour extends Component {
    constructor(gameObject) {
        super(gameObject);

        this.previousMouse = createVector(0, 0);
        this.percentThrough = 0;
        this.gameObject.transform.position = createVector(300, 300);
    }

    update() {
        this.percentThrough += FOLLOW_RATE;
        if (mouseIsPressed) {
            this.percentThrough = 0;
            this.previousMouse = createVector(mouseX, mouseY);
        }
        this.gameObject.transform.position = this.gameObject.transform.position.lerp(this.previousMouse, this.percentThrough);
    }
}
