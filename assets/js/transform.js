/* transform.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Utilities for 2D transformations
 */

class Transform2D {
    constructor(pos, rot, scale) {
        this._position = pos;
        this._rotation = rot;
        this._scale = scale;
        this._forward = p5.Vector.fromAngle(rot);
    }

    static identity() {
        return new Transform2D(createVector(0, 0), 0, createVector(1, 1));
    }

    lerp(other, t) {
        let pos = p5.Vector.lerp(this._position, other._position, t);
        let angle = (other._rotation - this._rotation) * t + this._rotation;
        let scale = p5.Vector.lerp(this._scale, other._scale, t);
        return new Transform2D(pos, angle, scale);
    }

    get position() { return this._position; }
    get rotation() { return this._rotation; }
    get scale() { return this._scale; }
    get forward() { return this._forward; }

    set position(newPosition) {
        this._position = newPosition;
    }
    set rotation(newRotation) {
        this._rotation = newRotation;
        this._forward = p5.Vector.fromAngle(this._rotation);
    }
    set scale(newScale) {
        this._scale = newScale;
    }
    set forward(newForward) {
        this._forward = newForward.copy().normalize();
        this._rotation = this._forward.heading();
    }

    debugDraw() {
        strokeWeight(5);
        stroke(0);
        point(this._position.x, this._position.y);
        let arrowLen = 50;
        strokeWeight(2);
        line(this._position.x, this._position.y,
            this._position.x + arrowLen * this._forward.x,
            this._position.y + arrowLen * this._forward.y
        );
    }
}