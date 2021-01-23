import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var mercury_flag = 0;
var venus_flag = 0;
var earth_flag = 0;
var mars_flag = 0;
var jupiter_flag = 0;
var saturn_flag = 0;
var uranus_flag = 0;
var neptune_flag = 0;

var vector = new THREE.Vector3();

var camera = new THREE.PerspectiveCamera (75, window.innerWidth/window.innerHeight, 0.1, 10000);
//camera.lookAt(scene.position);
scene.add(camera);
camera.position.set(-500,900,-1700);


var renderer = new THREE.WebGLRenderer ();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const axis = new THREE.AxesHelper( 1000 );
//scene.add( axis );

var controls = new OrbitControls(camera, renderer.domElement);

var geometry_s = new THREE.SphereGeometry(5000, 64,64);
var material_s = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('galaxy_starfield.png'), side: THREE.DoubleSide});
var starfield = new THREE.Mesh (geometry_s, material_s);
scene.add(starfield);

var sun_geom = new THREE.SphereGeometry (150, 32, 32);
var sun_mat = new THREE.MeshBasicMaterial ({map : new THREE.TextureLoader().load('sun_detailed.jpg'), side: THREE.FrontSide});
var sun = new THREE.Mesh (sun_geom, sun_mat);
sun.position.set(0,0,0);
scene.add(sun);

var merc_geom = new THREE.SphereGeometry (30, 32, 32);
var merc_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('mercury.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var mercury = new THREE.Mesh (merc_geom, merc_mat);
mercury.position.set(400,0,0);
scene.add(mercury);

var venus_geom = new THREE.SphereGeometry (40, 32, 32);
var venus_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('venus.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var venus = new THREE.Mesh (venus_geom, venus_mat);
venus.position.set(600,0,0);
scene.add(venus);

var earth_geom = new THREE.SphereGeometry (50, 32, 32);
var earth_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('earth_terrain_4k.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var earth = new THREE.Mesh (earth_geom, earth_mat);
earth.position.set(800,0,0);
scene.add(earth);


var mars_geom = new THREE.SphereGeometry (45, 32, 32);
var mars_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('mars.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var mars = new THREE.Mesh (mars_geom, mars_mat);
mars.position.set(1020,0,0);
scene.add(mars);

var jup_geom = new THREE.SphereGeometry (100, 32, 32);
var jup_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('jupiter.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var jupiter = new THREE.Mesh (jup_geom, jup_mat);
jupiter.position.set(1400,0,0);
scene.add(jupiter);

var sat_geom = new THREE.SphereGeometry (90, 32, 32);
var sat_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('saturnmap.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var saturn = new THREE.Mesh (sat_geom, sat_mat);
saturn.position.set(1700,0,0);
scene.add(saturn);

var satr_geom = new THREE.RingGeometry (85,130,32);
var satr_mat = new THREE.MeshPhongMaterial ({map: new THREE.TextureLoader().load('saturnringcolor.jpg'), side: THREE.DoubleSide, shininess: 25});
var saturn_rings = new THREE.Mesh(satr_geom, satr_mat);
saturn_rings.rotation.x = Math.PI / 2;
saturn.add(saturn_rings);


var satr_geom = new THREE.RingGeometry (132,160,32);
var satr_mat = new THREE.MeshPhongMaterial ({map: new THREE.TextureLoader().load('saturnringcolor.jpg'), side: THREE.DoubleSide, shininess: 25});
var saturn_rings2 = new THREE.Mesh(satr_geom, satr_mat);
saturn_rings2.rotation.x = Math.PI / 2;
saturn.add(saturn_rings2);

var urn_geom = new THREE.SphereGeometry (60, 32, 32);
var urn_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('uranus.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var uranus = new THREE.Mesh (urn_geom, urn_mat);
uranus.position.set(2000,0,0);
scene.add(uranus);

var nept_geom = new THREE.SphereGeometry (50, 32, 32);
var nept_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('neptune.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var neptune = new THREE.Mesh (nept_geom, nept_mat);
neptune.position.set(2300,0,0);
scene.add(neptune);

var geometry_m = new THREE.SphereGeometry (20 , 32 , 32);
var material_m = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('moon_4k.jpg'), side: THREE.FrontSide, color: 0xaaaaaa, shininess:25});
var moon = new THREE.Mesh(geometry_m, material_m);
moon.position.set(800,0,0);
earth.add(moon);
var rad_m = 90;
var theta_m = 0;
var mtheta = 2 * Math.PI/1000;

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const light_p = new THREE.PointLight( 0xffffff, 6, 4000 );
light_p.position.set( 0, 0, 0 );
scene.add( light_p );


/*
var mercury_detail = function(){
    var mercury_rad = 400;
    var diff= 2 * Math.PI / 1000;
    var merc_orbit_mat = new THREE.LineBasicMaterial ();
    var merc_geom_o = new THREE.Geometry();
    for (var theta=0; theta<=2* Math.PI;theta+=diff ){
        merc_geom_o.vertices.push(new THREE.Vector3 (mercury_rad*Math.cos(theta), 0, mercury_rad * Math.sin(theta)));
    }
    var mercury_orbit = new THREE.Line(merc_orbit_mat, merc_geom_o);
    scene.add(mercury_orbit);
}
mercury_detail();*/
var orbits = function(name, radius, delta){
    var theta =0;
    var diff = 2 * Math.PI / delta;
    var material_o = new THREE.LineBasicMaterial ();
    var geometry_o = new THREE.Geometry();
    for (theta; theta<= 2 * Math.PI; theta+=diff){
        geometry_o.vertices.push(new THREE.Vector3(radius * Math.cos(theta) * 1.8 , 0, radius * Math.sin(theta)));
    }
    var orbit = new THREE.Line (geometry_o, material_o);
    scene.add(orbit);
}
orbits(mercury, 400, 1000);
orbits(venus, 600, 2000);
orbits(earth, 800, 3000);
orbits(mars, 1020, 4000);
orbits(jupiter, 1400, 5000);
orbits(saturn, 1700, 6000);
orbits(uranus, 2000, 7000);
orbits(neptune, 2300, 8000);
var theta_mercury=0;
var theta = 0;
var revolution_mercury= function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_mercury) * 1.8;
    name.position.z = radius * Math.sin(theta_mercury);
    
    theta_mercury+=diff;

}

var theta_venus=0;

var revolution_venus = function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_venus) * 1.8;
    name.position.z = radius * Math.sin(theta_venus);
    
    theta_venus+=diff;

}

var theta_earth=0;

var revolution_earth = function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_earth) * 1.8;
    name.position.z = radius * Math.sin(theta_earth);
    
    theta_earth+=diff;

}

