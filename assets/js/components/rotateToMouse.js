/* rotateToMouse.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Make the current object always point toward the mouse
 */

class RotateToMouse extends Component {
	update() {
		let mouseLoc = createVector(mouseX, mouseY);
		let toMouse = p5.Vector.sub(mouseLoc, this.gameObject.transform.globalPosition).normalize();
		this.gameObject.transform.forward = toMouse;
	}
}
