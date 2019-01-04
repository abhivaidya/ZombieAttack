import * as GUI from 'babylonjs-gui';

export default class UIManager
{
    private advancedTexture: GUI.AdvancedDynamicTexture;

    constructor()
    {
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    }

    public createImage()
    {
        let image = new GUI.Image("but", "assets/textures/Merry_Christmas.png");
        image.width = 0.25;
        image.height = 0.2;
        image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP; 
        this.advancedTexture.addControl(image);
    }

    public createText()
    {
        let text1 = new GUI.TextBlock();
        text1.text = "Hello world";
        text1.color = "purple";
        text1.fontSize = 40;
        text1.fontFamily = "fira_sansregular";
        this.advancedTexture.addControl(text1); 
    }
}