import './main.css'
import { App } from './app/app';

let app = new App();

window.onresize = () => {
    app.onresize();
}