import './style.css';
import { createGrid, handleGrid } from './gameGrid';
import { animate } from './utilities/animate';
import './constants'; 
import { setupMouseEvents } from './events';

setupMouseEvents();
createGrid();
handleGrid();
animate();
