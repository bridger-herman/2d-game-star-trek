/* transform.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Utilities for 2D transformations
 */

class Transform2D {
    constructor(pos, rot, scale) {
        this.parent = null;
        this._position = pos;
        this._rotation = rot;
        this._scale = scale;
        this._forward = p5.Vector.fromAngle(rot);
    }

    static identity() {
        return new Transform2D(createVector(0, 0), 0, createVector(1, 1));
    }

    copy() {
        let newTF = Transform2D.identity();
        newTF.parent = this.parent;
        newTF._position = this._position.copy();
        newTF._rotation = this._rotation;
        newTF._scale = this._scale.copy();
        return newTF;
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

    get globalPosition() {
        let pos = createVector(0, 0);
        let tf = this;
        while (tf != null) {
            pos.add(tf.position);
            tf = tf.parent;
        }
        return pos;
    }
    get globalRotation() {
        let rot = 0.0;
        let tf = this;
        while (tf != null) {
            rot += tf.rotation;
            tf = tf.parent;
        }
        return rot;
    }
    get globalForward() {
        let globalRot = this.globalRotation;
        return p5.Vector.fromAngle(globalRot);
    }

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
    set globalForward(newForward) {
        // Find 360 degree angle: https://math.stackexchange.com/a/879474
        let dot = newForward.x*1 + newForward.y*0;     // dot product
        let det = newForward.x*0 - newForward.y*1;     // determinant
        let angle = Math.atan2(det, dot); // atan2(y, x) or atan2(sin, cos)
        this.globalRotation = -angle;
    }
    set globalRotation(newRotation) {
        let tf = this.parent;
        let cumulativeRot = 0;
        while (tf != null) {
            cumulativeRot += tf.rotation;
            tf = tf.parent;
        }
        this.rotation = newRotation - cumulativeRot;
    }

    debugDraw() {
        strokeWeight(5);
        stroke(0);
        point(this.globalPosition.x, this.globalPosition.y);
        let arrowLen = 50;
        strokeWeight(2);
        line(this.globalPosition.x, this.globalPosition.y,
            this.globalPosition.x + arrowLen * this.globalForward.x,
            this.globalPosition.y + arrowLen * this.globalForward.y
        );
    }
}
