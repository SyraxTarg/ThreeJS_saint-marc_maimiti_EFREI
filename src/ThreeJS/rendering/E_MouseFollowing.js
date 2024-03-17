/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse";
import * as THREE from "three";
import * as KEY_ENUM from "@/ThreeJS/KeyEnum";

const basePath = '/texture/wood/' ;
const basePathGrass = '/texture/grass/' ;
let scene ;
let element ;
let ambientLight ;
let directionalLight ;
let isMoving ;
let camera ;

let movementForce = 1.5 ;

window.addEventListener('keydown', onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }

    let keyCode = event.which;

    if (keyCode === KEY_ENUM.keyboard.SPACE) {
        setMoving(!isMoving)
    } else if(keyCode === KEY_ENUM.keyboard.KEY_A) {
        console.log("A")
    }
}
export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    scene = ThreeCanvas.getScene() ;

    // Create Geometry
    let cubeGeo = new THREE.BoxGeometry(1, 1, 1);

    let woodMaterial = getComplexWood() ;

    // Building the Element
    element = new THREE.Mesh(cubeGeo, woodMaterial);
    resetCubePosition() ;

    // Adding Lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5); // Position the light

    scene.add(element) ;

    setCameraFrontFacing() ;
    camera = ThreeCanvas.getCamera() ;
    ThreeCanvas.lookAtIm(element) ;

    ThreeCanvas.setCustomRenderFunction((delta) => {
        if(isMoving) {
            let mouseDirection = ThreeCanvas.getNormalizedMouse() ;

            mouseDirection = mouseDirection.multiplyScalar(movementForce * delta)  ;
            if(mouseDirection) {
                element.position.add(mouseDirection) ;
            } else {
                console.log("No set Position")
            }


        }
    });

    setDirectionalLight(true) ;
}

export function resetCubePosition() {
    element.position.set(0, 0, 0);
    setCameraSideFacing() ;
}

export function setMoving(makeMove) {
    isMoving = makeMove ;
}

export function setCameraFrontFacing() {
    if(camera) {
        camera.position.x = element.position.x ;
        camera.position.y = element.position.y ;
        camera.position.z = element.position.z + 8;

        ThreeCanvas.lookAtIm(element) ;
    }
}

export function setCameraSideFacing() {
    if(camera) {
        camera.position.x = element.position.x + 3;
        camera.position.y = element.position.y + 3;
        camera.position.z = element.position.z + 3;

        ThreeCanvas.lookAtIm(element) ;
    }

}


export function setDirectionalLight(addOrRemove) {
    if(addOrRemove) {
        scene.add(directionalLight) ;
    } else {
        scene.remove(directionalLight) ;
    }
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

