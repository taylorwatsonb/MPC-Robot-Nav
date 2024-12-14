export class TrajectoryGenerator {
    static generateCircular(radius, numPoints) {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI;
            points.push({
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle)
            });
        }
        return points;
    }
}