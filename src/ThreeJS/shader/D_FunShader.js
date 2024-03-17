import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    ThreeCanvas.toggleShadows() ;
    ThreeCanvas.toggleLights() ;

    const planeGeometry = new THREE.PlaneGeometry(40, 40);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    ThreeCanvas.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const blueMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
    const redMaterial = new THREE.MeshToonMaterial({ color: "red" });
    const greenMaterial = new THREE.MeshStandardMaterial({ color: "green" });



    const blueCube = new THREE.Mesh(cubeGeometry, blueMaterial);
    blueCube.castShadow = true;
    blueCube.receiveShadow = true;
    blueCube.position.set(1, 0, 0);
    ThreeCanvas.add(blueCube);

    const redCube = new THREE.Mesh(cubeGeometry, redMaterial);
    redCube.castShadow = true;
    redCube.receiveShadow = true;
    redCube.position.set(2.5, 0, 0);
    ThreeCanvas.add(redCube);

    const greenCube = new THREE.Mesh(cubeGeometry, greenMaterial);
    greenCube.castShadow = true;
    greenCube.receiveShadow = true;
    greenCube.position.set(4, 0, 0);
    ThreeCanvas.add(greenCube);

    ThreeCanvas.setCameraPosition(2.5,5,15, true)
    ThreeCanvas.lookAtIm(redCube) ;

    buildFogs() ;
    toggleFog(0) ;

}

let fogV1 ;
let fogV2 ;

export function buildFogs() {
    const color = 0xAAAAAA;  // Replace with the color you want for the fog
    const near = 0.01;       // The minimum distance to start applying fog
    const far = 30;         // The maximum distance at which everything is completely fogged
    const density = 0.05;   // The density of the fog

    fogV1 = new THREE.Fog(color, near, far);
    fogV2 = new THREE.FogExp2(color, density);
}

export function toggleFog(type) {

    if(type == 0) {
        ThreeCanvas.getScene().fog = null ;
    } else if(type == 1) {
        ThreeCanvas.getScene().fog = fogV1 ;
    } else if((type == 2)) {
        ThreeCanvas.getScene().fog = fogV2 ;
    }

}

