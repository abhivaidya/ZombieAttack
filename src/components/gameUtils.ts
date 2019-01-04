export default class GameUtils
{
    constructor()
    {

    }

    public static degToRad(degrees: number):number
    {
        return degrees * Math.PI / 180;
    }

    public static HexToRGB(hex: string): BABYLON.Color3 
    {
        var r = this.HexToR(hex) / 255;
        var g = this.HexToG(hex) / 255;
        var b = this.HexToB(hex) / 255;

        return new BABYLON.Color3(r, g, b);
    }
    
    static CutHex(h) 
    { 
        return (h.charAt(0) == "#") ? h.substring(1, 7) : h 
    }
    
    static HexToR(h) 
    { 
        return parseInt((this.CutHex(h)).substring(0, 2), 16) 
    }

    static HexToG(h) 
    { 
        return parseInt((this.CutHex(h)).substring(2, 4), 16) 
    }
    
    static HexToB(h) 
    { 
        return parseInt((this.CutHex(h)).substring(4, 6), 16) 
    }

    public static showAxis(size, scene)
    {
        var axisX = BABYLON.Mesh.CreateLines("axisX", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
            ], scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);

        var xChar = this.makeTextPlane("X", "red", size / 10, scene);
        xChar.position = new BABYLON.Vector3(0.9 * size, 0.05 * size, 0);

        var axisY = BABYLON.Mesh.CreateLines("axisY", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
        ], scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);

        var yChar = this.makeTextPlane("Y", "green", size / 10, scene);
        yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
        ], scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);

        var zChar = this.makeTextPlane("Z", "blue", size / 10, scene);
        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    }

    private static makeTextPlane(text, color, size, scene)
    {
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);

        var plane = BABYLON.MeshBuilder.CreatePlane("TextPlane", {size: size}, scene);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        (plane.material as BABYLON.StandardMaterial).specularColor = new BABYLON.Color3(0, 0, 0);
        (plane.material as BABYLON.StandardMaterial).diffuseTexture = dynamicTexture;
        return plane;
    }
}