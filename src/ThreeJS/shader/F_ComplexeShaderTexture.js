/* eslint-disable no-unused-vars */

import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";
import vertexShader from '@/assets/shaders/dotcloud/vertexShader.glsl';
import fragmentShader from '@/assets/shaders/dotcloud/fragmentShader.glsl';
import {cleanupThreeJS} from "@/ThreeJS/BasicAndMouse";

let shaderMaterial ;

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;

    let cloud = buildGeometry() ;
    let shaderMaterial = createShaderMaterial() ;
    // Set With WireFrame
    let materialWireFrame = new THREE.MeshBasicMaterial({ color: 0x00ff10, wireframe: true });

    const pointCloud = new THREE.Points(cloud, shaderMaterial);
    ThreeCanvas.add(pointCloud);

    let currentTime = 0 ;

    ThreeCanvas.setCustomRenderFunction((delta) => {
        currentTime += delta ;
        let mouse = ThreeCanvas.getMouse2D() ;
        shaderMaterial.uniforms.time.value = currentTime;
        shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
    });

    ThreeCanvas.getScene().add(pointCloud) ;
    reCreateCamera() ;

}

function buildGeometry() {
    const particles = 2000;
    const density = 3;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * density);
    const affectedByMouseArray = new Float32Array(particles);
    const vibrationDirection = new Float32Array(particles);

    for (let i = 0; i < particles; i++) {
        // Uniform distribution in a sphere
        const r = Math.random() * 2;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * density] = r * Math.sin(phi) * Math.cos(theta); // x
        positions[i * density + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        positions[i * density + 2] = r * Math.cos(phi); // z
        affectedByMouseArray[i] = Math.round(Math.random());
        vibrationDirection[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('affectedByMouse', new THREE.BufferAttribute(affectedByMouseArray, 1));
    geometry.setAttribute('vibrationDirection', new THREE.BufferAttribute(vibrationDirection, 1));


    return geometry;
}

function createShaderMaterial() {
    const uniforms = {
        time: {value: 1.0},
        uMouse: {value: new THREE.Vector2()}
    };

    return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
}

// Pas propre mais bon, ca vous explique mieux comment fonctionne une camera
function reCreateCamera() {
    const fov = 100;
    const aspect = ThreeCanvas.getCamera().aspect ;
    const near = 0.1;
    const far = 300;

    let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 6.0;

    ThreeCanvas.setCamera(camera);
}

export function dispose() {
    shaderMaterial.dispose() ;
    ThreeCanvas.cleanupThreeJS() ;
}