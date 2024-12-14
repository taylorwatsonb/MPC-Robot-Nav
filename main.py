"""
Main script to demonstrate MPC-based robot navigation.
"""
import numpy as np
from robot.mpc.mpc_controller import MPCController
from robot.utils.trajectory_generator import generate_circular_trajectory

def main():
    # Initialize MPC controller
    mpc = MPCController(prediction_horizon=10, dt=0.1)
    
    # Generate reference trajectory
    reference_trajectory = generate_circular_trajectory(
        radius=2.0,
        num_points=50,
        center=(0, 0)
    )
    
    # Define obstacles
    obstacles = [
        (-1.0, -1.0),
        (1.0, 1.0),
        (0.0, 2.0)
    ]
    
    # Initial state [x, y, theta]
    current_state = np.array([0.0, -2.0, 0.0])
    
    # Simulation loop
    for i in range(len(reference_trajectory) - mpc.N):
        # Get trajectory segment for prediction horizon
        trajectory_segment = reference_trajectory[i:i+mpc.N]
        
        # Compute optimal control inputs
        optimal_controls = mpc.optimize(
            current_state,
            trajectory_segment,
            obstacles
        )
        
        # Apply first control input
        current_state = mpc.robot_model.state_space_model(
            current_state,
            optimal_controls[0],
            mpc.dt
        )
        
        # Print current state (in real application, you would visualize or log this)
        print(f"Step {i}: Position (x, y) = ({current_state[0]:.2f}, {current_state[1]:.2f})")

if __name__ == "__main__":
    main()