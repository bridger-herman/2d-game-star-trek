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
    createCanvas(1280, 720);

    gameObjects['ellipse'] = new GameObject();
    gameObjects['ellipse'].transform.position.x = 300;
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