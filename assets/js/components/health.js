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
    }

    // Arrow function to preserve `this` context
    damage = () => {
        this._currentHealth -= 1.0;
        if (this._currentHealth <= 0.75 * this._maxHealth &&
                this._currentHealth > 0.5 * this._maxHealth) {
            this.gameObject._renderer._name = 'enemy_d1';
        } else if (this._currentHealth <= 0.5 * this._maxHealth &&
                this._currentHealth > 0.25 * this._maxHealth) {
            this.gameObject._renderer._name = 'enemy_d2';
        } else if (this._currentHealth <= 0.25 * this._maxHealth &&
                this._currentHealth > 0.0 * this._maxHealth) {
            this.gameObject._renderer._name = 'enemy_d3';
        }
        else if (this._currentHealth <= 0.0) {
            GameObjectManager.destroy(this.gameObject.name);
        }
    }
}
