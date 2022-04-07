'use strict';

//this component will basically just toggle off/on the spinning of the walls
AFRAME.registerComponent('wisp-component', {
  schema: {
    visitedScene1: {type: "boolean", default: false},
    visitedScene2: {type: "boolean", default: false},
    visitedScene3: {type: "boolean", default: false}
  },
  
  multiple: false, //do not allow multiple instances of this component on this entity
  init: function() {
    
    //get a local reference to our entities and set some property variables
    const Context_AF = this;
    var scene1 = document.querySelector('#scene1');
    var scene2 = document.querySelector('#scene2');
    var scene3 = document.querySelector('#scene3');
    var beaver1 = document.querySelector('#beaver1');
    var beaver2 = document.querySelector('#beaver2');
    var beaver3 = document.querySelector('#beaver3');
    var muskrat = document.querySelector('#muskrat');

    scene1.setAttribute('visible', 'false')
    scene2.setAttribute('visible', 'false')
    scene3.setAttribute('visible', 'false')
    beaver1.setAttribute('visible', 'false')
    beaver2.setAttribute('visible', 'false')
    beaver3.setAttribute('visible', 'false')
    muskrat.setAttribute('visible', 'false')

    this.data.visitedScene1 = false;
    this.data.visitedScene2 = false;
    this.data.visitedScene3 = false;


  },

  

  //Updated player position
  tick: function () {
    var scene1 = document.querySelector('#scene1');
    var scene2 = document.querySelector('#scene2');
    var scene3 = document.querySelector('#scene3');
    var beaver1 = document.querySelector('#beaver1');
    var beaver2 = document.querySelector('#beaver2');
    var beaver3 = document.querySelector('#beaver3');
    var muskrat = document.querySelector('#muskrat');
    var wisp = document.querySelector('#wisp'); 
    var player = document.querySelector('#player');
    

    var playerPos = player.object3D.getWorldPosition(new THREE.Vector3())
    var wispPos = wisp.object3D.getWorldPosition(new THREE.Vector3())
    var scene1Pos = scene1.object3D.getWorldPosition(new THREE.Vector3())
    var scene2Pos = scene2.object3D.getWorldPosition(new THREE.Vector3())
    var scene3Pos = scene3.object3D.getWorldPosition(new THREE.Vector3())


    if (this.data.visitedScene1 === false && this.data.visitedScene2 === false && this.data.visitedScene3 === false){
        if ((playerPos.distanceTo(wispPos) < 3)){
            wisp.setAttribute('animation', {property:'position', to: scene1Pos.x + " " + 2 + " " + scene1Pos.z, easing:'linear', dur: 10000, enabled: true});
            wisp.object3D.lookAt(scene1Pos)
        }
        
        if ((playerPos.distanceTo(scene1Pos) < 7)){
            console.log("scene1 visited")
            this.data.visitedScene1 = true;
            scene1.setAttribute('visible', 'true')
            beaver1.setAttribute('visible', 'true')
        }
    }

    if (this.data.visitedScene1 === true && this.data.visitedScene2 === false && this.data.visitedScene3 === false){
        if ((playerPos.distanceTo(wispPos) < 3)){
            wisp.setAttribute('animation', {property:'position', from: scene1Pos.x + " " + 2 + " " + scene1Pos.z, to: scene2Pos.x + " " + 2 + " " + scene2Pos.z, easing:'linear', dur: 15000, enabled: true});
            wisp.object3D.lookAt(scene2Pos)
        }
        
        if ((playerPos.distanceTo(scene2Pos) < 7)){
            console.log("scene2 visited")
            this.data.visitedScene2 = true;
            scene2.setAttribute('visible', 'true')
            beaver2.setAttribute('visible', 'true')
        }
    }

    if (this.data.visitedScene1 === true && this.data.visitedScene2 === true && this.data.visitedScene3 === false){
        if ((playerPos.distanceTo(wispPos) < 3)){
            wisp.setAttribute('animation', {property:'position', from: scene2Pos.x + " " + 2 + " " + scene2Pos.z, to: scene3Pos.x + " " + 2 + " " + scene3Pos.z, easing:'linear', dur: 25000, enabled: true});
            wisp.object3D.lookAt(scene3Pos)
        }
        
        if ((playerPos.distanceTo(scene3Pos) < 7)){
            console.log("scene3 visited")
            this.data.visitedScene3 = true;
            scene3.setAttribute('visible', 'true')
            beaver3.setAttribute('visible', 'true')
            muskrat.setAttribute('visible', 'true')
        }
    }


    
  }
  
});