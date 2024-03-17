import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    ThreeCanvas.toggleShadows() ;
    ThreeCanvas.toggleLights() ;

    // Mon seul recoit de l'ombre mais n'en génère pas
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    ThreeCanvas.add(plane);

    // Mon cube recoit et créer de l'ombre
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    ThreeCanvas.add(cube);

    ThreeCanvas.lookAtIm(cube) ;
}