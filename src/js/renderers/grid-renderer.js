export class GridRenderer {
    constructor(ctx, transformer) {
        this.ctx = ctx;
        this.transformer = transformer;
    }

    draw(gridRange) {
        this.drawGridLines(gridRange);
        this.drawAxes();
    }

    drawGridLines(range) {
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        
        // Draw vertical lines
        for (let x = -range; x <= range; x++) {
            const pos = this.transformer.worldToCanvas(x, 0);
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x, 0);
            this.ctx.lineTo(pos.x, this.ctx.canvas.height);
            this.ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = -range; y <= range; y++) {
            const pos = this.transformer.worldToCanvas(0, y);
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos.y);
            this.ctx.lineTo(this.ctx.canvas.width, pos.y);
            this.ctx.stroke();
        }
    }

    drawAxes() {
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        const origin = this.transformer.worldToCanvas(0, 0);
        
        // X axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, origin.y);
        this.ctx.lineTo(this.ctx.canvas.width, origin.y);
        this.ctx.stroke();
        
        // Y axis
        this.ctx.beginPath();
        this.ctx.moveTo(origin.x, 0);
        this.ctx.lineTo(origin.x, this.ctx.canvas.height);
        this.ctx.stroke();
    }
}