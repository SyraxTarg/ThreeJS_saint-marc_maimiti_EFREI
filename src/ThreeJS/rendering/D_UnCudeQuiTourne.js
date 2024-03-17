/* eslint-disable no-unused-vars */

import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";

let element ;
let scene ;
let isMovingOnX = false ;
let isMovingOnY = false ;
let isMovingOnZ = false ;
const basePath = '/texture/wood/' ;
let rotationSpeed = 1 ;
let directionalLight ;

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    scene = ThreeCanvas.getScene() ;


    let cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    element = new THREE.Mesh(cubeGeo, getComplexWood());

    element.position.set(0, 0, 0);

    ThreeCanvas.getScene().add(element) ;
    ThreeCanvas.lookAtIm(element) ;

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5); // Position the light

    ThreeCanvas.setCustomRenderFunction((delta) => {

        if(isMovingOnX) {
            element.rotation.x += rotationSpeed * delta;
        }

        if(isMovingOnY) {
            element.rotation.y += rotationSpeed * delta;
        }

        if(isMovingOnZ) {
            element.rotation.z += rotationSpeed * delta;
        }

    });

    setDirectionalLight(true) ;

}

export function getComplexWood() {
    let texture = new THREE.TextureLoader().load(basePath + 'basecolor.jpg');
    let normalMap = new THREE.TextureLoader().load(basePath + 'normal.jpg');
    let roughnessMap = new THREE.TextureLoader().load(basePath + 'roughness.jpg');
    let metalnessMap = new THREE.TextureLoader().load(basePath + 'metallic.jpg');
    let opacityMap = new THREE.TextureLoader().load(basePath + 'opacity.jpg');

    return new THREE.MeshStandardMaterial({
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

export function setDirectionalLight(addOrRemove) {
    if(addOrRemove) {
        scene.add(directionalLight) ;
    } else {
        scene.remove(directionalLight) ;
    }
}

export function getElementPosition() {
    return element.getPosition() ;
}

export function setMovingOnX(makeMove) {
    isMovingOnX = makeMove ;
}

export function setMovingOnY(makeMove) {
    isMovingOnY = makeMove ;
}

export function setMovingOnZ(makeMove) {
    isMovingOnZ = makeMove ;
}

export function resetCubePosition() {
    element.position.set(0, 0, 0);
}