/* gameObjectManager.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Statically manage GameObject creation and deletion
 */

class GameObjectManager {
    static instantiate(name) {
        GameObjectManager.gameObjects[name] = new GameObject(name);
        return GameObjectManager.gameObjects[name];
    }

    static destroy(name) {
        delete GameObjectManager.gameObjects[name];
    }

    static update() {
        // Update loop
        for (let go in GameObjectManager.gameObjects) {
            GameObjectManager.gameObjects[go].update();
        }
    }

    static draw() {
        // Draw loop
        for (let go in GameObjectManager.gameObjects) {
            GameObjectManager.gameObjects[go].draw();
        }
    }
}

// Set the field "gameObjects" so it can be used statically
GameObjectManager.gameObjects = {};
