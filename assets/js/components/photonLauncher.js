/* photonLauncher.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Launch a photon torpedo
 */

class PhotonLauncher extends Component {
    update() {
        // Space
        if (keyIsDown(32)) {
            let photon = GameObjectManager.instantiate('photon' + Date.now().toString());
            photon.renderer = new Renderer(photon, 'photon');
            photon.transform.position = this.gameObject.transform.globalPosition;
            photon.addComponent(new Velocity(photon, this.gameObject.transform.globalForward));
        }
    }
}
