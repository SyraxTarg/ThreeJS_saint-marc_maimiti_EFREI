/* eslint-disable */

import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils";
import {ImprovedNoise} from "three/addons/math/ImprovedNoise";
import {addUIComponent} from "@/ThreeJS/BasicAndMouse";
import MyElementUi from "@/assets/ui/MyElementUi.vue";


let clock, model1, renderer, model, table, chair, chair2, mixerHorse, horseMesh, mixerHorse2, horseMesh2;
const objects = [];

const horses = [];
let flamingoMesh, mixerFlamingo, parrotMesh, mixerParrot;
const birds = [];
let cloudGeo, cloudMaterial;


const uiMaps = new Map();

let myUiElement;
let cloudParticles = [];


const worldWidth = 110;
const worldDepth = 110;
const worldHalfWidth = worldWidth / 2;
const worldHalfDepth = worldDepth / 2;

let fpEnabled = true;
let soundEnabled = false;




export function initAndBuildThree(container) {

    const data = generateHeight( worldWidth, worldDepth );

    ThreeCanvas.initThreeJSBase(container, true) ;

    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(0);

    ThreeCanvas.toggleShadows() ;

    const ambientLight = new THREE.AmbientLight( 0xeeeeee, 3 );
    ThreeCanvas.getScene().add(ambientLight) ;

    clock = new THREE.Clock();


    //BACKGROUND
    ThreeCanvas.getScene().background = new THREE.Color().setHSL( 0.6, 0, 1 );


    // CREATION DU RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    ThreeCanvas.setControl_FirstPerson(7, 0.05, true);
    ThreeCanvas.getCamera().position.y = getY( worldHalfWidth, worldHalfDepth ) ;


    //SONS
    const listener = new THREE.AudioListener();
    ThreeCanvas.getCamera().add( listener );

    const sound = new THREE.Audio( listener );

    const audioLoader = new THREE.AudioLoader();

    audioLoader.load( '/son/nature.ogg', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
    });

    const son = new THREE.Audio( listener );
    audioLoader.load( '/son/horses.ogg', function( buffer ) {
        son.setBuffer( buffer );
        son.setLoop( true );
        son.setVolume( 0.25 );
    });


    // CIEL
    const vertexShader = `
    varying vec3 vWorldPosition;

    void main() {
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

    const fragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;

    void main() {
        float h = normalize( vWorldPosition + offset ).y;
        gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
    }
`;

    const uniforms = {
        'topColor': { value: new THREE.Color( 0xf4cccc ) },
        'bottomColor': { value: new THREE.Color( 0xfff2cc ) },
        'offset': { value: 33 },
        'exponent': { value: 0.6 }
    };

    const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 ); // Géométrie de la sphère
    const skyMat = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
    } );

    const sky = new THREE.Mesh( skyGeo, skyMat );
    ThreeCanvas.getScene().add( sky );


    //SOL
    const solMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('/texture/grass/GroundGrassGreen002_COL_2K.jpg' ),
        normalMap: new THREE.TextureLoader().load('/texture/grass/GroundGrassGreen002_NRM_2K.jpg' ),
        depthWrite: false
    }) ;
    const sol = new THREE.Mesh( new THREE.PlaneGeometry( 300, 300 ), solMaterial);
    sol.rotation.x = - Math.PI / 2;
    sol.receiveShadow = true;
    sol.position.set(0,0,0)
    ThreeCanvas.getScene().add( sol );


    //NUAGES
    let loaderCloud = new THREE.TextureLoader();
    loaderCloud.load("/texture/nuage.png", function(texture){
        cloudGeo = new THREE.PlaneGeometry(500,500);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map:texture,
            transparent:true
        });

        for(let p=0; p<50; p++){
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random()*1000 - 600,
                300,
                Math.random()*500 - 500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*2*Math.PI;
            cloud.material.opacity = 0.55;
            cloudParticles.push(cloud);
            ThreeCanvas.getScene().add(cloud);
        }
    });


    //LUMIERE DIRECTIONNELLE N°1
    var light = new THREE.DirectionalLight(0xFFFFFF, 6);
    light.position.set(320, 200, 425);
    light.target.position.set(0, 10, 0);
    light.shadow.camera.top = 2000;
    light.shadow.camera.bottom = - 2000;
    light.shadow.camera.left = - 2000;
    light.shadow.camera.right = 2000;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 2000;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.castShadow = true;
    ThreeCanvas.getScene().add( light );

    ThreeCanvas.getCamera().position.set(4,8.5,2);

    //LUMIERE DIRECTIONNELLE N°2
    const spot = new THREE.DirectionalLight(0xF23869,3);
    ThreeCanvas.getScene().add(spot);
    spot.position.set(4, 10, 6);
    spot.target.position.set(4, 10, 0);
    spot.castShadow = true;
    spot.shadow.camera.near = 0.5;
    spot.shadow.camera.far = 500;
    ThreeCanvas.getScene().add(spot);


    //INSERTION DE MES MODELES
    const loader = new GLTFLoader();

    //MODELE DE TASSE QUE J'AI CREE SUR BLENDER
    loader.load('/models/tasse2.glb', function(gltf) {
        model = gltf.scene;
        insertModel(model, 0.5);
        setupDefaultScene();
    });

    //ENSEMBLE TABLE + CHAISES
    loader.load('/models/table/Table.glb', function(gltf) {
        table = gltf.scene;
        insertModel(table, 10);

    });

    loader.load('/models/table/Chair.glb', function(gltf) {
        chair = gltf.scene;
        insertModel(chair, 10, 6, 0, -0.5);
    });

    loader.load('/models/table/Chair.glb', function(gltf) {
        chair2 = gltf.scene;
        insertModel(chair2, 10, -6, 0, -0.5);

    });

    //ANIMAUX
    loader.load('/models/Horse.glb', function (gltf) {
       horseMesh = gltf.scene.children[0];
        insertModel(horseMesh, 0.1, -100, 0, 0);
        mixerHorse = new THREE.AnimationMixer(horseMesh);
        playAnimation(mixerHorse, gltf);
        horses.push(horseMesh);
    });

    loader.load('/models/Horse.glb', function (gltf) {
        horseMesh2 = gltf.scene.children[0];
        insertModel(horseMesh2, 0.1, -80, 0, 2);
        mixerHorse2 = new THREE.AnimationMixer(horseMesh2);
        playAnimation(mixerHorse2, gltf);
        horses.push(horseMesh2);
    });

    loader.load('/models/Flamingo.glb', function (gltf) {
        flamingoMesh = gltf.scene.children[0];
        insertModel(flamingoMesh, 0.1, -80, 20, 2);
        mixerFlamingo = new THREE.AnimationMixer(flamingoMesh);
        playAnimation(mixerFlamingo, gltf);
        birds.push(flamingoMesh);
    });

    loader.load('/models/Parrot.glb', function (gltf) {
        parrotMesh = gltf.scene.children[0];
        insertModel(parrotMesh, 0.1, -80, 20, 2);
        mixerParrot = new THREE.AnimationMixer(parrotMesh);
        playAnimation(mixerParrot, gltf);
        birds.push(parrotMesh);
    });

    animate();
    window.addEventListener('mousedown', onDocumentMouseDown, false);
    window.addEventListener( 'keydown', onKeyDown );



    //////////FONCTIONS////////////////

    //INSERTMODEL: PERMET D'INSERER LES MODELES DANS LA SCENE
    function insertModel(newModel, scale, x = 0, y = 0, z = 0){
        newModel.traverse(function(mesh){
            if(mesh.isMesh){
                mesh.castShadow=true;
                mesh.receiveShadow=true;
            }
        });
        newModel.scale.set(scale, scale, scale);
        if(newModel !== model){
            newModel.position.set(x,y,z);
            ThreeCanvas.getScene().add(newModel);
        }
    };

    //PLAYANIMATION: ENCAPSULE LA LOGIQUE PERMETTANT AUX ANIMAUX D'ETRES ANIMES
    function playAnimation(mixer, gltf){
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });
    }

    //ANIMATE: GERE LES ANIMATIONS EN GENERAL
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();

        animateMorphs(horses, delta);
        animateMorphs(birds, delta);

        cloudParticles.forEach(p => {
            p.rotation.z -=0.001;
        });

        renderer.render(ThreeCanvas.getScene(), ThreeCanvas.getCamera());
    }

    //ANIMATEMORPHS: GERE LES ANIMATIONS DES ANIMAUX
    function animateMorphs(morphList, delta){
        for (let i = 0; i < morphList.length; i++) {
            const morph = morphList[i];
            if(morphList == birds){
                const mixer = i === 0 ? mixerFlamingo : mixerParrot;
                morph.rotation.y = Math.PI;
                mixer.update(delta);
                morph.position.z -= 80 * delta + i * 0.1;
                if (morph.position.z < -300) {
                    morph.position.z = 300 + Math.random() * 300;
                }
            }
            if(morphList == horses){
                const mixer = i === 0 ? mixerHorse : mixerHorse2;
                mixer.update(delta);
                morph.position.z += 100 * delta + i * 0.1;
                if (morph.position.z > 300) {
                    morph.position.z = -300 - Math.random() * 300;
                }
            }

        }
    }


    //GENERATEHEIGHT: PERMET DE "DONNER" UNE PROFONDEUR A MA SCENE POUR QUE JE PUISSE M'Y DEPLACER EN 3 DIMENSIONS
    function generateHeight( width, height ) {
        const data = [], perlin = new ImprovedNoise(),
            size = width * height, z = Math.random() * 50;
        let quality = 2;
        for ( let j = 0; j < 4; j ++ ) {
            if ( j === 0 ) for ( let i = 0; i < size; i ++ ) data[ i ] = 0;
            for ( let i = 0; i < size; i ++ ) {
                const x = i % width, y = ( i / width ) | 0;
                data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
            }
            quality *= 4;
        }
        return data;
    }

    //GETY: PERMET D'OBTENIR LA POSITION Y D'UN POINT DANS LA SCENE
    function getY( x, z ) {
        return ( data[ x + z * worldWidth ] * 0.15 ) | 0;
    }

    //ONDOCUMENTMOUSEDOWN: GERE LE RAYCASTING
    function onDocumentMouseDown(event) {
        event.preventDefault();
        raycaster.setFromCamera(ThreeCanvas.getMouse2D(), ThreeCanvas.getCamera());
        const intersects = raycaster.intersectObject(model1, true);
        if (intersects.length > 0) {
            console.log("Raycaster opérationnel");
            let intesect = model1 ;
            ThreeCanvas.toggleVisibility(uiMaps.get(intesect)) ;
            ThreeCanvas.followElement(myUiElement, model1, 0, -100) ;

        }
    }

    //SETUPDEFAULTSCENE: PERMET D'AJOUTER MON MODELE DE TASSE A LA SCENE
    function setupDefaultScene() {
        model1 = SkeletonUtils.clone( model );
        model1.rotation.y += 3;
        model1.position.set(4,8.30,0);
        ThreeCanvas.getScene().add(model1);
        objects.push( model1 );
        myUiElement = addUIComponent(MyElementUi) ;
        uiMaps.set(model1, myUiElement);
    }

    //ONKEYDOWN: GERE LES EVENEMENTS DU CLAVIER
    function onKeyDown( event ) {
        if(event.key === "a"){
            ThreeCanvas.getCamera().position.set(4,8.5,2);
            ThreeCanvas.lookAt_FirstPerson(4, 8.5, 0);
        }
        if (event.key === "l"){
            ThreeCanvas.lookAt_FirstPerson(4, 8.5, 0);
        }
        if(event.keyCode === 38){
            ThreeCanvas.getCamera().position.set( ThreeCanvas.getCamera().position.x, ThreeCanvas.getCamera().position.y+1, ThreeCanvas.getCamera().position.z );
        }
        if(event.keyCode === 40){
            ThreeCanvas.getCamera().position.set( ThreeCanvas.getCamera().position.x, ThreeCanvas.getCamera().position.y-1, ThreeCanvas.getCamera().position.z );
        }
        if(event.keyCode === 13){
            if (fpEnabled !== true){
                ThreeCanvas.enable_FirstPerson(7, 0.05, true);
                fpEnabled = true;
            } else{
                ThreeCanvas.dispose_FirstPerson();
                fpEnabled = false;
            }
        }
        if(event.keyCode === 32){
            if (soundEnabled !== true){
                sound.play();
                son.play();
                soundEnabled = true;
            } else{
                sound.pause();
                son.pause();
                soundEnabled = false;
            }
        }
    }
}
