/* eslint-disable no-unused-vars */

import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;

    // Create Geometry
    let cubeGeo = new THREE.BoxGeometry(1, 1, 1);


    // Building the Element
    let element = new THREE.Mesh(cubeGeo, customMaterial);
    element.position.set(0, 1, 0);


    ThreeCanvas.setCustomRenderFunction((delta) => {
        customMaterial.uniforms.time.value += 0.05;
    });

    ThreeCanvas.getScene().add(element) ;
    ThreeCanvas.lookAtIm(element) ;

}

const customMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 2.0 + pos.y * 2.0 + time) * 0.5;
            pos.z += wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;

        void main() {
            float mixFactor = sin(vUv.x * 3.1415);
            vec3 colorA = vec3(0.2, 0.8, 0.2); // Green shade
            vec3 colorB = vec3(0.2, 0.2, 0.8); // Blue shade
            vec3 color = mix(colorA, colorB, mixFactor);
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    uniforms: {
        time: { value: 0 }
    }
});