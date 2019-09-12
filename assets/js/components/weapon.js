/* weapon.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Weapons deal damage
 */

class Weapon extends Component {
    constructor(gameObject, damageAmount) {
        super(gameObject);
        this._damageAmount = damageAmount;
    }
}