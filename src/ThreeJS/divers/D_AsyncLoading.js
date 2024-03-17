import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;



export function initAndBuildThree(container) {


    init(container) ;
    console.log("apres loading")


}

async function init(container) {
    try {
        await ThreeCanvas.enterScene(container,'/scene/radioV2.json') ;
        console.log("apres loading for real this time")
    } catch (error) {
        console.error('An error happened', error);
    }
}


