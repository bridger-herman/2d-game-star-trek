/* followMouse.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Behaviour to make gameObject follow mouse clicks
 */

 class FollowMouseBehaviour extends Component {
     update() {
         if (mouseIsPressed) {
            this.gameObject.transform.position = new Vector2(mouseX, mouseY)
         }
     }
 }
