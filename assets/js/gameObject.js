/* gameObject.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Encapsulation for a GameObject (player or enemy)
 */

class GameObject {
    constructor(name) {
        this.name = name;
        this.tags = [];
        this._transform = Transform2D.identity();
        this._components = {};
        this._renderer = null;
    }

    set renderer(r) {
        this._renderer = r;
    }

    set transform(tf) {
        this._transform.parent = tf.parent;
        this._transform.position = tf.position;
        this._transform.scale = tf.scale;
        this._transform.rotation = tf.rotation;
    }

    get transform() {
        return this._transform;
    }

    addComponent(component) {
        this._components[component.constructor.name] = component;
    }

    getComponent(component) {
        return this._components[component];
    }

    update() {
        for (let c in this._components) {
            this._components[c].update();
        }
    }

    draw() {
        if (this._renderer != null) {
            this._renderer.draw();
        }
    }
}
