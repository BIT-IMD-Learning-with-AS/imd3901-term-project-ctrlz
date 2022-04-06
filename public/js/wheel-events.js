AFRAME.registerComponent('wheel-events', {
    // constructor
    schema: {section: {type : 'string', default : "",
              active: {type : 'boolean', default : false},
              rain_active:{type: 'boolean', default : false},
              thunder_active: {type: 'boolean', default: false},
              strom_active:{type: 'boolean', default: false},
              sunny_active: {type: 'boolean', default: false},
              delay_appear: {type: 'number', default: 5},
              delay_disappear: {type: 'number', default: 10},
              delay_current_appear: {type: 'number', default: 0}, // delay before execute events
              delay_current_disappear: {type: 'number', default: 0},
              strom_rotate:{ type: 'number', default: 0}
            } 
    },

    init: function(){
        const CONTEXT_AF = this;
        const EVENT_NUM = 4;
        
        
        // event listener for the enity attached 
        this.el.addEventListener('click',function(){
        
        
        
        
        
        CONTEXT_AF.data.active = true
        
        CONTEXT_AF.data.delay_current_appear = 0; 
        CONTEXT_AF.data.delay_current_disappear = 0;
        CONTEXT_AF.data.delay_appear = 5;
        CONTEXT_AF.data.delay_disappear = 10 //>> two times slower
        CONTEXT_AF.data.strom_rotate = 0
       
        //call the function based on section click - determine by the attribute
        if(CONTEXT_AF.data.section == "north-rain"){

          let rain_environment = document.querySelector('#wheel').children

          console.log(rain_environment)

          for(let i = 0;i< rain_environment.length; i++){
            rain_environment[i].setAttribute('wheel-events', {rain_active: true, thunder_active: false, strom_active :false, sunny_active: false})
          }

          //change the sky color

          let sky = document.querySelector('#sky')
          sky.setAttribute('src', '#rain-sky')

          // change ground color
          let ground = document.querySelector('#ground')
          ground.setAttribute('material', {color: '#131614'})
          CONTEXT_AF.createRain(CONTEXT_AF);
          
        }
        else if(CONTEXT_AF.data.section == 'east-thunder'){
          //thunder event is delay 30
          let rain_environment = document.querySelector('#wheel').children

          for(let i = 0;i< rain_environment.length; i++){
            rain_environment[i].setAttribute('wheel-events', {rain_active: false, thunder_active: true, strom_active :false, sunny_active: false})
          }
          let sky = document.querySelector('#sky')
          sky.setAttribute('src', '#thunder-sky')

          // change ground color
          let ground = document.querySelector('#ground')
          ground.setAttribute('material', {color: '#131625'})
        }

        else if(CONTEXT_AF.data.section == 'south-strom'){
          
          let rain_environment = document.querySelector('#wheel').children

          for(let i = 0;i< rain_environment.length; i++){
            rain_environment[i].setAttribute('wheel-events', {rain_active: false, thunder_active: false, strom_active :true, sunny_active: false})
          }
          console.log('click strom')

          // change sky color
          let sky = document.querySelector('#sky')
          sky.setAttribute('src', '#strom-sky')
          
           // change ground color
           let ground = document.querySelector('#ground')
          ground.setAttribute('material', {color: '#2e2636'})
        }
      
        else if(CONTEXT_AF.data.section = 'west-sunny'){
          let rain_environment = document.querySelector('#wheel').children

          for(let i = 0;i< rain_environment.length; i++){
            rain_environment[i].setAttribute('wheel-events', {rain_active: false, thunder_active: false, strom_active :false, sunny_active: true})
          }

          // change sky color
          let sky = document.querySelector('#sky')
          sky.setAttribute('src', '#sunny-sky')

          // change ground color
          let ground = document.querySelector('#ground')
          ground.setAttribute('material', {color: '#9d672a'})

        }

        let strom = document.querySelector('#strom')
          // let isStrom = strom.getAttribute('visible')
           console.log(CONTEXT_AF.data.strom_active)
          if(CONTEXT_AF.data.strom_active){
            strom.setAttribute('visible', true)
          }else{
            strom.setAttribute('visible', false)
          }
       }
       )
    },
    
    createRain: function(CONTEXT_AF){
      let environment = document.querySelector('#scene');
         let floor = document.querySelector("#ground");
         let floor_size = floor.getAttribute('geometry');
        
        //create rain entity
         let rain_temp = document.createElement('a-entity');

         //set attribute
         rain_temp.setAttribute('geometry', {primitive : 'cylinder', radius : 0.04, height : 0.5});
         rain_temp.setAttribute('material', {color : '#526a82'})
         rain_temp.setAttribute('ammo-body', {type : 'dynamic'});
         rain_position = this.getRandomLocation(35, 35);
         rain_temp.setAttribute('position',{x: rain_position[0], y:rain_position[1], z: rain_position[2]} );

        //attached rain entity to the DOM
         environment.appendChild(rain_temp);
    },

    createThunder: function(){
        let environment = document.querySelector('#scene');
        let floor = document.querySelector("#ground");
        let floor_size = floor.getAttribute('geometry');

        // thunder_length = this.getThunderLength(length = 4)
        // //make this with primitive >>>>>>>>>>>>>>>>>>> replace this with actual model
        // let thunder_temp = document.createElement('a-entity');
        // thunder_temp.setAttribute('class', 'thunder')
        // thunder_temp.setAttribute('geometry', {primitive: 'cylinder', height: thunder_length, radius: 0.1 })
        // thunder_temp.setAttribute('material', {color: '#efff42'})
        // thunder_temp.setAttribute('ammo-body', {type : 'static'});
        // thunder_position = this.getRandomLocation(floor_size.radius, floor_size.radius);
        // thunder_temp.setAttribute('position', {x: thunder_position[0], y: thunder_position[1], z: thunder_position[2]})
        // thunder_temp.setAttribute('rotation', {x: 0, y: 0, z: -20})
        // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        

        let thunder_temp = document.createElement('a-entity')
        thunder_temp.setAttribute('class', 'thunder')
        thunder_temp.setAttribute('gltf-model', '#lightning')
        thunder_position = this.getRandomLocation(5, 5);
        thunder_temp.setAttribute('position', {x: thunder_position[0], y: thunder_position[1], z: thunder_position[2]})
        thunder_temp.setAttribute('rotation', {x: 0, y: 0, z: -20})
        thunder_temp.setAttribute('scale', {x: 0.5, y: 0.5, y: 0.5})

        environment.appendChild(thunder_temp);
        
        return thunder_temp
    },

    getThunderLength: function(length){
        let max_length = 10 * length
        let min_length = 5*length
        newHeight = (Math.random() * max_length) + min_length
        console.log('New Thunder Length' + newHeight)
       
        return newHeight
    },

    // Funtion determine location of the rain/thunder
    getRandomLocation : function(floor_width,floor_depth){
      const height = 3 ; //meter
      x_coordinate = (Math.random() * floor_width) - floor_width/2;
      y_coordinate = (Math.random() * 30) + 1;
      z_coordinate = (Math.random() * floor_depth) - floor_depth/2;

      //this.data.location =  [x_coordinate, y_coordinate,z_coordinate]
      return [x_coordinate,y_coordinate,z_coordinate]
    
    },

    getRandomDelayTime: function(interval_start, interval_end){
      return Math.floor((Math.random() * interval_end) + interval_start);
      
    },

    tick : function(time){
      
      //Only when click start the delay timer
      if(this.data.active){
        this.data.delay_current_appear++;
        this.data.delay_current_disappear++;
        this.data.strom_rotate++;
      }
      
      //active when the north section is being click
      if(this.data.rain_active == true && this.data.section == 'north-rain'){
          
          this.createRain();
      }

      // active when the eastt section is being click
      if(this.data.thunder_active == true && this.data.section == 'east-thunder'){
        
        //get random time tunder appear
        
        //delay for certain amount and the the thunder appear
        if(this.data.delay_current_appear == this.data.delay_appear){

          console.log('Thunder Appear');
          this.data.delay_current_appear= 0;
          this.data.delay_appear = this.getRandomDelayTime(60,100);

          this.createThunder();
          thunder_temp= document.querySelector('.thunder')
          //if thunder exist
          if(thunder_temp != null){
          //   //get html of the thunder entity
          //   currentGeo = thunder_temp.getAttribute('geometry')
          //   if(JSON.stringify(currentGeo) != null){
          //     // get height attribute value
          //     console.log('Cylinder Height: ' + Object.values(currentGeo)[1]) // 1 being the height
          //     thundereight = this.getThunderLength(Object.values(currentGeo)[1])
          //     thunder_temp.setAttribute('geometry',{height: this.getThunderLength(Object.values(currentGeo)[1])} )
              
          //   }

          currentGeo = thunder_temp.getAttribute('scale')
          if(JSON.stringify(currentGeo) != null){
              thunder_height = this.getThunderLength(Object.values(currentGeo)[1])
              thunder_temp.setAttribute('scale', {x: 6, y: thunder_height, z:6})
          }

           }
        }
        
        if(this.data.delay_current_disappear == this.data.delay_disappear){
          this.data.delay_current_disappear = 0
          thunder_array = document.querySelectorAll('.thunder')
          
        if(Object.values(thunder_temp)[2] != ''){
          if(thunder_array.length != 0){
            console.log('thunder' + Object.values(thunder_temp))
          thunder_temp.remove()
        }
        }
        }

      }

      if(this.data.strom_active == true && this.data.section == 'south-strom'){
          if(this.data.strom_rotate >360){
            this.data.strom_rotate = 0
          }
          let strom = document.querySelector('#strom')
          strom.setAttribute('rotation', {x: 0, y: this.data.strom_rotate, z: 0})
      }
      // else{
      //     let strom = document.querySelector('#strom')
      //     strom.setAttribute('visible', false)
      // }

      // if(this.data.sunny_active == false){
      //   let strom = document.querySelector('#strom')
      //   strom.setAttribute('visible', false)
      // }
      
    }
      
  })