var theta_mars=0;

var revolution_mars = function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_mars) * 1.8;
    name.position.z = radius * Math.sin(theta_mars);
    
    theta_mars+=diff;

}

var theta_jupiter=0;

var revolution_jupiter = function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_jupiter) * 1.8;
    name.position.z = radius * Math.sin(theta_jupiter);
    
    theta_jupiter+=diff;

}

var theta_saturn=0;

var revolution_saturn = function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_saturn) * 1.8;
    name.position.z = radius * Math.sin(theta_saturn);
    
    theta_saturn+=diff;

}

var theta_uranus=0;

var revolution_uranus = function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_uranus) * 1.8;
    name.position.z = radius * Math.sin(theta_uranus);
    
    theta_uranus+=diff;

}
var theta_neptune=0;

var revolution_neptune= function(radius, delta, name){
    var diff = 2 * Math.PI/delta;
    name.position.x = radius * Math.cos(theta_neptune) * 1.8;
    name.position.z = radius * Math.sin(theta_neptune);
    
    theta_neptune+=diff;

}

document.getElementById('info').style.display = 'block';
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event){
    
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    //document.getElementById('info').style.display = 'block';
}

window.addEventListener('click', onMouseMove, false);

var FollowPlanet = function(name){
    camera.position.x = name.position.x + 100;
    camera.position.y = name.position.y + 100;
    camera.position.z = name.position.z + 100;
    camera.lookAt(name.position);
}
// window.addEventListener("keypress", aditya);
// function aditya(){

//             console.log('chutiya');
//             earth_flag=0;
        
