import "./style.css"
import { createGrid} from './gameGrid';
import { addResources } from './Resource';
import { setupMouseEvents } from './events';
import { animate } from "./utilities/animate";

createGrid();
setupMouseEvents();
addResources();
animate();
