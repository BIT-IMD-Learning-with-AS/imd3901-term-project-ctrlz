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
    Context_AF.player = document.querySelector('#player')
    
    //localStorage.clear();
    //Set player position to local storage position
    if (localStorage.getItem("playerCavePosX") !== null) {
      Context_AF.player.setAttribute('position', localStorage.getItem('playerCavePosX') + " " + localStorage.getItem('playerCavePosY') + " " + localStorage.getItem('playerCavePosZ'));
      console.log("not empty")
    } 
    else {
      Context_AF.player.setAttribute('position', 7 + " " + 10 + " " + 34);
      console.log("empty")
    }

    if (localStorage.getItem("hasVisitedThunderbird") !== null) {
      var visitedStories = [localStorage.getItem('hasVisitedThunderbird'), 
                      localStorage.getItem('hasVisitedPakallak'),
                      localStorage.getItem('hasVisitedNaming'),
                      localStorage.getItem('hasVisitedBeaver'),
                      localStorage.getItem('hasVisitedMedicine')]
    } 
    else {
        localStorage.setItem('hasVisitedThunderbird', false); 
        localStorage.setItem('hasVisitedPakallak', false);
        localStorage.setItem('hasVisitedNaming', false);
        localStorage.setItem('hasVisitedBeaver', false);
        localStorage.setItem('hasVisitedMedicine', false);

        var visitedStories = [localStorage.getItem('hasVisitedThunderbird'), 
                      localStorage.getItem('hasVisitedPakallak'),
                      localStorage.getItem('hasVisitedNaming'),
                      localStorage.getItem('hasVisitedBeaver'),
                      localStorage.getItem('hasVisitedMedicine')]
    }
    
    //listen on click
    Context_AF.el.addEventListener('click', function() {
        //Get player's current position
        var playerPos = document.querySelector('#player-box').components['player-component'].data.playerPosition;
        //Store locally
        localStorage.setItem('playerCavePosX', playerPos.x);
        localStorage.setItem('playerCavePosY', 10);
        localStorage.setItem('playerCavePosZ', playerPos.z);
        Context_AF.data.worldVisited = true;

        /*if (localStorage.getItem("hasVisitedThunderbird") !== null) {
          var visitedStories = [localStorage.getItem('hasVisitedThunderbird'), 
                          localStorage.getItem('hasVisitedPakallak'),
                          localStorage.getItem('hasVisitedNaming'),
                          localStorage.getItem('hasVisitedBeaver'),
                          localStorage.getItem('hasVisitedMedicine')]
        } 
        else {
            localStorage.setItem('hasVisitedThunderbird', false); 
            localStorage.setItem('hasVisitedPakallak', false);
            localStorage.setItem('hasVisitedNaming', false);
            localStorage.setItem('hasVisitedBeaver', false);
            localStorage.setItem('hasVisitedMedicine', false);
        }*/

        switch(Context_AF.el.id) {
          case 'thunderbird-pictograph':
            if (visitedStories[0] === "false"){
              localStorage.setItem('hasVisitedThunderbird', true);
              //Go to url
              window.location.href = Context_AF.data.url;
            }
            break;
          case 'pakallak-tyme-pictograph':
            if (visitedStories[0] === "true" && visitedStories[1] === "false"){
              localStorage.setItem('hasVisitedPakallak', true);
              //Go to url
              window.location.href = Context_AF.data.url;
            }
            break;
          case 'naming-ceremony-pictograph':
            if (visitedStories[1] === "true" && visitedStories[2] === "false"){
              localStorage.setItem('hasVisitedNaming', true);
              //Go to url
              window.location.href = Context_AF.data.url;
            }
            break;
          case 'beaver-pictograph':
            if (visitedStories[2] === "true" && visitedStories[3] === "false"){
              localStorage.setItem('hasVisitedBeaver', true);
              //Go to url
              window.location.href = Context_AF.data.url;
            }
            break;
          case 'medicine-wheel-pictograph':
            if (visitedStories[3] === "true" && visitedStories[4] === "false"){
              localStorage.setItem('hasVisitedMedicine', true);
              //Go to url
              window.location.href = Context_AF.data.url;
            }
            break;
        }

        //Go to url
        //window.location.href = Context_AF.data.url;
    });
  },
  
});