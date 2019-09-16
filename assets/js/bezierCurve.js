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
        if (t > 1.0) {
            return this.transformKeyframes[this.transformKeyframes.length - 1];
        } else if (t < 0.0) {
            return this.transformKeyframes[0];
        } else {
            let scaled = t * NUM_POINTS;
            let lowIndex = Math.floor(scaled);
            let highIndex = lowIndex + 1;
            let percentInside = scaled - lowIndex;
            return this.transformKeyframes[lowIndex].lerp(this.transformKeyframes[highIndex], percentInside);
        }
    }

    // Generate transforms for each point in the curve so we can nicely
    // interpolate
    _generateKeyframes() {
        let keyframes = [];
        for (let v = 0; v < this.vertices.length; v++) {
            let tf = Transform2D.identity();
            tf.position = this.vertices[v];
            if (v < this.vertices.length - 1) {
                tf.forward = p5.Vector.sub(this.vertices[v + 1], this.vertices[v]).normalize();
            } else {
                tf.forward = p5.Vector.sub(this.vertices[v], this.vertices[v - 1]).normalize();
            }
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
		
		strokeWeight(30);
		stroke(0, 255, 255);
		for (let i = 0; i < this.controlPoints.length; i++) {
            point(this.controlPoints[i].x, this.controlPoints[i].y);
        }
		stroke(0);

        for (let i = 0; i < this.vertices.length; i++) {
            point(this.vertices[i].x, this.vertices[i].y);
        }
		strokeWeight(1);
    }
}