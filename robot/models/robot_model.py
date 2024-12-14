"""
Defines the kinematic model of the mobile robot.
"""
import numpy as np

class RobotModel:
    def __init__(self, wheel_radius=0.1, wheel_base=0.5):
        self.wheel_radius = wheel_radius
        self.wheel_base = wheel_base
        
    def state_space_model(self, state, control_input, dt):
        """
        Implements the kinematic model of a differential drive robot.
        
        Args:
            state (np.array): Current state [x, y, theta]
            control_input (np.array): Control inputs [v, omega]
            dt (float): Time step
            
        Returns:
            np.array: Next state
        """
        x, y, theta = state
        v, omega = control_input
        
        # Kinematic model equations
        x_next = x + v * np.cos(theta) * dt
        y_next = y + v * np.sin(theta) * dt
        theta_next = theta + omega * dt
        
        return np.array([x_next, y_next, theta_next])