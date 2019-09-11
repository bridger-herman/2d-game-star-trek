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
    createCanvas(400, 400);

    let ellipse = new GameObject();
    ellipse.components.push(new FollowMouseBehaviour(ellipse));
    ellipse.transform.position = createVector(50, 50);

    gameObjects['ellipse'] = ellipse;
}

function draw() {
    // background(BACKGROUND_COLOR);

    // Update loop
    for (let go in gameObjects) {
        gameObjects[go].update();
    }

    // Draw loop
    // for (let go in gameObjects) {
    //     gameObjects[go].draw();
    // }
}