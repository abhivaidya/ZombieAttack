export default class TileMap
{
    constructor()
    {
        this.buildMesh();
    }

    private buildMesh()
    {
        let mesh = new BABYLON.Mesh('tile');
        
        let vertexData = BABYLON.VertexData.CreatePlane({size: 5, width: 5, height:5});
        vertexData.applyToMesh(mesh, false);
    }
}