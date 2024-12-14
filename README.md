# MPC Robot Navigation Visualization

A JavaScript-based visualization tool for Model Predictive Control (MPC) robot navigation. This project demonstrates a mobile robot following a circular trajectory while avoiding obstacles using MPC principles.

## Features

- Real-time visualization of robot movement
- Dynamic trajectory following
- Obstacle visualization
- Interactive controls for simulation
- Grid-based coordinate system
- Smooth animation
- Modular and maintainable code structure

## Project Structure

```
├── src/
│   └── js/
│       ├── config.js              # Configuration constants
│       ├── main.js               # Main application entry point
│       ├── simulation-controller.js # Simulation logic
│       ├── renderers/
│       │   ├── grid-renderer.js   # Grid rendering
│       │   └── robot-renderer.js  # Robot rendering
│       └── utils/
│           ├── coordinate-transform.js # Coordinate system utilities
│           └── trajectory-generator.js # Trajectory generation
├── index.html                    # Main HTML file
├── server.js                     # Simple HTTP server
├── package.json                  # Project configuration
└── README.md                     # Project documentation
```

## Components

### Visualization

- **Robot**: Represented as a circle with a direction indicator
- **Trajectory**: Circular path that the robot follows
- **Obstacles**: Static obstacles in the environment
- **Grid**: Coordinate system with axes for reference

### Core Classes

- `RobotVisualization`: Main visualization class
- `SimulationController`: Handles simulation logic and animation
- `CoordinateTransformer`: Manages coordinate system transformations
- `GridRenderer`: Renders the coordinate grid
- `RobotRenderer`: Renders the robot and its direction
- `TrajectoryGenerator`: Generates reference trajectories

## Setup and Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Controls

- **Start Simulation**: Begins the robot movement simulation
- **Reset**: Returns the robot to its initial position

## Technical Details

### Coordinate System
- Origin (0,0) at the center of the canvas
- Y-axis inverted to match standard mathematical coordinates
- Scale: 100 pixels per meter

### Robot State
- Position (x, y) in meters
- Orientation (theta) in radians
- Updates at 60 FPS (requestAnimationFrame)

### Visualization Parameters
- Canvas size: 800x800 pixels
- Robot size: 15 pixels
- Direction indicator length: 25 pixels
- Grid range: ±4 meters

## Code Organization

The project follows these coding principles:
- Modular architecture with clear separation of concerns
- Single responsibility principle for each module
- Configuration centralization
- Clean and maintainable code structure
- ES6+ JavaScript features
- Clear class and method naming

## Future Improvements

Potential enhancements for the project:
- Add path planning algorithms
- Implement dynamic obstacle avoidance
- Add more trajectory patterns
- Include robot state telemetry
- Add configuration UI
- Support for multiple robots
- Add unit tests
- Implement collision detection

## License

MIT License - feel free to use this code for your own projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.