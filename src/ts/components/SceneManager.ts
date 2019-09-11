import { Clock, Scene, WebGLRenderer, PerspectiveCamera, Color, AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import SceneSubject from './SceneSubject';

class SceneManager
{
    private _clock: Clock;
    private _scene: Scene;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera;
    private _canvas: HTMLCanvasElement;
    private _controls: OrbitControls;

    private _screenDimensions = { width: 0, height: 0 };

    private _sceneSubjects: Array<any> = [];

    constructor ( canvas )
    {
        this._canvas = canvas;

        this._clock = new Clock();

        this._screenDimensions.width = canvas.width;
        this._screenDimensions.height = canvas.height;

        this._scene = this.buildScene();
        this._renderer = this.buildRenderer();
        this._camera = this.buildCamera();

        this._controls = new OrbitControls( this._camera, canvas );

        this.createSceneSubjects();
        this.buildLights();
    }

    private buildScene(): Scene
    {
        const scene = new Scene();
        scene.background = new Color( "#000" );

        return scene;
    }

    private buildRenderer(): WebGLRenderer
    {
        const renderer = new WebGLRenderer( { canvas: this._canvas, antialias: true, alpha: true } );
        const DPR = ( window.devicePixelRatio ) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio( DPR );
        renderer.setSize( this._screenDimensions.width, this._screenDimensions.height );

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    private buildCamera(): PerspectiveCamera
    {
        let aspectRatio = this._screenDimensions.width / this._screenDimensions.height;
        let fieldOfView = 75;
        let nearPlane = 0.1;
        let farPlane = 100;
        let camera = new PerspectiveCamera( fieldOfView, aspectRatio, nearPlane, farPlane );
        camera.position.set( 10, 5, 0 );

        return camera;
    }

    private buildLights()
    {
        const ambientLight = new AmbientLight( -1, 2 );
        this._scene.add( ambientLight );
    }

    private createSceneSubjects()
    {
        this._sceneSubjects.push( new SceneSubject( this._scene ) );
    }

    public update()
    {
        const elapsedTime = this._clock.getElapsedTime();

        for ( let i = 0; i < this._sceneSubjects.length; i++ )
            this._sceneSubjects[ i ].update( elapsedTime );

        this._controls.update();
        this._renderer.render( this._scene, this._camera );
    }

    public onWindowResize()
    {
        const { width, height } = this._canvas;

        this._screenDimensions.width = width;
        this._screenDimensions.height = height;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize( width, height );
    }
}

export default SceneManager;