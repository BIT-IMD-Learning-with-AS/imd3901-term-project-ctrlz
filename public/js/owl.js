'use strict';
//import process from 'process';
//import { process } from './process.js';
//module.exports = process;

AFRAME.registerComponent('owl-component', {
  schema: {
    
  },
  
  multiple: false, //do not allow multiple instances of this component on this entity
  init: function() {
    const Context_AF = this;
    Context_AF.thunderbirdPictograph = document.querySelector('#thunderbird-pictograph');
    Context_AF.owl = document.querySelector('#owl');
    //var thunderbirdPos = Context_AF.thunderbirdPictograph.object3D.position;

    //lines only used for debugging, uncomment to reset stories
    /*localStorage.setItem('hasVisitedThunderbird', false); 
    localStorage.setItem('hasVisitedPakallak', false);
    localStorage.setItem('hasVisitedNaming', false);
    localStorage.setItem('hasVisitedBeaver', false);
    localStorage.setItem('hasVisitedMedicine', false);*/

    console.log(localStorage.getItem('hasVisitedThunderbird'))
    console.log(localStorage.getItem('hasVisitedPakallak'))
    console.log(localStorage.getItem('hasVisitedNaming'))
    console.log(localStorage.getItem('hasVisitedBeaver'))
    console.log(localStorage.getItem('hasVisitedMedicine'))
    

    //Context_AF.owl.setAttribute('animation', {property:'position', to: thunderbirdPos.x + " " + 12 + " " + thunderbirdPos.z, easing:'linear', enabled: true});
    
    
  },

  //Updated player position
  tick: function () {
    var owl = document.querySelector('#owl');
    var thunderbirdPictograph = document.querySelector('#thunderbird-pictograph');
    var pakallakthymePictograph = document.querySelector('#pakallak-tyme-pictograph');
    var namingceremonyPictograph = document.querySelector('#naming-ceremony-pictograph');
    var beaverPictograph = document.querySelector('#beaver-pictograph');
    var medicinewheelPictograph = document.querySelector('#medicine-wheel-pictograph');

    let playerPos = document.querySelector('#player-box').components['player-component'].data.playerPosition;

    let thunderbirdPos = thunderbirdPictograph.object3D.position;
    let pakallakPos = pakallakthymePictograph.object3D.position;
    let namingceremonyPos = namingceremonyPictograph.object3D.position;
    let beaverPos = beaverPictograph.object3D.position;
    let medicinewheelPos = medicinewheelPictograph.object3D.position;

    let owlPos = owl.object3D.position;
    let distance = playerPos.distanceTo(owlPos)

    var visitedStories = [localStorage.getItem('hasVisitedThunderbird'), 
                          localStorage.getItem('hasVisitedPakallak'),
                          localStorage.getItem('hasVisitedNaming'),
                          localStorage.getItem('hasVisitedBeaver'),
                          localStorage.getItem('hasVisitedMedicine')]

    var positions = [thunderbirdPos, pakallakPos, namingceremonyPos, beaverPos, medicinewheelPos]
    //var name = ["thunderbird", "pakallak", "naming", "beaver", "medicine"];

    if (visitedStories[0] === "true" && visitedStories[1] === "true" && visitedStories[2] === "true" && visitedStories[3] === "true" && visitedStories[4] === "true"){
        localStorage.setItem('hasVisitedThunderbird', false); 
        localStorage.setItem('hasVisitedPakallak', false);
        localStorage.setItem('hasVisitedNaming', false);
        localStorage.setItem('hasVisitedBeaver', false);
        localStorage.setItem('hasVisitedMedicine', false);
    }
    else {
      for (let i = 0; i < visitedStories.length; i++){
        if (visitedStories[i] === "false"){
          if (distance < 10) {
            owl.setAttribute('animation', {property:'position', to: positions[i].x + " " + 12 + " " + positions[i].z, easing:'linear', dur: 4000, enabled: true});
            //console.log(name[i] + " " + visitedStories[i])
            owl.object3D.lookAt(positions[i])
            break;
         }
        }
      }
    }

    //check if thunderbird false
    /*if (localStorage.getItem('hasVisitedThunderbird') === "false"){
      if (distance < 15) {
         owl.setAttribute('animation', {property:'position', to: thunderbirdPos.x + " " + 12 + " " + thunderbirdPos.z, easing:'linear', dur: 2000, enabled: true});
      }
    }*/



  }
  
});