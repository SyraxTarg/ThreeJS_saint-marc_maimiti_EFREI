/* eslint-disable no-unused-vars */

import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;

    // Create Geometry
    let cubeGeo = new THREE.BoxGeometry(1, 1, 1);

    // Set Color
    let materialRed = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color using hex value
    let materialGreen = new THREE.MeshBasicMaterial({ color: 'green' }); // Green color using CSS string
    let materialBlue = new THREE.MeshBasicMaterial({ color: new THREE.Color('blue') }); // Blue using THREE.Color

    // Set With WireFrame
    let materialWireFrame = new THREE.MeshBasicMaterial({ color: 0x00ff10, wireframe: true });

    // Building the Element
    let element = new THREE.Mesh(cubeGeo, materialRed);
    element.position.set(0, 1, 0);


    ThreeCanvas.getScene().add(element) ;
    ThreeCanvas.lookAtIm(element) ;

}