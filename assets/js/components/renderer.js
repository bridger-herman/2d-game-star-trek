/* renderer.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Draws something to the screen
 */

let enterprise;
let borg;
let borg_d1;
let borg_d2;
let borg_d3;

function preload() {
    enterprise = loadImage('assets/img/enterprise.png');
    borg = loadImage('assets/img/borg3.jpg');
    borg_d1 = loadImage('assets/img/borg3_damage1.jpg');
    borg_d2 = loadImage('assets/img/borg3_damage2.jpg');
    borg_d3 = loadImage('assets/img/borg3_damage3.jpg');
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
        } else if (this._name == 'photonLauncherRenderer' || this._name == 'photon') {
            fill('#ff7f0c');
            noStroke();
            circle(0, 0, 10);
        } else if (this._name == 'enemy') {
            image(borg, -50, -50, 100, 100);
        } else if (this._name == 'enemy_d1') {
            image(borg_d1, -50, -50, 100, 100);
        } else if (this._name == 'enemy_d2') {
            image(borg_d2, -50, -50, 100, 100);
        } else if (this._name == 'enemy_d3') {
            image(borg_d3, -50, -50, 100, 100);
        }

        // Pop the parent matrices
        for (let i = 0; i < tfCount; i++) {
            pop();
        }
    }
}