// }
//detect Escape key press
document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
       //Esc key was pressed
        console.log('esc working');
        mercury_flag=0;
        venus_flag=0;
        earth_flag=0;
        mars_flag=0;
        jupiter_flag=0;
        saturn_flag=0;
        uranus_flag=0;
        neptune_flag=0;

   }
});
function animate(){
    
    mercury.rotation.y += 0.001;
    venus.rotation.y += 0.0001;
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.009;
    jupiter.rotation.y += 0.9;
    saturn.rotation.y += 0.8;
    neptune.rotation.y += 0.6;
    uranus.rotation.y += 0.7;
    revolution_mercury(400, 500, mercury);
    revolution_venus(600, 2000, venus);
    revolution_earth(800, 3000, earth);
    revolution_mars(1020, 4000, mars);
    revolution_jupiter(1400, 5000, jupiter);
    revolution_saturn(1700, 6000, saturn);
    revolution_uranus(2000, 7000, uranus);
    revolution_neptune(2300, 8000, neptune);
    theta_m += mtheta;
    moon.rotation.y += 0.01;
    moon.position.x = rad_m * Math.cos(theta_m)*1.2;
    moon.position.z = rad_m * Math.sin(theta_m);

    raycaster.setFromCamera (mouse, camera);
    const intersects = raycaster.intersectObjects ([mercury,venus,earth,mars,jupiter,saturn,uranus,neptune]);
    if (intersects[0]){
        console.log(intersects[0].object.geometry.id);
        switch(intersects[0].object.geometry.id){
            case 6:{
                console.log('earth flag');
                mercury_flag=1;
                venus_flag=0;
                earth_flag=0;
                mars_flag=0;
                jupiter_flag=0;
                saturn_flag=0;
                uranus_flag=0;
                neptune_flag=0;
                break;
            }
            case 8:{
                console.log('earth flag');
                mercury_flag=0;
                venus_flag=1;
                earth_flag=0;
                mars_flag=0;
                jupiter_flag=0;
                saturn_flag=0;
                uranus_flag=0;
                neptune_flag=0;
                break;
            }
            case 10:{
                console.log('earth flag');
                mercury_flag=0;
                venus_flag=0;
                earth_flag=1;
                mars_flag=0;
                jupiter_flag=0;
                saturn_flag=0;
                uranus_flag=0;
                neptune_flag=0;
                break;
            }
            case 12:{
                console.log('earth flag');
                mercury_flag=0;
                venus_flag=0;
                earth_flag=0;
                mars_flag=1;
                jupiter_flag=0;
                saturn_flag=0;
                uranus_flag=0;
                neptune_flag=0;
                break;
            }
            case 14:{
                console.log('earth flag');
                mercury_flag=0;
                venus_flag=0;
                earth_flag=0;
                mars_flag=0;
                jupiter_flag=1;
                saturn_flag=0;
                uranus_flag=0;
                neptune_flag=0;
                break;
            }
            case 16:{
                console.log('earth flag');
                mercury_flag=0;
                venus_flag=0;
                earth_flag=0;
                mars_flag=0;
                jupiter_flag=0;
                saturn_flag=1;
                uranus_flag=0;
                neptune_flag=0;
                break;
            }
            case 22:{
                console.log('earth flag');
                mercury_flag=0;
                venus_flag=0;
                earth_flag=0;
                mars_flag=0;
                jupiter_flag=0;
                saturn_flag=0;
                uranus_flag=1;
                neptune_flag=0;
                break;
            }
            case 24:{
                console.log('earth flag');
                mercury_flag=0;
                venus_flag=0;
                earth_flag=0;
                mars_flag=0;
                jupiter_flag=0;
                saturn_flag=0;
                uranus_flag=0;
                neptune_flag=1;
                break;
            }
            default:{
                mercury_flag=0;
                venus_flag=0;
                earth_flag=0;
                mars_flag=0;
                jupiter_flag=0;
                saturn_flag=0;
                uranus_flag=0;
                neptune_flag=0;
            }


        }
        // if (intersects[0].object.geometry.id == '10'){
        //     console.log(earth.position);
        //     mercury_flag=0;
        //     venus_flag=0;
        //     earth_flag=1;
        //     mars_flag=0;
        //     jupiter_flag=0;
        //     saturn_flag=0;
        //     uranus_flag=0;
        //     neptune_flag=0;
            //camera.lookAt(earth.position);

            /*camera.position.x = earth.position.x + 100;
            camera.position.y = earth.position.y + 100;
            camera.position.z = earth.position.z + 100;
            //camera.position.set(earth.position.x + 100, earth.position.y + 100, earth.position.z +100 );
            camera.lookAt(earth.position);*/
            
        
    }
    if (mercury_flag==1){
        FollowPlanet(mercury);
    }else if (venus_flag==1){
        FollowPlanet(venus);
    }else if (earth_flag==1){
        camera.position.x = earth.position.x + 100;
        camera.position.y = earth.position.y + 100;
        camera.position.z = earth.position.z + 100;
        // //camera.position.set(earth.position.x + 100, earth.position.y + 100, earth.position.z +100 );
        // earth.getWorldPosition ( vector );
        // console.log(vector);
        // var center = new THREE.Vector3();
        // var centre_geo = earth.geometry;
        // centre_geo.computeBoundingBox()
        // centre_geo.boundingBox.getCenter(center);
        console.log('earth',earth.position);
        console.log('sun',sun);
        camera.lookAt(earth.position);


    }else if (mars_flag==1){
        FollowPlanet(mars);
    }else if (jupiter_flag==1){
        FollowPlanet(jupiter);
    }else if (saturn_flag==1){
        FollowPlanet(saturn);
    }else if (uranus_flag==1){
        FollowPlanet(uranus);
    }else if (neptune_flag==1){
        FollowPlanet(neptune);
    }else {
        controls.update();
    }
    
    console.log(earth_flag);
   /* if (intersects[0].object.geometry.skinWeights.uuid == '"2CDF1785-86DF-4CC6-A3F8-C51233656B4D"'){
        //window.addEventListener('click', onMouseMove, false);
        document.getElementById('info').style.display = 'block';
   }*/

    
    // if (earth_flag !=1){
    //     controls.update();
    // }
    renderer.render(scene,camera);
        
    
    requestAnimationFrame(animate);
}
animate();