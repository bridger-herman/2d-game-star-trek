/* keyboardRotate.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Behaviour to make gameObject rotate with keyboard
 */

const ROTATE_AMT = Math.PI / 32.0;

class KeyboardRotateBehaviour extends Component {
    constructor(gameObject) {
        super(gameObject);
    }

    update() {
        // D
        if (keyIsDown(68)) {
            this.gameObject.transform.rotation += ROTATE_AMT;
        }
        // A
        if (keyIsDown(65)) {
            this.gameObject.transform.rotation -= ROTATE_AMT;
        }
    }
}
