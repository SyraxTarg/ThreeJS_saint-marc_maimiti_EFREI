import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/pages/IndexPage.vue';

import VersIntroduction from '@/pages/introduction/A_IntroductionIndex.vue';
import IntroIntroduction from '@/pages/introduction/B_Intro_Introduction.vue';
import SimpleCube from '@/pages/introduction/C_SimpleCube.vue';
import CubeAvecTexture from '@/pages/introduction/D_CubeAvecTexture.vue';


import LesCanvas from '@/pages/canvas/A_CanvasIndex.vue';
import IntroCanvas from '@/pages/canvas/B_Intro_LesCanvas.vue';
import Canvas1 from '@/pages/canvas/TheCanvas1.vue';
import Canvas2 from '@/pages/canvas/TheCanvas2.vue';

import LesShaders from '@/pages/shader/A_ShaderIndex.vue';
import IntroShaders from '@/pages/shader/B_Intro_Shader.vue';
import Shadows from '@/pages/shader/C_ShadowRealm.vue';
import FunShaders from '@/pages/shader/D_FunShader.vue';
import TextureShader  from '@/pages/shader/E_ShaderTexture.vue';
import TheCloud  from '@/pages/shader/F_ComplexeShaderTexture.vue';

import LesRenderings from '@/pages/rendering/A_RenderingIndex.vue';
import IntroRendering from '@/pages/rendering/B_Intro_Rendering.vue';
import Override from '@/pages/rendering/C_RenderingOveride.vue';
import Rotation from '@/pages/rendering/D_RenderingRotation.vue';
import MouseMovement from '@/pages/rendering/E_RenderingMouse.vue';

import LesObjet3D from '@/pages/objet3D/A_Objet3DIndex.vue';
import IntroObjet3D from '@/pages/objet3D/B_Intro_Objet3D.vue';
import CameraMovement from '@/pages/objet3D/C_CameraMovement.vue';
import RayCasting from '@/pages/objet3D/D_RayCasting.vue';

import VersDivers from '@/pages/divers/A_DiversIndex.vue';
import IntroDivers from '@/pages/divers/B_Intro_Divers.vue';
import ImportScene from '@/pages/divers/C_ImportationScene.vue';
import AsyncLoading from '@/pages/divers/D_AsyncLoading.vue';
import HtmlUI from '@/pages/divers/E_HtmlUI.vue';
import Melody3D from '@/pages/divers/F_Melody3D.vue';

import VersEvaluation from '@/pages/evaluation/A_EvaluationIndex.vue';
import IntroEvaluation from '@/pages/evaluation/B_Intro_Evaluation.vue';
import ExempleEvaluation from '@/pages/evaluation/C_ExempleEvaluation.vue';
import OpenEvaluation from '@/pages/evaluation/D_EspaceEvaluation.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/intro',
            name: 'VersIntroduction',
            component: VersIntroduction,
            children: [
                {
                    path: '',
                    name: 'IntroIntroduction',
                    component: IntroIntroduction
                },
                {
                    path: 'simpleCube',
                    name: 'simpleCube',
                    component: SimpleCube
                },
                {
                    path: 'cubeAvecTexture',
                    name: 'CubeAvecTexture',
                    component: CubeAvecTexture
                }
            ]
        },
        {
            path: '/evaluation',
            name: 'VersEvaluation',
            component: VersEvaluation,
            children: [
                {
                    path: '',
                    name: 'IntroEvaluatoion',
                    component: IntroEvaluation
                },
                {
                    path: 'exempleEvaluation',
                    name: 'ExempleEvaluation',
                    component: ExempleEvaluation
                },
                {
                    path: 'openEvaluation',
                    name: 'OpenEvaluation',
                    component: OpenEvaluation
                }
            ]
        },
        {
            path: '/divers',
            name: 'VersDivers',
            component: VersDivers,
            children: [
                {
                    path: '',
                    name: 'IntroductionDivers',
                    component: IntroDivers
                },
                {
                    path: 'importScene',
                    name: 'ImportScene',
                    component: ImportScene
                },
                {
                    path: 'asyncLoading',
                    name: 'AsyncLoading',
                    component: AsyncLoading
                },
                {
                    path: 'htmlUI',
                    name: 'HtmlUI',
                    component: HtmlUI
                },
                {
                    path: 'melody3D',
                    name: 'Melody3D',
                    component: Melody3D
                }
            ]
        },
        {
            path: '/canvas',
            name: 'LesCanvas',
            component: LesCanvas,
            children: [
                {
                    path: '',
                    name: 'IntroCanvas',
                    component: IntroCanvas
                },
                {
                    path: 'Canvas1',
                    name: 'Canvas1',
                    component: Canvas1
                },
                {
                    path: 'Canvas2',
                    name: 'Canvas2',
                    component: Canvas2
                }
            ]
        },
        {
            path: '/objet3D',
            name: 'LesObjet3D',
            component: LesObjet3D,
            children: [
                {
                    path: '',
                    name: 'IntroObjet3D',
                    component: IntroObjet3D
                },
                {
                    path: 'cameraMovement',
                    name: 'CameraMovement',
                    component: CameraMovement
                },
                {
                    path: 'rayCasting',
                    name: 'RayCasting',
                    component: RayCasting
                }
            ]
        },
        {
            path: '/shader',
            name: 'LesShaders',
            component: LesShaders,
            children: [
                {
                    path: '',
                    name: 'IntroShaders',
                    component: IntroShaders
                },
                {
                    path: 'shadows',
                    name: 'Shadows',
                    component: Shadows
                },
                {
                    path: 'funshaders',
                    name: 'FunShaders',
                    component: FunShaders
                },
                {
                    path: 'textureShader',
                    name: 'TextureShader',
                    component: TextureShader
                },
                {
                    path: 'theCloud',
                    name: 'TheCloud',
                    component: TheCloud
                }
            ]
        },
        {
            path: '/rendering',
            name: 'LesRenderings',
            component: LesRenderings,
            children: [
                {
                    path: '',
                    name: 'IntroRendering',
                    component: IntroRendering,
                },
                {
                    path: 'override',
                    name: 'override',
                    component: Override,
                },
                {
                    path: 'rotation',
                    name: 'rotation',
                    component: Rotation,
                },
                {
                    path: 'mouse',
                    name: 'mouse',
                    component: MouseMovement,
                }



            ]
        },
    ]
});



export default router;
