/* bezierCurve.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Bezier curve implementation
 */

class CubicBezierCurve {
    constructor(points) {
        this.points = points;
    }

    draw() {
        // De Casteljau's Algorithm
        for (let t = 0.0; t <= 1.0; t += 0.1) {
            let segments = [
                p5.Vector.lerp(this.points[0], this.points[1], t),
                p5.Vector.lerp(this.points[1], this.points[2], t),
                p5.Vector.lerp(this.points[2], this.points[3], t),
            ];
            let subSegments = [
                p5.Vector.lerp(segments[0], segments[1], t),
                p5.Vector.lerp(segments[1], segments[2], t),
            ];
            let drawPoint = p5.Vector.lerp(subSegments[0], subSegments[1], t);
            point(drawPoint.x, drawPoint.y);
        }
    }
}