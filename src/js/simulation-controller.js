export class SimulationController {
    constructor(robotState, trajectory) {
        this.robotState = robotState;
        this.trajectory = trajectory;
        this.currentPoint = 0;
        this.animationId = null;
    }

    start(onUpdate) {
        const animate = () => {
            if (this.currentPoint >= this.trajectory.length) {
                this.currentPoint = 0;
            }
            
            const targetPoint = this.trajectory[this.currentPoint];
            const dx = targetPoint.x - this.robotState.x;
            const dy = targetPoint.y - this.robotState.y;
            
            // Update robot state
            this.robotState.x += dx * 0.1;
            this.robotState.y += dy * 0.1;
            this.robotState.theta = Math.atan2(dy, dx);
            
            onUpdate(this.robotState);
            this.currentPoint++;
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        if (this.animationId) {
            this.stop();
        }
        animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    reset(initialState) {
        this.stop();
        Object.assign(this.robotState, initialState);
        this.currentPoint = 0;
    }
}