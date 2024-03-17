import * as THREE from 'three';
import * as ThreeCanvas from "@/ThreeJS/BasicAndMouse" ;
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';


let camera, scene, renderer, clock, stats, material;
let model;
let model1;

const mixers = [], objects = [];
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;


const raycaster = new THREE.Raycaster();


export function initAndBuildThree(container) {

    ThreeCanvas.initThreeJSBase(container, true) ;
    init();
    animate();

    function init() {

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set( 2, 3, - 6 );
        camera.lookAt( 0, 1, 0 );

        clock = new THREE.Clock();

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2067bf );
        scene.fog = new THREE.Fog( 0xe97451, 10, 50 );



        const hemiLight = new THREE.HemisphereLight( 0x407072 , 0x942Ce9 , 3 );
        hemiLight.position.set( 0, 20, 0 );
        scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
        dirLight.position.set( - 3, 10, - 10 );
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 4;
        dirLight.shadow.camera.bottom = - 4;
        dirLight.shadow.camera.left = - 4;
        dirLight.shadow.camera.right = 4;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        scene.add( dirLight );


        //particles

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        const sprite = new THREE.TextureLoader().load( '/public/texture/disc.png' );
        sprite.colorSpace = THREE.SRGBColorSpace;

        for ( let i = 0; i < 10000; i ++ ) {

            const x = 2000 * Math.random() - 1000;
            const y = 2000 * Math.random() - 1000;
            const z = 2000 * Math.random() - 1000;

            vertices.push( x, y, z );

        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
        material.color.setHSL( 1.0, 0.3, 0.7, THREE.SRGBColorSpace );

        const particles = new THREE.Points( geometry, material );
        scene.add( particles );

        // ground

        const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add( mesh );

        const loader = new GLTFLoader();
        loader.load( '/models/tasse.glb', function ( gltf ) {

            model = gltf.scene;

            model.traverse( function ( object ) {

                if ( object.isMesh ) object.castShadow = true;

            } );

            setupDefaultScene();

        } );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        ThreeCanvas.setCustomRenderFunction(() => {

            raycaster.setFromCamera(camera);


        });


        renderer.shadowMap.enabled = true;
        container.appendChild( renderer.domElement );

        stats = new Stats();
        container.appendChild( stats.dom );


        //container.style.touchAction = 'none';

        window.addEventListener( 'keypress', onKeyPress );
        window.addEventListener( 'resize', onWindowResize );
        window.addEventListener('mousedown', onDocumentMouseDown, false);
        window.addEventListener('mousemove', onDocumentMouseMove, false);

    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }


    function onDocumentMouseDown(event) {
        event.preventDefault();

        raycaster.setFromCamera(camera);
        const intersects = raycaster.intersectObjects(model1);

        if (intersects.length > 0) {
            console.log("Intersection détectée:", intersects[0]);
        }
    }


    function onKeyPress( event ) {
        if(event.key === "z"){
            camera.position.set( camera.position.x, camera.position.y, camera.position.z+1 );
        }
        if(event.key === "s"){
            camera.position.set( camera.position.x, camera.position.y, camera.position.z-1 );
        }
        if(event.key === "q"){
            camera.position.set( camera.position.x+1, camera.position.y, camera.position.z );
        }
        if(event.key === "d"){
            camera.position.set( camera.position.x-1, camera.position.y, camera.position.z-1 );
        }
        if(event.key === "a"){
            camera.position.set( 2, 3, - 6 );
        }

    }


    function setupDefaultScene() {

        model1 = SkeletonUtils.clone( model );

        model1.rotation.y += 3;
        //model1.position.set(0,0,0);

        const mixer1 = new THREE.AnimationMixer( model1 );


        scene.add( model1 );

        objects.push( model1 );
        mixers.push( mixer1);

    }


    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }


    function animate() {

        requestAnimationFrame( animate );

        const delta = clock.getDelta();

        for ( const mixer of mixers ) mixer.update( delta );

        renderer.render( scene, camera );
        render();


    }

    function render() {

        const time = Date.now() * 0.00005;

        const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
        material.color.setHSL( h, 0.5, 0.5 );

        renderer.render( scene, camera );

    }

}