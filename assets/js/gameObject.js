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
        scale(...this.transform.scale.asArray());
        rotate(this.transform.rotation);
        translate(...this.transform.position.asArray());
        ellipse(0, 0, 50, 40);
        pop();
    }
}