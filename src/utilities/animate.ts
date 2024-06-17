import { handleGameGrid } from '../gameGrid';
import { handleResources } from '../Resource';
import { handleEnemies } from '../Enemy';
import { handleDefenders } from '../Defender';
import { handleProjectiles } from '../Projectile';
import { handleGameStatus } from '../handleGameStatus';
import { CTX, CANVAS, state } from '../state';


  export function animate() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = 'black';
    CTX.fillRect(0, 0, state.controlsBar.width, state.controlsBar.height);
    handleGameGrid();
    handleResources();
    handleEnemies();
    handleDefenders();
    handleProjectiles();
    handleGameStatus();
    state.frame++;
    if (!state.gameOver) requestAnimationFrame(animate);
}