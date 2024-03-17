/* eslint-disable no-unused-vars */
import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";


let buttonBack ;
const nameButtonBack = "Button_back" ;
let buttonForth ;
const nameButtonForth = "Button_forth" ;
let raycaster ;
let buttons = [] ;

let stateButtonBack = 0 ;
let stateButtonForth = 0 ;

let canvasRef ;
let htmlElementRef ;

// eslint-disable-next-line no-unused-vars
export function initAndBuildThree(container, htmlElement) {

    raycaster = new THREE.Raycaster();

    init(container) ;

    htmlElementRef = htmlElement ;
    toggleVisibility(htmlElementRef) ;

    ThreeCanvas.setCustomRenderFunction((delta) => {

        raycaster.setFromCamera(ThreeCanvas.getMouse2D(), ThreeCanvas.getCamera());
        const intersects = raycaster.intersectObjects(buttons);

        buttons.forEach(button => {
            button.userData.stateButton = 0 ;
        })

        for (let i = 0; i < intersects.length; i++) {
            intersects[i].object.userData.stateButton = 1;
        }

        shaderMaterialBack.uniforms.state.value = buttonBack.userData.stateButton ;
        shaderMaterialBack.uniforms.iTime.value += delta;

        shaderMaterialForth.uniforms.state.value = buttonForth.userData.stateButton ;
        shaderMaterialForth.uniforms.iTime.value += delta;

        followTheMouse(htmlElement) ;
    });

}

function toggleVisibility(forElement) {
    if (forElement.style.visibility === 'hidden') {
        forElement.style.visibility = 'visible';
    } else {
        forElement.style.visibility = 'hidden';
    }
}

export function followTheMouse(htmlElement) {

    if(!htmlElement || !buttonBack) {
        console.log("Can't follow yet")
        return ;
    }

    const vector = new THREE.Vector3();

    // Convert the world position of the mesh to screen space
    vector.setFromMatrixPosition(buttonBack.matrixWorld);
    vector.project(ThreeCanvas.getCamera());

    // Convert the normalized screen space coordinates to CSS coordinates

    const x = (vector.x *  .5 + .5) * ThreeCanvas.getRenderer().domElement.clientWidth;
    const y = -(vector.y * .5 - .5) * ThreeCanvas.getRenderer().domElement.clientHeight;

    // Update the position of the HTML element
    var rect = canvasRef.getBoundingClientRect();

    let posX = x + rect.left ;
    let posY = y + rect.top ;

    htmlElement.style.left = posX + "px";
    htmlElement.style.top = posY + "px";

}


async function init(container) {
    try {
        let maScene = await ThreeCanvas.enterScene(container,'/scene/radioV3.json') ;

        // let table = maScene.getObjectByName("WoodTable", true) ;

        // let radio = maScene.getObjectByName("radio", true) ;

        canvasRef = container.querySelector('canvas') ;
        setButtons(maScene) ;

    } catch (error) {
        console.error('An error happened', error);
    }
}


function setButtons(maScene) {
    buttonBack = maScene.getObjectByName(nameButtonBack, true) ;
    buttonBack.userData.stateButton = stateButtonBack;
    buttonForth = maScene.getObjectByName(nameButtonForth, true) ;
    buttonForth.userData.stateButton = stateButtonForth;

    buttons.push(buttonBack) ;
    buttons.push(buttonForth) ;


    buttonBack.visible = true ;
    buttonForth.visible = true ;

    buttonBack.material = shaderMaterialBack;
    buttonBack.needsUpdate = true;

    buttonForth.material = shaderMaterialForth
    buttonForth.needsUpdate = true;

    window.addEventListener('mousedown', activateButtonClick, false);

}

function activateButtonClick() {
    raycaster.setFromCamera(ThreeCanvas.getMouse2D(), ThreeCanvas.getCamera());
    const intersects = raycaster.intersectObjects(buttons);

    if (intersects.length > 0) {
        let intesect = intersects[0] ;
        let data = intesect.object.userData ;
        console.log(data) ;
        data.stateButton = 2;
        toggleVisibility(htmlElementRef) ;
    }
}

const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    const float e = 2.7182818284590452353602874713527;
    uniform float iTime;
    uniform int state;
    // 0 = Idle / Transparent
    // 1 = hover / Solid
    // 2 = Clicked / Colors 
    varying vec2 vUv;

    vec4 noise(vec2 texCoord)
    {
        float alpha;
        float speed;
    
        if(state == 0) 
        {
            alpha = 0.15 ; 
            speed = 0.02 ; 
        }
        else if(state == 1)
        {
            alpha = 0.9 ;
            speed = 0.05 ;
        }
        else if(state == 2)
        {
            alpha = 0.7 ; 
            speed = 0.05 ; 
        }
        else 
        {
            alpha = 0.0 ;
            speed = 0.0 ; 
        }
            
        float G = e + (iTime * speed);
        vec2 r = (G * sin(G * texCoord.xy));
          
        float val = fract(r.x * r.y * (1.0 + texCoord.x));
        return vec4(val, val, val, alpha);
    }

   
    void main() {
        gl_FragColor = noise(vUv);
    }
`;

// Create ShaderMaterial
const shaderMaterialBack = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        iTime: { value: 0.0 },
        state:  { value: 0 }
    },
    transparent: true,
});

const shaderMaterialForth = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        iTime: { value: 0.0 },
        state:  { value: 0 }
    },
    transparent: true,
});

