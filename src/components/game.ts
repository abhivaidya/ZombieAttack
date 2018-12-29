import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { arcRotateCameraFixer } from '../libs/tencentTouchFixers';

import GameUtils from './gameUtils';

export default class Game 
{
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _arcCamera: BABYLON.ArcRotateCamera;
    private _shadowGenerator: BABYLON.ShadowGenerator;
    private _assetsManager: BABYLON.AssetsManager;

    private environment: BABYLON.Mesh;

    private keysDown: {[key: number]: boolean} = {};

    constructor(canvasElement: string) 
    {
        document.onkeydown = this.handleKeyDown.bind(this);
        document.onkeyup = this.handleKeyUp.bind(this);

        BABYLON.Engine.ShadersRepository = "src/shaders/";

        this._canvas = document.querySelector(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true, {}, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        this._scene.fogDensity = 0.05;
        this._scene.fogColor = new BABYLON.Color3(0.8, 0.83, 0.8);
        this._scene.collisionsEnabled = true;
        this._scene.gravity = new BABYLON.Vector3(0, 0, 0);

        this.createBasicEnv();
    }

    createBasicEnv(): void 
    {
        let skybox = BABYLON.Mesh.CreateSphere("skyBox", 10, 2500, this._scene);

        let shader = new BABYLON.ShaderMaterial("gradient", this._scene, "gradient", {});
        shader.setFloat("offset", 0);
        shader.setFloat("exponent", 0.6);
        shader.setColor3("topColor", BABYLON.Color3.FromInts(0, 119, 255));
        shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240, 240, 255));
        shader.backFaceCulling = false;
        skybox.material = shader;

        let d1 = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(1, -1, -2), this._scene);
        d1.position = new BABYLON.Vector3(-300, 300, 600);
        d1.intensity = 0.5;
        
        let h1 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);
        h1.intensity = 1;

        this._shadowGenerator = new BABYLON.ShadowGenerator(2048, d1);

        this._arcCamera = new BABYLON.ArcRotateCamera(
            'arcam',
            0,
            Math.PI / 2,
            5,
            new BABYLON.Vector3(0, 1, 0),
            this._scene
        );
        this._arcCamera.upperBetaLimit = Math.PI / 2;
        this._arcCamera.lowerRadiusLimit = 5;
        this._arcCamera.upperRadiusLimit = 30;
        arcRotateCameraFixer(this._arcCamera as BABYLON.ArcRotateCamera);
        this._arcCamera.attachControl(this._canvas, false);

        this._assetsManager = new BABYLON.AssetsManager(this._scene);
        this._engine.loadingUIText = 'Loading...';
        this._assetsManager.onProgressObservable.add((task) => {
            const { remainingCount, totalCount } = task;
            this._engine.loadingUIText = 'Loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        });

        this._assetsManager.onTaskSuccessObservable.add((task)=>{
            if(task.name == "environment")
            {
                this.environment = new BABYLON.Mesh("environment", this._scene);

                (task as BABYLON.MeshAssetTask).loadedMeshes.forEach((mesh)=>{
                    this.environment.addChild(mesh);

                    let shadowMap = this._shadowGenerator.getShadowMap();
                    shadowMap!.renderList!.push(mesh);
                    mesh.receiveShadows = true;
                });
            }            
        });

        this._assetsManager.onTasksDoneObservable.add(()=>{
            
        });
        
        this._assetsManager.load();

        let ground = BABYLON.Mesh.CreateGround("ground", 200, 200, 1, this._scene);
        ground.material = new BABYLON.StandardMaterial("ground", this._scene);
        (ground.material as BABYLON.StandardMaterial).diffuseColor = BABYLON.Color3.FromInts(193, 181, 151);
        (ground.material as BABYLON.StandardMaterial).specularColor = BABYLON.Color3.Black();
        ground.receiveShadows = true;
    }

    doRender(): void 
    {
        this._engine.runRenderLoop(() => {
            this._scene.render();

            let current = new Date().getTime();
        });

        window.addEventListener('resize', () => {
            this._engine.resize();
        })
    }

    private handleKeyDown(event: KeyboardEvent) 
    {
        this.keysDown[event.keyCode] = true;
    }
    
    private handleKeyUp(event: KeyboardEvent) 
    {
        this.keysDown[event.keyCode] = false;
    }
}