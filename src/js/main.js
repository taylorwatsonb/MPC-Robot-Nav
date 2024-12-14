import { CANVAS_CONFIG, COLORS, INITIAL_STATE } from './config.js';
import { CoordinateTransformer } from './utils/coordinate-transform.js';
import { TrajectoryGenerator } from './utils/trajectory-generator.js';
import { GridRenderer } from './renderers/grid-renderer.js';
import { RobotRenderer } from './renderers/robot-renderer.js';
import { SimulationController } from './simulation-controller.js';

class RobotVisualization {
    constructor() {
        this.initializeCanvas();
        this.initializeComponents();
        this.bindEvents();
        this.draw();
    }

    initializeCanvas() {
        this.canvas = document.getElementById('robotCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    initializeComponents() {
        this.transformer = new CoordinateTransformer(
            CANVAS_CONFIG.WIDTH,
            CANVAS_CONFIG.HEIGHT,
            CANVAS_CONFIG.SCALE
        );

        this.robotState = { ...INITIAL_STATE };
        
        this.trajectory = TrajectoryGenerator.generateCircular(2.0, 50);
        
        this.obstacles = [
            { x: -1.0, y: -1.0 },
            { x: 1.0, y: 1.0 },
            { x: 0.0, y: 2.0 }
        ];

        this.gridRenderer = new GridRenderer(this.ctx, this.transformer);
        this.robotRenderer = new RobotRenderer(this.ctx, this.transformer);
        
        this.simulationController = new SimulationController(
            this.robotState,
            this.trajectory
        );
    }

    bindEvents() {
        document.getElementById('startBtn').addEventListener('click', () => {
            this.simulationController.start(() => this.draw());
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.simulationController.reset(INITIAL_STATE);
            this.draw();
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.gridRenderer.draw(CANVAS_CONFIG.GRID_RANGE);
        
        // Draw trajectory
        this.drawTrajectory();
        
        // Draw obstacles
        this.drawObstacles();
        
        // Draw robot
        this.robotRenderer.draw(
            this.robotState,
            CANVAS_CONFIG.ROBOT_SIZE,
            CANVAS_CONFIG.DIRECTION_LENGTH
        );
    }

    drawTrajectory() {
        this.ctx.beginPath();
        this.trajectory.forEach((point, i) => {
            const pos = this.transformer.worldToCanvas(point.x, point.y);
            if (i === 0) {
                this.ctx.moveTo(pos.x, pos.y);
            } else {
                this.ctx.lineTo(pos.x, pos.y);
            }
        });
        this.ctx.strokeStyle = COLORS.TRAJECTORY;
        this.ctx.stroke();
    }

    drawObstacles() {
        this.obstacles.forEach(obstacle => {
            const pos = this.transformer.worldToCanvas(obstacle.x, obstacle.y);
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, CANVAS_CONFIG.OBSTACLE_SIZE, 0, 2 * Math.PI);
            this.ctx.fillStyle = COLORS.OBSTACLE;
            this.ctx.fill();
        });
    }
}

// Initialize visualization when the page loads
window.addEventListener('load', () => {
    new RobotVisualization();
});