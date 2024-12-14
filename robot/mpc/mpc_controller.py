"""
Main MPC controller implementation.
"""
import numpy as np
from scipy.optimize import minimize
from ..models.robot_model import RobotModel
from . import cost_function

class MPCController:
    def __init__(self, prediction_horizon=10, dt=0.1):
        self.N = prediction_horizon
        self.dt = dt
        self.robot_model = RobotModel()
        
        # Control constraints
        self.v_max = 1.0  # Maximum linear velocity
        self.omega_max = np.pi/2  # Maximum angular velocity
        
    def objective(self, u, current_state, reference_trajectory, obstacles):
        """
        Objective function for MPC optimization.
        
        Args:
            u (np.array): Flattened control inputs for N steps
            current_state (np.array): Current robot state
            reference_trajectory (np.array): Desired trajectory points
            obstacles (list): List of obstacle positions
            
        Returns:
            float: Total cost
        """
        total_cost = 0
        state = current_state
        
        # Reshape control inputs
        u = u.reshape(-1, 2)
        
        for i in range(self.N):
            # Simulate forward
            state = self.robot_model.state_space_model(state, u[i], self.dt)
            
            # Calculate costs
            total_cost += cost_function.state_cost(state[:2], reference_trajectory[i][:2])
            total_cost += 0.1 * cost_function.control_cost(u[i])
            total_cost += cost_function.obstacle_cost(state, obstacles)
            
        return total_cost
        
    def optimize(self, current_state, reference_trajectory, obstacles):
        """
        Solve the MPC optimization problem.
        
        Args:
            current_state (np.array): Current robot state
            reference_trajectory (np.array): Desired trajectory points
            obstacles (list): List of obstacle positions
            
        Returns:
            np.array: Optimal control inputs
        """
        # Initial guess for control inputs
        u0 = np.zeros(self.N * 2)
        
        # Control input bounds
        bounds = [(-self.v_max, self.v_max), (-self.omega_max, self.omega_max)] * self.N
        
        # Optimize
        result = minimize(
            self.objective,
            u0,
            args=(current_state, reference_trajectory, obstacles),
            method='SLSQP',
            bounds=bounds
        )
        
        return result.x.reshape(-1, 2)