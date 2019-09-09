/* transform.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Utilities for 2D transformations
 */

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    asArray() {
        return Array.from({0: this.x, 1: this.y, length: 2});
    }
}

class Transform2D {
    constructor(px, py, r, sx, sy) {
        this.position = new Vector2(px, py);
        this.rotation = r;
        this.scale = new Vector2(sx, sy);;
    }

    static identity() {
        return new Transform2D(0, 0, 0, 1, 1);
    }
}