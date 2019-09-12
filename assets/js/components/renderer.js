/* renderer.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Draws something to the screen
 */

class Renderer {
    constructor(gameObject, name) {
        this._gameObject = gameObject;
        this._name = name;
    }

    draw() {
        push();
        translate(this._gameObject.transform.position);
        rotate(this._gameObject.transform.rotation);
        scale(this._gameObject.transform.scale);
        if (this._name == 'triangle') {
            triangle(-20, -20, -20, 20, 40, 0);
        } else {
            circle(0, 0, 40);
        }
        pop();
    }
}