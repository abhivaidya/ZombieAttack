import Game from "../game";
import Player from "./player";

export default class Enemy
{
    public charModel:BABYLON.Mesh;
    public playerRef:Player;
    
    constructor()
    {
        
    }

    public update()
    {

    }

    public setPosition(position:BABYLON.Vector3)
    {
        this.charModel.position = position;
    }
}

export class Zombie extends Enemy
{
    private leftArmSpeed:number = 0;
    private rightArmSpeed:number = 0;
    private headSpeed:number = 0;

    constructor()
    {
        super();
        
        this.charModel = Game.enemyModels[2].clone();
        //2-head
        //3-left
        //4-right

        this.charModel.getChildMeshes()[2].rotation.y = -Math.PI / 8;
        this.charModel.getChildMeshes()[3].rotation.x = Math.PI / 4;
        this.charModel.getChildMeshes()[4].rotation.x = Math.PI / 4;
    }

    public update()
    {
        this.headSpeed += Math.random() * 0.04;
        this.leftArmSpeed += Math.random() * 0.04;
        this.rightArmSpeed += Math.random() * 0.04;
        
        this.charModel.getChildMeshes()[2].rotation.y = Math.sin(this.headSpeed) * 0.00625;
        this.charModel.getChildMeshes()[3].rotation.x = Math.sin(this.leftArmSpeed) * 0.00625;
        this.charModel.getChildMeshes()[4].rotation.x = Math.sin(this.rightArmSpeed) * 0.00625;
    }
}

export class Skeleton extends Enemy
{
    constructor()
    {
        super();

        this.charModel = Game.enemyModels[1].clone();
        
        this.charModel.getChildMeshes()[3].rotation.x = Math.PI / 4;
        this.charModel.getChildMeshes()[4].rotation.x = Math.PI / 4;
    }

    public update()
    {

    }
}

export class Ghost extends Enemy
{
    private angle:number = 0;

    constructor()
    {
        super();

        this.charModel = Game.enemyModels[0].clone();
                
        this.charModel.getChildMeshes()[3].rotation.x = Math.PI / 2;
        this.charModel.getChildMeshes()[4].rotation.x = Math.PI / 2;

        this.charModel.position.y += 0.25;
    }

    public update()
    {
        this.angle += 0.04;

        this.charModel.position.y += Math.sin(this.angle) * 0.00625;
    }
}