/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse";
import * as THREE from "three";

const basePath = '/texture/wood/' ;
const basePathGrass = '/texture/grass/' ;
let scene ;
let element ;
let ambientLight ;
let directionalLight ;


export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    scene = ThreeCanvas.getScene() ;

    // Create Geometry
    let cubeGeo = new THREE.BoxGeometry(1, 1, 1);

    let materialRed = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color using hex value

    // Building the Element
    element = new THREE.Mesh(cubeGeo, materialRed);
    element.position.set(0, 1, 0);

    // Adding Lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5); // Position the light

    scene.add(element) ;
    ThreeCanvas.lookAtIm(element) ;

    applyGrass()
}

export function setAmbientLight(addOrRemove) {
    if(addOrRemove) {
        scene.add(ambientLight) ;
    } else {
        scene.remove(ambientLight) ;
    }
}

export function setDirectionalLight(addOrRemove) {
    if(addOrRemove) {
        scene.add(directionalLight) ;
    } else {
        scene.remove(directionalLight) ;
    }
}

export function applyColor() {
    let materialRed = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color using hex value
    element.material = materialRed ;
}

export function applySimpleWood() {
    let texture = new THREE.TextureLoader().load(basePath + 'basecolor.jpg');
    element.material = new THREE.MeshBasicMaterial({map: texture}) ;
}

export function applyNormalWood() {
    let texture = new THREE.TextureLoader().load(basePath + 'basecolor.jpg');
    let normalMap = new THREE.TextureLoader().load(basePath + 'normal.jpg');

    element.material = new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: normalMap
    }) ;
}

export function applyGrass() {
    let texture = new THREE.TextureLoader().load(basePathGrass + 'grass.png');
    let normalMap = new THREE.TextureLoader().load(basePathGrass + 'normal.png');

    element.material = new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: normalMap
    }) ;
}

export function applyComplexWood() {
    let texture = new THREE.TextureLoader().load(basePath + 'basecolor.jpg');
    let normalMap = new THREE.TextureLoader().load(basePath + 'normal.jpg');
    let roughnessMap = new THREE.TextureLoader().load(basePath + 'roughness.jpg');
    let metalnessMap = new THREE.TextureLoader().load(basePath + 'metallic.jpg');
    let opacityMap = new THREE.TextureLoader().load(basePath + 'opacity.jpg');

    element.material = new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        metalnessMap: metalnessMap,
        alphaMap: opacityMap,
        transparent: true, // Required when using an alphaMap
        roughness: 1,
        metalness: 1,
    }) ;
}

