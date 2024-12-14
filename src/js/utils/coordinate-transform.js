export class CoordinateTransformer {
    constructor(canvasWidth, canvasHeight, scale) {
        this.centerX = canvasWidth / 2;
        this.centerY = canvasHeight / 2;
        this.scale = scale;
    }

    worldToCanvas(x, y) {
        return {
            x: this.centerX + x * this.scale,
            y: this.centerY - y * this.scale // Flip Y axis
        };
    }
}