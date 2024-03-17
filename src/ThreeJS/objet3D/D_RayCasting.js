import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";

export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    const raycaster = new THREE.Raycaster();

    // Geometry and Material
    const geometry = new THREE.BoxGeometry();
    const normalMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // Blocks
    const blocks = [];
    const blocksMaterial = [];
    for (let i = 0; i < 3; i++) {
        const block = new THREE.Mesh(geometry, normalMaterial);
        block.position.x = i * 2 - 2;


        block.userData.id = "Je suis le bloc " + (i + 1) ;
        block.userData.id_position = i;
        ThreeCanvas.getScene().add(block);
        blocks.push(block);
        blocksMaterial.push(normalMaterial) ;
    }


    ThreeCanvas.setCustomRenderFunction(() => {

        raycaster.setFromCamera(ThreeCanvas.getMouse2D(), ThreeCanvas.getCamera());
        const intersects = raycaster.intersectObjects(blocks);

        for (let i = 0; i < blocks.length; i++) {
            blocks[i].material = blocksMaterial[i] ;
        }

        for (let i = 0; i < intersects.length; i++) {
            intersects[i].object.material = highlightMaterial;
        }

    });

    function onDocumentMouseDown(event) {
        event.preventDefault();

        raycaster.setFromCamera(ThreeCanvas.getMouse2D(), ThreeCanvas.getCamera());
        const intersects = raycaster.intersectObjects(blocks);

        if (intersects.length > 0) {
            // Le premier bloc qui intesect avec mon rayon
            let intesect = intersects[0].object ;
            const clickedBlockUserData = intesect.userData;

            console.log("Clicked Block ID:", clickedBlockUserData.id);
            let randomMat = Math.random() * 0xffffff ;
            // intesect.material.color.set(randomMat);
            blocksMaterial[clickedBlockUserData.id_position] = new THREE.MeshBasicMaterial({color:randomMat}) ;
        }
    }

    window.addEventListener('mousedown', onDocumentMouseDown, false);

    ThreeCanvas.lookAtIm(blocks[1]) ;

}
