import "./style.css"
import { createGrid} from './gameGrid';
import { addResources } from './Resource';
import { setupMouseEvents } from './events';
import { animate } from "./utilities/animate";

// Can I use static method of class here ? 
createGrid();
setupMouseEvents();
addResources();
animate();
