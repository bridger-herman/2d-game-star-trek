/* destroySelfOutsideScreen.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Make an object destroy itself once it's outside the screen bounds
 */

class DestroySelfOutsideScreen extends Component {
    update() {
        let posX = this.gameObject.transform.globalPosition.x;
        let posY = this.gameObject.transform.globalPosition.y;
        if (posX > width || posY > height || posX < 0 || posY < 0) {
            GameObjectManager.destroy(this.gameObject.name);
        }
    }
}
