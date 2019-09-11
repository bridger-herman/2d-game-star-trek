/* gameObject.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Encapsulation for a GameObject (player or enemy)
 */

class GameObject {
    constructor() {
        this.transform = Transform2D.identity();
        this.components = [];
        this._renderer = null;
    }

    set renderer(r) {
        this._renderer = r;
    }

    update() {
        for (let c in this.components) {
            this.components[c].update();
        }
    }

    draw() {
        if (this._renderer != null) {
            this._renderer.draw();
        }
    }
}