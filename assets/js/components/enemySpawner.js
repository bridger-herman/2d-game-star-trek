/* enemySpawner.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Spawns enemies off the map with a random velocity
 */

const SPAWN_TIME = 1000;
const ENEMY_SPEED = 0.3;

class EnemySpawner extends Component {
    constructor(gameObject) {
        super(gameObject);
        this._spawned = Date.now();
    }

    update() {
        if (Date.now() - this._spawned > SPAWN_TIME * (Math.random() * 2 + 2)) {
            this._spawned = Date.now();
            let enemy = GameObjectManager.instantiate('enemy' + Date.now());
            enemy.addComponent(new Health(enemy, 20));
            enemy.addComponent(new DestroySelfOutsideScreen(enemy));
            enemy.addComponent(new Velocity(enemy, createVector(ENEMY_SPEED * (Math.random()
                            - 0.5), ENEMY_SPEED * (Math.random() - 0.5))));
            enemy.transform.position = createVector(Math.random() * width, Math.random() * height);
            enemy.renderer = new Renderer(enemy, 'enemy');
        }
    }
}
