/* transform.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Utilities for 2D transformations
 */

class Transform2D {
    constructor(pos, rot, scale, gameObject) {
        this.parent = null;
        this._position = pos;
        this._rotation = rot;
        this._scale = scale;
        this._forward = p5.Vector.fromAngle(rot);
        this._gameObject = gameObject;
    }

    static identity() {
        return new Transform2D(createVector(0, 0), 0, createVector(1, 1));
    }

    static fromMat(mat) {
        return Transform2D(mat.position, mat.rotation, mat.scale);
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

    get matrix() {
        return Matrix3x3.trs(this._position, this._rotation, this._scale);
    }

    get globalMatrix() {
        let mat = Matrix3x3.identity();
        let tf = this;
        while (tf != null) {
            mat = tf.matrix.mult(mat);
            tf = tf.parent;
        }
        return mat;
    }

    get globalPosition() {
        return this.globalMatrix.translation;
    }
    get globalRotation() {
        return this.globalMatrix.rotation;
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
        let rotMat = this.globalMatrix.mult(Matrix3x3.trs(createVector(0, 0), -this.rotation, createVector(1, 1)));
        this.rotation = newRotation - rotMat.rotation;
    }

    debugDraw() {
        strokeWeight(10);
        point(this.globalPosition.x, this.globalPosition.y);
        let arrowLen = 20;
        strokeWeight(2);
        line(this.globalPosition.x, this.globalPosition.y,
            this.globalPosition.x + arrowLen * this.globalForward.x,
            this.globalPosition.y + arrowLen * this.globalForward.y
        );
    }
}

class Matrix3x3 {
    constructor(arr) {
        // Array of length 9 representing matrix elements in row-major order
        console.assert(arr.length == 9);
        this._arr = arr;
    }

    mult(other) {
        let newMat = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        newMat[0] = this._arr[0] * other._arr[0] + this._arr[1] * other._arr[3] + this._arr[2] * other._arr[6];
        newMat[1] = this._arr[0] * other._arr[1] + this._arr[1] * other._arr[4] + this._arr[2] * other._arr[7];
        newMat[2] = this._arr[0] * other._arr[2] + this._arr[1] * other._arr[5] + this._arr[2] * other._arr[8];

        newMat[3] = this._arr[3] * other._arr[0] + this._arr[4] * other._arr[3] + this._arr[5] * other._arr[6];
        newMat[4] = this._arr[3] * other._arr[1] + this._arr[4] * other._arr[4] + this._arr[5] * other._arr[7];
        newMat[5] = this._arr[3] * other._arr[2] + this._arr[4] * other._arr[5] + this._arr[5] * other._arr[8];

        newMat[6] = this._arr[6] * other._arr[0] + this._arr[7] * other._arr[3] + this._arr[8] * other._arr[6];
        newMat[7] = this._arr[6] * other._arr[1] + this._arr[7] * other._arr[4] + this._arr[8] * other._arr[7];
        newMat[8] = this._arr[6] * other._arr[2] + this._arr[7] * other._arr[5] + this._arr[8] * other._arr[8];

        return new Matrix3x3(newMat);
    }

    static identity() {
        return new Matrix3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    }

    static trs(translation, rotation, scale) {
        return new Matrix3x3([
            scale.x*Math.cos(rotation) , -Math.sin(rotation)        , translation.x,
            Math.sin(rotation)        , scale.y*Math.cos(rotation), translation.y,
            0                          , 0                         , 1            ,
        ]);
    }

    get translation() {
        return createVector(this._arr[2], this._arr[5]);
    }

    get scale() {
        let sx = createVector(this._arr[0], this._arr[3]).mag();
        let sy = createVector(this._arr[1], this._arr[4]).mag();
        return createVector(sx, sy);
    }

    get rotation() {
        let s = this.scale;
        return Math.atan2(this._arr[3] / s.y, this._arr[0] / s.x);
    }

    display(yOffset) {
        text('pos: ' + this.translation.x + ', ' + this.translation.y, 100, 100 + yOffset);
        text('rot: ' + this.rotation, 100, 150 + yOffset);
        text('scl: ' + this.scale.x + ', ' + this.scale.y, 100, 200 + yOffset);
    }
}
