/* main.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Main game logic
 */

const BACKGROUND_COLOR = '#FFFFFF';

function setup() {
    createCanvas(800, 800);

    let player = GameObjectManager.instantiate('player');
    player.addComponent(new FollowMouseBehaviour(player));
    player.transform.position = createVector(50, 50);
    player.renderer = new Renderer(player, 'triangle');

    let turret = GameObjectManager.instantiate('turret');
    turret.renderer = new Renderer(turret, 'turret');
    turret.transform.parent = player.transform;
    turret.transform.scale = createVector(0.5, 0.5);
    // turret.addComponent(new KeyboardRotateBehaviour(turret));
    turret.addComponent(new RotateToMouse(turret));
    turret.addComponent(new PhotonLauncher(turret));

    let enemy = GameObjectManager.instantiate('enemy');
    enemy.addComponent(new MouseCollider(enemy, 40));
    enemy.addComponent(new Health(enemy, 10));
    enemy.transform.position = createVector(width / 2, height / 2);
    enemy.renderer = new Renderer(enemy, '');
}

function draw() {
    background(BACKGROUND_COLOR);

    GameObjectManager.update();

    GameObjectManager.draw();
}
