/* collider.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Collection of colliders
 */

class MouseCollider extends Component {
    constructor(gameObject, radius, colliderCallback) {
        super(gameObject);
        this._radius = radius;
        this._colliderCallback = colliderCallback;
        this._mouseWasDown = false;
    }

    registerCallback(callback) {
        this._colliderCallback = callback;
    }

    update() {
        if (mouseIsPressed) {
            this._mouseWasDown = true;
        }
        if (!mouseIsPressed && this._mouseWasDown) {
            this._mouseWasDown = false;
            let mousePos = createVector(mouseX, mouseY);
            let distance = p5.Vector.sub(this.gameObject.transform.position, mousePos);
            if (distance.mag() < this._radius) {
                this._colliderCallback();
            }
        }
    }
}
