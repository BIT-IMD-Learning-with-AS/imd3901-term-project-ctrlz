'use strict';

//this component will basically just toggle off/on the spinning of the walls
AFRAME.registerComponent('transport-to-link', {
  schema: {
    url: {default: ''}
  },
  multiple: false, //do not allow multiple instances of this component on this entity
  init: function() {
    
    //get a local reference to our entities and set some property variables
    const Context_AF = this;
    Context_AF.player = document.querySelector('#player')
    
    //Set player position to local storage position
    
    Context_AF.player.setAttribute('position', localStorage.getItem('playerCavePosX') + " " + localStorage.getItem('playerCavePosY') + " " + localStorage.getItem('playerCavePosZ'));
    //listen on click
    Context_AF.el.addEventListener('click', function() {
        //Get player's current position
        var playerPos = document.querySelector('#player-box').components['player-component'].data.playerPosition;
        
        //Store locally
        localStorage.setItem('playerCavePosX', playerPos.x);
        localStorage.setItem('playerCavePosY', playerPos.y);
        localStorage.setItem('playerCavePosZ', playerPos.z);

        //Go to url
        window.location.href = Context_AF.data.url;
    });
  },
  
});