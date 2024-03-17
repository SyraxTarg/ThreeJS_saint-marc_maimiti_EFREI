import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import ObjectModel from '@/assets/models/spaceShip/spaceShip.obj';
import * as THREE from "three";

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    ThreeCanvas.toggleShadows() ;
    ThreeCanvas.toggleLights() ;

    const objLoader = new OBJLoader();
    objLoader.load(
        ObjectModel,
        (object) => {
            const material = loadTexture();
            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = material;
                    child.material.needsUpdate = true;
                }
            });
            // Add the loaded object to the scene
            ThreeCanvas.add(object);
            ThreeCanvas.lookAtIm(object) ;
        },
        // onProgress callback
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // onError callback
        (error) => {
            console.log('An error happened', error);
        }
    );

}

function loadTexture() {
    const texturePath = "/texture/ship" ;
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const aoMap = textureLoader.load(texturePath + '/ship_AO.jpg');
    const colorMap = textureLoader.load(texturePath + '/ship_color.jpg');
    const emissiveMap = textureLoader.load(texturePath + '/ship_emi.jpg');
    const metalnessMap = textureLoader.load(texturePath + '/ship_metal.jpg');
    const normalMap = textureLoader.load(texturePath + '/ship_normal.jpg');
    const roughnessMap = textureLoader.load(texturePath + '/ship_rough.jpg');

    const material = new THREE.MeshStandardMaterial({
        map: colorMap,
        aoMap: aoMap,
        emissiveMap: emissiveMap,
        emissive: new THREE.Color('white'), // This color can be adjusted to match your emissive map
        emissiveIntensity: 10, // Adjust the intensity as needed
        metalnessMap: metalnessMap,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        metalness: 2, // This value is material-specific and can be adjusted
        roughness: 2  // This value is material-specific and can be adjusted
    });

    return material ;
}