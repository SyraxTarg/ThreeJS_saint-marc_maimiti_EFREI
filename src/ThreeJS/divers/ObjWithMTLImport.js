import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import ObjectModel from '@/assets/models/spaceShip/spaceShip.obj';
import MaterialFile from '@/assets/models/spaceShip/spaceShip.mtl';
// import * as THREE from "three";

// TODO get the MTL to work
export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    ThreeCanvas.toggleShadows() ;
    ThreeCanvas.toggleLights() ;



    const mtlLoader = new MTLLoader();
    mtlLoader.load(MaterialFile, (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load(
            ObjectModel,
            (object) => {
                // Your code to add the object to the scene
                ThreeCanvas.getScene().add(object);
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
    });




}