import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;

// import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
//import tableModel from '@/assets/models/radioRoom/old_wooden_table.glb';
//import radioModel from '@/assets/models/radioRoom/radio.glb';


export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    ThreeCanvas.toggleShadows() ;
    ThreeCanvas.toggleLights() ;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( 'jsm/libs/draco/gltf/' );

    const loader = new GLTFLoader();
    let table ;
    let radio ;
    //loader.setDRACOLoader( dracoLoader );
    loader.load( "/models/radioRoom/old_wooden_table.glb", function ( gltf ) {
        table = gltf.scene;
        table.position.set( 1, 1, 0 );
        table.scale.set( 1, 1, 1 );
        ThreeCanvas.getScene().add( table );
    }, undefined, function ( e ) {
        console.error( e );
    } );

    loader.load( "/models/radioRoom/radio.glb", function ( gltf ) {
        radio = gltf.scene;
        radio.position.set( 1, 1, 0 );
        radio.scale.set( 1, 1, 1 );
        ThreeCanvas.getScene().add( radio );
        ThreeCanvas.lookAtIm(radio)
    }, undefined, function ( e ) {
        console.error( e );
    } );


    ThreeCanvas.toggleLights() ;
    ThreeCanvas.toggleShadows() ;

}

