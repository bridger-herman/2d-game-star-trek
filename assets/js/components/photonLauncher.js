/* photonLauncher.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Launch a photon torpedo
 */

class PhotonLauncher extends Component {
    constructor(gameObject, photonSpeed) {
        super(gameObject);
        this._photonSpeed = photonSpeed;
    }
    update() {
        // Space
        if (keyIsDown(32)) {
            let photon = GameObjectManager.instantiate('photon' + Date.now().toString());
            photon.renderer = new Renderer(photon, 'photon');
            photon.transform.position = this.gameObject.transform.globalPosition;
            photon.addComponent(new Velocity(photon,
                p5.Vector.mult(this.gameObject.transform.globalForward,
                    this._photonSpeed)));
            photon.addComponent(new DestroySelfOutsideScreen(photon));
            photon.addComponent(new Weapon(photon));
        }
    }
}
