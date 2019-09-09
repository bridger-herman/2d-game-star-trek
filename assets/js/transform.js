/* transform.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Utilities for 2D transformations
 */

class Transform2D {
    constructor(px, py, r, sx, sy) {
        this.position = createVector(px, py);
        this.rotation = r;
        this.scale = createVector(sx, sy);;
    }

    static identity() {
        return new Transform2D(0, 0, 0, 1, 1);
    }
}