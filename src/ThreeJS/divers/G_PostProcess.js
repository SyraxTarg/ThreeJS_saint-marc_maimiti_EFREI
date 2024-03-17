import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
//import * as THREE from "three";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';


export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;

}