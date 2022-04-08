'use strict';

//this component will basically just toggle off/on the spinning of the walls
AFRAME.registerComponent('transport-to-link', {
  schema: {
    url: {default: ''},
    worldVisited: {type: "boolean", default: false}
  },
  multiple: false, //do not allow multiple instances of this component on this entity
  init: function() {
    
    //get a local reference to our entities and set some property variables
    const Context_AF = this;
    
    
    //listen on click
    Context_AF.el.addEventListener('click', function() {
        var completedAllScenes = document.querySelector('#wisp').components['wisp-component'].data.visitedScene3;
        if (completedAllScenes === true){
            window.location.href = Context_AF.data.url;
        }
        else{
            console.log("not finished yet!")
        }
    });
  },
  
});