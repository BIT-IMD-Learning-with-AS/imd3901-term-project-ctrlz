'use strict';

//this component will basically just toggle off/on the spinning of the walls
AFRAME.registerComponent('player-component', {
  schema: {
    playerPosition: {type: 'vec3', default: {x: 23, y: 10, z: 34}}
  },
  
  multiple: false, //do not allow multiple instances of this component on this entity
  init: function() {
    
    //get a local reference to our entities and set some property variables
    const Context_AF = this;

    
    

  },

  //Updated player position
  tick: function () {
    var player = document.querySelector('#player');
    this.data.playerPosition = player.object3D.position
  }
  
});