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
    }

    update() {
        for (let c in this.components) {
            this.components[c].update();
        }
    }

    draw() {
        push();
        translate(this.transform.position);
        rotate(this.transform.rotation);
        scale(this.transform.scale);
        triangle(-20, -20, -20, 20, 20, 0);
        pop();
    }
}