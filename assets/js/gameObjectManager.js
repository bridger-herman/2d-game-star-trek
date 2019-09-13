/* gameObjectManager.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Statically manage GameObject creation and deletion
 */

class GameObjectManager {
    static instantiate(name) {
        GameObjectManager._gameObjects[name] = new GameObject(name);
        return GameObjectManager._gameObjects[name];
    }

    static destroy(name) {
        delete GameObjectManager._gameObjects[name];
    }

    static update() {
        // Update loop
        for (let go in GameObjectManager._gameObjects) {
            GameObjectManager._gameObjects[go].update();
        }
    }

    static draw() {
        // Draw loop
        for (let go in GameObjectManager._gameObjects) {
            GameObjectManager._gameObjects[go].draw();
        }
    }
}

// Set the field "_gameObjects" so it can be used statically
GameObjectManager._gameObjects = {};