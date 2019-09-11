import '../css/main.css';
import SceneManager from "./components/SceneManager";

const canvas: HTMLCanvasElement = document.getElementById( 'canvas' ) as HTMLCanvasElement;
const sceneManager = new SceneManager( canvas );

bindEventListeners();
render();

function bindEventListeners()
{
    window.onresize = resizeCanvas;
    resizeCanvas();
}

function resizeCanvas()
{
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();
}

function render()
{
    requestAnimationFrame( render );
    sceneManager.update();
}