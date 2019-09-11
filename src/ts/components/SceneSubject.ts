import { Scene, Mesh, IcosahedronBufferGeometry, MeshStandardMaterial } from "three";

class SceneSubject
{
    private _mesh: Mesh;

    constructor ( scene: Scene )
    {
        this._mesh = new Mesh( new IcosahedronBufferGeometry( 2, 2 ), new MeshStandardMaterial( { flatShading: true, wireframe: true } ) );
        this._mesh.position.set( 0, 0, -20 );
        scene.add( this._mesh );
    }

    public update( time )
    {
        const scale = Math.sin( time ) + 2;
        this._mesh.position.set( 0, scale, 0 );
    }
}

export default SceneSubject;

/*
const loader = new GLTFLoader();
let saucer: Object3D;
loader.load(
    require( '../assets/flying_saucer.glb' ),
    gltf =>
    {
        saucer = gltf.scene.children[ 0 ];
        saucer.scale.setScalar( 0.02 );
        scene.add( saucer );

        requestAnimationFrame( animate );
        console.log( 'Loaded flying saucer' );
    },
    undefined,
    err => console.error( 'Failed to load flying saucer model', err )
)
*/