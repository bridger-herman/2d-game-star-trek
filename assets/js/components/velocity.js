/* velocity.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Translational velocity for game objects
 */

class Velocity extends Component {
    constructor(gameObject, v) {
        super(gameObject);

        this.velocity = v;
    }

    update() {
        this.gameObject.transform.position.add(p5.Vector.mult(this.velocity, TimingSystem.dt()));
    }
}
