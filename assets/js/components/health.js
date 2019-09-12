/* health.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Each player (probably) has health
 */

class Health extends Component {
    constructor(gameObject, maxHealth) {
        super(gameObject);
        this._maxHealth = maxHealth;
        this._currentHealth = maxHealth;
        this.gameObject.getComponent('MouseCollider').registerCallback(this.damage);
    }

    damage() {
        print(this);
        this._currentHealth -= 1.0;
        print("Damaged! " + this._currentHealth);
    }
}