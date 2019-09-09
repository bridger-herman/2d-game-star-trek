/* transform.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Utilities for 2D transformations
 */

class Transform2D {
    constructor(pos, rot, scale) {
        this.position = pos;
        this.rotation = rot;
        this.scale = scale;
    }

    static identity() {
        return new Transform2D(createVector(0, 0), 0, createVector(1, 1));
    }

    lerp(other, t) {
        let pos = p5.Vector.lerp(this.position, other.position, t);
        let angle = (other.rotation - this.rotation) * t + this.rotation;
        let scale = p5.Vector.lerp(this.scale, other.scale, t);
        return new Transform2D(pos, angle, scale);
    }
}