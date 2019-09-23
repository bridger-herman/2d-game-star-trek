/* weapon.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Weapons deal damage
 */

class Weapon extends Component {
    update() {
        for (let name in GameObjectManager.gameObjects) {
            let go = GameObjectManager.gameObjects[name];
            if (go.getComponent('Health') != null) {
                let distance =
                    p5.Vector.sub(this.gameObject.transform.position,
                        go.transform.position);
                if (distance.mag() < 50) {
                    go.getComponent('Health').damage();
                    GameObjectManager.destroy(this.gameObject.name);
                }
            }
        }
    }
}
