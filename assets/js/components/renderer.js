/* renderer.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Draws something to the screen
 */

let enterprise;

function preload() {
    enterprise = loadImage('assets/img/enterprise.png');
}

class Renderer {
    constructor(gameObject, name) {
        this._gameObject = gameObject;
        this._name = name;
    }

    draw() {
        let tf = this._gameObject.transform;
        let tfChain = [];
        let tfCount = 0;

        // Push the parent matrices onto the stack
        while (tf != null) {
            tfChain.push(tf);
            tf = tf.parent;
            tfCount++;
        }

        // Apply parents first, then children
        for (let i = tfCount - 1; i >= 0; i--) {
            push();
            translate(tfChain[i].position);
            rotate(tfChain[i].rotation);
            scale(tfChain[i].scale);
        }

        // Draw the thing
        if (this._name == 'enterprise') {
            image(enterprise, -300 / 2, -170 / 2, 300, 170);
        } else if (this._name == 'photonLauncher') {
            triangle(0, -20, 0, 20, 20, 0);
        } else if (this._name == 'photonLauncherRenderer') {
            fill('#ff7f0c');
            noStroke();
            circle(0, 0, 10);
        } else if (this._name == 'photon') {
            circle(0, 0, 10);
        } else {
            rect(-25, -15, 50, 30);
        }

        // Pop the parent matrices
        for (let i = 0; i < tfCount; i++) {
            pop();
        }
    }
}
