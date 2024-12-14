export class RobotRenderer {
    constructor(ctx, transformer) {
        this.ctx = ctx;
        this.transformer = transformer;
    }

    draw(robotState, robotSize, directionLength) {
        const pos = this.transformer.worldToCanvas(robotState.x, robotState.y);
        
        // Draw robot body
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, robotSize, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fill();
        
        // Draw direction indicator
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
        this.ctx.lineTo(
            pos.x + directionLength * Math.cos(robotState.theta),
            pos.y - directionLength * Math.sin(robotState.theta)
        );
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
    }
}