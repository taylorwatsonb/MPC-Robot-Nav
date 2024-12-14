class RobotVisualization {
    constructor() {
        this.canvas = document.getElementById('robotCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scale = 100; // pixels per meter
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        
        // Robot state
        this.robotState = { x: 0, y: -2, theta: 0 };
        
        // Reference trajectory (circle)
        this.trajectory = this.generateCircularTrajectory(2.0, 50);
        
        // Obstacles
        this.obstacles = [
            { x: -1.0, y: -1.0 },
            { x: 1.0, y: 1.0 },
            { x: 0.0, y: 2.0 }
        ];
        
        this.bindEvents();
        this.draw();
    }
    
    generateCircularTrajectory(radius, numPoints) {
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
    
    worldToCanvas(x, y) {
        return {
            x: this.centerX + x * this.scale,
            y: this.centerY - y * this.scale // Flip Y axis
        };
    }
    
    drawRobot() {
        const pos = this.worldToCanvas(this.robotState.x, this.robotState.y);
        
        // Draw robot body
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, 15, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fill();
        
        // Draw direction indicator
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
        this.ctx.lineTo(
            pos.x + 25 * Math.cos(this.robotState.theta),
            pos.y - 25 * Math.sin(this.robotState.theta)
        );
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
    }
    
    drawTrajectory() {
        this.ctx.beginPath();
        this.trajectory.forEach((point, i) => {
            const pos = this.worldToCanvas(point.x, point.y);
            if (i === 0) {
                this.ctx.moveTo(pos.x, pos.y);
            } else {
                this.ctx.lineTo(pos.x, pos.y);
            }
        });
        this.ctx.strokeStyle = '#2196F3';
        this.ctx.stroke();
    }
    
    drawObstacles() {
        this.obstacles.forEach(obstacle => {
            const pos = this.worldToCanvas(obstacle.x, obstacle.y);
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
            this.ctx.fillStyle = '#F44336';
            this.ctx.fill();
        });
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        
        // Draw vertical lines
        for (let x = -4; x <= 4; x++) {
            const pos = this.worldToCanvas(x, 0);
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x, 0);
            this.ctx.lineTo(pos.x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = -4; y <= 4; y++) {
            const pos = this.worldToCanvas(0, y);
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos.y);
            this.ctx.lineTo(this.canvas.width, pos.y);
            this.ctx.stroke();
        }
        
        // Draw axes
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        const origin = this.worldToCanvas(0, 0);
        
        // X axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, origin.y);
        this.ctx.lineTo(this.canvas.width, origin.y);
        this.ctx.stroke();
        
        // Y axis
        this.ctx.beginPath();
        this.ctx.moveTo(origin.x, 0);
        this.ctx.lineTo(origin.x, this.canvas.height);
        this.ctx.stroke();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawTrajectory();
        this.drawObstacles();
        this.drawRobot();
    }
    
    updateRobotState(newState) {
        this.robotState = { ...newState };
        this.draw();
    }
    
    bindEvents() {
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startSimulation();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetSimulation();
        });
    }
    
    startSimulation() {
        // Simulate robot movement along trajectory
        let currentPoint = 0;
        
        const animate = () => {
            if (currentPoint >= this.trajectory.length) {
                currentPoint = 0;
            }
            
            const targetPoint = this.trajectory[currentPoint];
            const dx = targetPoint.x - this.robotState.x;
            const dy = targetPoint.y - this.robotState.y;
            
            // Update robot state
            this.robotState.x += dx * 0.1;
            this.robotState.y += dy * 0.1;
            this.robotState.theta = Math.atan2(dy, dx);
            
            this.draw();
            currentPoint++;
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        animate();
    }
    
    resetSimulation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.robotState = { x: 0, y: -2, theta: 0 };
        this.draw();
    }
}

// Initialize visualization when the page loads
window.addEventListener('load', () => {
    new RobotVisualization();
});