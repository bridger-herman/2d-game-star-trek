/* bezierCurve.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Bezier curve implementation
 */

const NUM_POINTS = 10;

class CubicBezierCurve {
    constructor(controlPoints) {
        this.controlPoints = controlPoints;
        this.vertices = this._deCasteljau();
        this.transformKeyframes = this._generateKeyframes();
    }

    // Get the (interpolated) transform at a given `t`
    transformAt(t) {
        let scaled = t * NUM_POINTS;
        let lowIndex = Math.floor(scaled);
        let highIndex = lowIndex + 1;
        let percentInside = scaled - lowIndex;
        return this.transformKeyframes[lowIndex].lerp(this.transformKeyframes[highIndex], percentInside);
    }

    // Generate transforms for each point in the curve so we can nicely
    // interpolate
    _generateKeyframes() {
        let keyframes = [];
        for (let i = 0; i < this.vertices.length; i++) {
            // Prevent us from going off the end
            let v = i < this.vertices.length - 1 ? i : this.vertices.length - 2;

            let tf = Transform2D.identity();
            tf.position = this.vertices[v];
            tf.forward = p5.Vector.sub(this.vertices[v + 1], this.vertices[v]).normalize();
            keyframes.push(tf);
        }
        return keyframes;
    }

    _deCasteljau() {
        let rp = [];
        // De Casteljau's Algorithm
        for (let t = 0.0; t <= 1.0; t += 1.0 / NUM_POINTS) {
            let segments = [
                p5.Vector.lerp(this.controlPoints[0], this.controlPoints[1], t),
                p5.Vector.lerp(this.controlPoints[1], this.controlPoints[2], t),
                p5.Vector.lerp(this.controlPoints[2], this.controlPoints[3], t),
            ];
            let subSegments = [
                p5.Vector.lerp(segments[0], segments[1], t),
                p5.Vector.lerp(segments[1], segments[2], t),
            ];
            rp.push(p5.Vector.lerp(subSegments[0], subSegments[1], t));
        }
        return rp;
    }

    draw() {
        for (let i = 0; i < this.vertices.length; i++) {
            point(this.vertices[i].x, this.vertices[i].y);
        }
    }
}