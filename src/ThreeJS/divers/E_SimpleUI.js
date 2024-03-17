/* eslint-disable no-unused-vars */

import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";
import BasicElement from "@/assets/ui/BasicElement.vue";
import {addUIComponent, setCameraPosition} from "@/ThreeJS/BasicAndMouse";
import SimpleElement from "@/assets/ui/SimpleElement.vue";
import ComplexeElement from "@/assets/ui/ComplexeElement.vue";

let cubeElement1, cubeElement2, cubeElement3 ;
let allMoving = false, isMoving1 = false, isMoving2 = false, isMoving3 = false ;

let myUiElement1, myUiElement2, myUiElement3 ;
const uiMaps = new Map();
const cubes = [];

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    ThreeCanvas.setCameraPosition(0,7,0, true) ;

    const raycaster = new THREE.Raycaster();
    let cubeGeo = new THREE.BoxGeometry(1, 1, 1);

    cubeElement1 = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial({ color: "red" }));
    ThreeCanvas.getScene().add(cubeElement1) ;
    cubes.push(cubeElement1) ;
    myUiElement1 = addUIComponent(ComplexeElement, true) ;
    uiMaps.set(cubeElement1, myUiElement1);

    cubeElement2 = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial({ color: "blue" }));
    ThreeCanvas.getScene().add(cubeElement2) ;
    cubes.push(cubeElement2) ;
    myUiElement2 = addUIComponent(SimpleElement, true) ;
    uiMaps.set(cubeElement2, myUiElement2);

    cubeElement3 = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial({ color: "green" }));
    ThreeCanvas.getScene().add(cubeElement3) ;
    myUiElement3 = addUIComponent(BasicElement, true) ;
    cubes.push(cubeElement3) ;
    uiMaps.set(cubeElement3, myUiElement3);

    resetCubesPosition()

    ThreeCanvas.lookAtIm(cubeElement1) ;

    let time1 = 0 ;
    let time2 = 0 ;
    let time3 = 0 ;

    ThreeCanvas.setCustomRenderFunction((delta) => {

        if(isMoving1 || allMoving) {
            time1 += delta ;
            let movement = (delta * Math.sin(Math.PI/2 + time1) * 2) ;
            cubeElement1.position.set(cubeElement1.position.x + movement, cubeElement1.position.y, cubeElement1.position.z) ;
        }

        if(isMoving2 || allMoving) {
            time2 += delta ;
            let movement = (delta * Math.sin(Math.PI/2 + time2) * 2) ;
            cubeElement2.position.set(cubeElement2.position.x, cubeElement2.position.y, cubeElement2.position.z + movement) ;
        }

        if(isMoving3 || allMoving) {
            time3 += delta ;
            let movement = (delta * Math.sin(Math.PI/2 + time3) * 2) ;
            cubeElement3.position.set(cubeElement3.position.x  + movement, cubeElement3.position.y, cubeElement3.position.z - movement) ;
        }

        // Faire ca plus proprement
        ThreeCanvas.followElement(myUiElement1, cubeElement1, 0, -140) ;
        ThreeCanvas.followElement(myUiElement2, cubeElement2, 0, -140) ;
        ThreeCanvas.followElement(myUiElement3, cubeElement3, 0, -140) ;
    });

    window.addEventListener('mousedown', onDocumentMouseDown, false);


    function onDocumentMouseDown(event) {
        event.preventDefault();

        raycaster.setFromCamera(ThreeCanvas.getMouse2D(), ThreeCanvas.getCamera());
        const intersects = raycaster.intersectObjects(cubes);

        console.log(intersects) ;
        if (intersects.length > 0) {
            let intesect = intersects[0].object ;
            ThreeCanvas.toggleVisibility(uiMaps.get(intesect)) ;
        }
    }

}




export function purgeUIElements() {
    // TODO
}

export function getElementPosition() {
    return cubeElement1.getPosition() ;
}

export function setAllMoving(makeMove) {
    allMoving = makeMove ;
}

export function setMoving1(makeMove) {
    isMoving1 = makeMove ;
}

export function setMoving2(makeMove) {
    isMoving2 = makeMove ;
}

export function setMoving3(makeMove) {
    isMoving3 = makeMove ;
}

export function resetCubesPosition() {
    cubeElement1.position.set(-1, -2, 0);
    cubeElement2.position.set(0, 0, 1.5);
    cubeElement3.position.set(1, 2, -1.5);
}