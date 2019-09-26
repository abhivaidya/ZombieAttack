import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, Mesh, PlaneBufferGeometry, Math as ThreeMath, Object3D, Vector3, Color, HemisphereLight, MeshStandardMaterial, Fog } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class App {
    private scene;
    private camera;
    private renderer;
    private controls;

    private characterList = ['character_ghost', 'character_skeleton', 'character_zombie'];
    private environmentList = ['bench', 'benchBroken'];

    constructor() {
        this.scene = new Scene();
        this.scene.background = new Color(0xccddff);
        this.scene.fog = new Fog(0xccddff, 5, 20);

        this.camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
        this.camera.position.set(8, 5, 0);
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.renderer = new WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enablePan = true;
        this.controls.enableZoom = true;
        this.controls.maxDistance = 1000;
        this.controls.minDistance = 5;
        this.controls.target.copy(new Vector3(0, 0, 0));

        const ambientLight = new AmbientLight(-1, 2);
        this.scene.add(ambientLight);

        const hemisphereLight = new HemisphereLight(0xdddddd, 0x000000, 0.5);
        this.scene.add(hemisphereLight);

        this.createFloor();

        this.render();

        this.loadCharacterModels();
        this.loadEnvironmentModels();
    }

    private createFloor() {
        let geometry = new PlaneBufferGeometry(100000, 100000);
        let material = new MeshStandardMaterial({ color: 0x336633 });
        let plane = new Mesh(geometry, material);
        plane.rotation.x = -1 * Math.PI / 2;
        plane.position.y = 0;
        this.scene.add(plane);
    }

    private loadCharacterModels() {
        const loader = new GLTFLoader();
        for (let index = 0; index < this.characterList.length; index++) {
            let mesh: Object3D;
            loader.load(
                require('../../assets/characters/' + this.characterList[index] + '.glb'),
                gltf => {
                    mesh = gltf.scene.children[0];
                    this.scene.add(mesh);

                    mesh.position.set(Math.random() * 6 - 3, 0.5, 0);
                },
                undefined,
                err => console.error('Failed to load model', err)
            );
        }
    }

    private loadEnvironmentModels() {
        const loader = new GLTFLoader();
        for (let index = 0; index < this.environmentList.length; index++) {
            let mesh: Object3D;
            loader.load(
                require('../../assets/environment/' + this.environmentList[index] + '.glb'),
                gltf => {
                    mesh = gltf.scene.children[0];
                    this.scene.add(mesh);

                    mesh.position.set(Math.random() * 6 - 3, 0.5, 0);
                },
                undefined,
                err => console.error('Failed to load model', err)
            );
        }
    }

    private adjustCanvasSize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
        this.controls.update();
        this.adjustCanvasSize();

        if (this.camera.position.y < 2) {
            this.camera.position.y = 2;
        }
    }

    public onresize() {
        this.renderer.setSize(innerWidth, innerHeight)
        this.camera.aspect = innerWidth / innerHeight
        this.camera.updateProjectionMatrix()
    }
}
