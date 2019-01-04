export default class TileMap
{
    private mesh: BABYLON.Mesh;

    constructor()
    {
        this.buildMesh();
    }

    private buildMesh()
    {
        this.mesh = new BABYLON.Mesh('tile');
        
        let vertexData = BABYLON.VertexData.CreatePlane({size: 5, width: 5, height:5});
        vertexData.applyToMesh(this.mesh, false);
    }
}