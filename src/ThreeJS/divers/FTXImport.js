import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import {FBXLoader} from "three/addons/loaders/FBXLoader";
import MyFBXModel from "@/assets/models/cottage/cottage_fbx.fbx";
//import * as THREE from "three";

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
        MyFBXModel,
        (object) => {
            ThreeCanvas.getScene().add(object);
            ThreeCanvas.lookAtIm(object);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
            console.log(error);
        }
    );


}