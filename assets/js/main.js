/* main.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Main game logic
 */

const BACKGROUND_COLOR = '#FFFFFF';
let gameObjects = {};

function setup() {
    createCanvas(800, 800);

    let player = new GameObject();
    player.addComponent(new FollowMouseBehaviour(player));
    player.transform.position = createVector(50, 50);
    player.renderer = new Renderer(player, 'triangle');

    let enemy = new GameObject();
    enemy.addComponent(new MouseCollider(enemy, 40));
    enemy.addComponent(new Health(enemy, 10));
    enemy.transform.position = createVector(width / 2, height / 2);
    enemy.renderer = new Renderer(enemy, '');

    gameObjects['player'] = player;
    gameObjects['enemy'] = enemy;
}

function draw() {
    background(BACKGROUND_COLOR);

    // Update loop
    for (let go in gameObjects) {
        gameObjects[go].update();
    }

    // Draw loop
    for (let go in gameObjects) {
        gameObjects[go].draw();
    }
}