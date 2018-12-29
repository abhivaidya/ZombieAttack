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
}