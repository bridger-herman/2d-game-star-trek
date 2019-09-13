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

        // Give the MouseCollider a callback function, and make sure `this` is
        // bound correctly
        this.gameObject.getComponent('MouseCollider').registerCallback(this.damage);
    }

    // Arrow function to preserve `this` context
    damage = () => {
        print(this);
        this._currentHealth -= 1.0;
        if (this._currentHealth <= 0.0) {
            GameObjectManager.destroy(this.gameObject.name);
        }
        print("Damaged! " + this._currentHealth);
    }
}