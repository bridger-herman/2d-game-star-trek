/* main.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Main game logic
 */

// const BACKGROUND_COLOR = '#000000';
const BACKGROUND_COLOR = '#FFFFFF';

function setup() {
    createCanvas(800, 800);

    let player = GameObjectManager.instantiate('player');
    player.addComponent(new FollowMouseBehaviour(player));
    player.transform.position = createVector(width / 2, width / 2);

    let playerRenderer = GameObjectManager.instantiate('playerRenderer');
    playerRenderer.renderer = new Renderer(playerRenderer, 'enterprise');
    playerRenderer.transform.parent = player.transform;
    playerRenderer.transform.scale = createVector(0.5, 0.5);

    let photonLauncher = GameObjectManager.instantiate('photonLauncher');
    photonLauncher.transform.parent = player.transform;
    photonLauncher.transform.position = createVector(30, 0);
    photonLauncher.addComponent(new RotateToMouse(photonLauncher));

    let photonLauncherRenderer = GameObjectManager.instantiate('photonLauncherRenderer');
    photonLauncherRenderer.transform.parent = photonLauncher.transform;
    photonLauncherRenderer.transform.position = createVector(30, 0);
    photonLauncherRenderer.renderer = new Renderer(photonLauncherRenderer,
        'photonLauncherRenderer');
    photonLauncherRenderer.addComponent(new PhotonLauncher(photonLauncherRenderer, 4.0));

    // let enemy = GameObjectManager.instantiate('enemy');
    // enemy.addComponent(new Health(enemy, 10));
    // enemy.transform.position = createVector(width / 2, height / 2);
    // enemy.renderer = new Renderer(enemy, '');
}

function draw() {
    background(BACKGROUND_COLOR);

    GameObjectManager.update();

    GameObjectManager.draw();
}
