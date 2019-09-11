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
    player.components.push(new FollowMouseBehaviour(player));
    player.transform.position = createVector(50, 50);
    player.renderer = new Renderer('triangle');

    gameObjects['player'] = ellipse;
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