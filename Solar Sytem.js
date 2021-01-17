
//import gsap from 'gsap/gsap-core';
import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
//import 
//var gsap = require("gsap");
//import {gsap} from "gsap";
//import gsap from 'gsap';
//import { gsap } from "gsap/dist/gsap";

import Stats from '/jsm/libs/stats.module.js';


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera (75, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.position.set(0,0,2300);

var renderer = new THREE.WebGLRenderer ();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const axis = new THREE.AxesHelper( 1000 );
//scene.add( axis );

var controls = new OrbitControls(camera, renderer.domElement);

var geometry_s = new THREE.SphereGeometry(3000, 64,64);
var material_s = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('galaxy_starfield.png'), side: THREE.DoubleSide});
var starfield = new THREE.Mesh (geometry_s, material_s);
scene.add(starfield);

var sun_geom = new THREE.SphereGeometry (100, 32, 32);
var sun_mat = new THREE.MeshBasicMaterial ({map : new THREE.TextureLoader().load('sun_detailed.jpg'), side: THREE.FrontSide});
var sun = new THREE.Mesh (sun_geom, sun_mat);
sun.position.set(0,0,0);
scene.add(sun);

var merc_geom = new THREE.SphereGeometry (20, 32, 32);
var merc_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('mercury.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var mercury = new THREE.Mesh (merc_geom, merc_mat);
mercury.position.set(400,0,0);
scene.add(mercury);

var venus_geom = new THREE.SphereGeometry (35, 32, 32);
var venus_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('venus.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var venus = new THREE.Mesh (venus_geom, venus_mat);
venus.position.set(600,0,0);
scene.add(venus);


var earth_geom = new THREE.SphereGeometry (35, 32, 32);
var earth_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('earth_terrain_4k.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var earth = new THREE.Mesh (earth_geom, earth_mat);
earth.position.set(800,0,0);
scene.add(earth);


var mars_geom = new THREE.SphereGeometry (25, 32, 32);
var mars_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('mars.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var mars = new THREE.Mesh (mars_geom, mars_mat);
mars.position.set(1020,0,0);
scene.add(mars);

var jup_geom = new THREE.SphereGeometry (70, 32, 32);
var jup_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('jupiter.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var jupiter = new THREE.Mesh (jup_geom, jup_mat);
jupiter.position.set(1400,0,0);
scene.add(jupiter);

var sat_geom = new THREE.SphereGeometry (60, 32, 32);
var sat_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('saturnmap.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var saturn = new THREE.Mesh (sat_geom, sat_mat);
saturn.position.set(1700,0,0);
scene.add(saturn);

var satr_geom = new THREE.RingGeometry (80,95,32);
var satr_mat = new THREE.MeshPhongMaterial ({map: new THREE.TextureLoader().load('saturnringcolor.jpg'), side: THREE.DoubleSide, shininess: 25});
var saturn_rings = new THREE.Mesh(satr_geom, satr_mat);
saturn_rings.rotation.x = Math.PI / 2;
saturn.add(saturn_rings);


var satr_geom = new THREE.RingGeometry (100,125,32);
var satr_mat = new THREE.MeshPhongMaterial ({map: new THREE.TextureLoader().load('saturnringcolor.jpg'), side: THREE.DoubleSide, shininess: 25});
var saturn_rings2 = new THREE.Mesh(satr_geom, satr_mat);
saturn_rings2.rotation.x = Math.PI / 2;
saturn.add(saturn_rings2);

var urn_geom = new THREE.SphereGeometry (50, 32, 32);
var urn_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('uranus.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var uranus = new THREE.Mesh (urn_geom, urn_mat);
uranus.position.set(2000,0,0);
scene.add(uranus);

var nept_geom = new THREE.SphereGeometry (40, 32, 32);
var nept_mat = new THREE.MeshPhongMaterial ({map : new THREE.TextureLoader().load('neptune.jpg'), side: THREE.FrontSide, color: 0xaaaaaa,
shininess: 25});
var neptune = new THREE.Mesh (nept_geom, nept_mat);
neptune.position.set(2300,0,0);
scene.add(neptune);


const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const light_p = new THREE.PointLight( 0xffffff, 8, 2300 );
light_p.position.set( 200, 0, 0 );
scene.add( light_p );

var orbits = function(rad, diff, colour,earth1){
    var radius = rad;
    var theta=0;
    var dtheta = 2 * Math.PI/diff;
    var material_o = new THREE.LineBasicMaterial({color: colour});
    var geometry_o = new THREE.Geometry();
    for (theta; theta < 2* Math.PI; theta += dtheta){
        geometry_o.vertices.push(new THREE.Vector3(radius * Math.cos(theta)*1.8, 0, radius * Math.sin(theta)));
    }
    var orbit = new THREE.Line (geometry_o, material_o);
    scene.add(orbit);
    console.log(earth1);
    
    return dtheta;
}


var mercury_d = orbits (220, 1000, 0x15FF00, earth);
var venus_d = orbits(330,1500, 0x15FF00, earth);
var earth_d = orbits(450, 2000, 0x15FF00, earth);
var mars_d = orbits(565, 3000, 0x15FF00, earth);
var jupiter_d = orbits(780, 2000, 0x15FF00, earth);
var saturn_d = orbits(950, 3000, 0x15FF00, earth);
var uranus_d = orbits(1110, 2000, 0x15FF00, earth);
var neptune_d = orbits(1280, 2000, 0x15FF00, earth);
/*var rad = 290;
var theta = 0;
var dtheta = 2 * Math.PI/10000;

var material_o = new THREE.LineBasicMaterial ({color : 0x15FF00});
var geometry_o = new THREE.Geometry ();

for (theta; theta < 2 * Math.PI; theta+=dtheta){
    geometry_o.vertices.push(new THREE.Vector3 (rad * Math.cos(theta) * 1.8,0,rad * Math.sin(theta)));
}

var orbit = new THREE.Line(geometry_o, material_o);
scene.add(orbit);*/

var geometry_m = new THREE.SphereGeometry (10 , 32 , 32);
var material_m = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('moon_4k.jpg'), side: THREE.FrontSide, color: 0xaaaaaa, shininess:25});
var moon = new THREE.Mesh(geometry_m, material_m);
moon.position.set(580,0,0);
earth.add(moon);
var rad_m = 60;
var theta_m = 0;
var mtheta = 2 * Math.PI/1000;
var theta = 0;
var earth_rev = function(name, diff, rad, duration){
    
    //var rev = gsap.to(name,{duration:25});
    gsap.registerPlugin();
    for (theta; theta < Math.PI * 2 ; theta+=diff){
    gsap.to(name,{duration:25,x: rad * Math.cos(theta) * 1.8, y: 0, z: rad * Math.sin (theta)});
    //rev = gsap.timeline({repeat:2});
    }
}
earth_rev(earth, earth_d, 450,25);
var revolution1 = function(name, rad, diff, delay){
    theta += diff;

    gsap.to(name.position,{duration:0, x: rad * Math.cos(theta) * 1.8, y: 0, z: rad * Math.sin (theta), delay:delay, timeScale:0.2 }).repeat();
   // name = gsap.timeline();
    //name.timeScale(5);
}
var revolution2 = function(name, rad, diff, delay){
    theta += diff;
    gsap.to(name.position,{x: rad * Math.cos(theta) * 1.8, y: 0, z: rad * Math.sin (theta), delay:delay*0, timeScale:20 }).repeat();
}

var revolution = function(name, rad, diff, duration){
    theta += diff;
    
    gsap.to(name.position,{duration:duration, x: rad * Math.cos(theta) * 1.8, y: 0, z: rad * Math.sin (theta) });
}
var flag = 0;
function animate(){
    earth.rotation.y += 0.01;
    
    revolution (mercury, 220, mercury_d,1);
    revolution (venus, 330, venus_d,1.5,20);
    revolution (earth, 450 , earth_d, 5);
    /*revolution (mars, 565, mars_d,4.5);
    revolution (jupiter, 780 , jupiter_d,6);
    revolution2 (saturn, 950 , saturn_d, 7.5);
    revolution (uranus, 1110 , uranus_d,9);
    revolution (neptune, 1280 , neptune_d,0);*/
   

    //theta += earth_d;
    //earth.position.x = 450 * Math.cos(theta) * 1.2;
    //earth.position.z = 450 * Math.sin(theta);
    theta_m += mtheta;
    moon.rotation.y += 0.01;
    moon.position.x = rad_m * Math.cos(theta_m);
    moon.position.z = rad_m * Math.sin(theta_m);
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
animate();