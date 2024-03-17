/* eslint-disable no-unused-vars */

import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";

let element ;
let isMoving = false ;
export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;


    let cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    let materialRed = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color using hex value
    element = new THREE.Mesh(cubeGeo, materialRed);

    element.position.set(0, 0, 0);

    ThreeCanvas.getScene().add(element) ;
    ThreeCanvas.lookAtIm(element) ;

    ThreeCanvas.setCustomRenderFunction((delta) => {

        if(isMoving) {
            element.position.set(0,element.position.y + (3 * delta) ,0) ;
        }

    });

}

export function getElementPosition() {
    return element.getPosition() ;
}

export function setMoving(makeMove) {
    isMoving = makeMove ;
}

export function resetCubePosition() {
    element.position.set(0, 0, 0);
}