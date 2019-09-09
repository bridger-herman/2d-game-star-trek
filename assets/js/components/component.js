/* component.js
 * 
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 * 
 * Abstract component for a GameObject. All components should have an update()
 */

 class Component {
     constructor(gameObject) {
         // Pointer to parent game object
         this.gameObject = gameObject;
         console.log(gameObject);
     }

     update() {}
 }