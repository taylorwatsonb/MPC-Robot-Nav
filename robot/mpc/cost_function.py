"""
Defines the cost function for the MPC optimization problem.
"""
import numpy as np

def state_cost(state, reference):
    """Calculate state tracking cost."""
    return np.sum((state - reference) ** 2)

def control_cost(control):
    """Calculate control effort cost."""
    return np.sum(control ** 2)

def obstacle_cost(state, obstacles, safety_margin=0.5):
    """
    Calculate obstacle avoidance cost.
    
    Args:
        state (np.array): Current state [x, y, theta]
        obstacles (list): List of obstacle positions [(x1, y1), (x2, y2), ...]
        safety_margin (float): Minimum distance to maintain from obstacles
        
    Returns:
        float: Cost value based on proximity to obstacles
    """
    x, y = state[0], state[1]
    cost = 0
    
    for obs_x, obs_y in obstacles:
        distance = np.sqrt((x - obs_x)**2 + (y - obs_y)**2)
        if distance < safety_margin:
            cost += (safety_margin - distance) ** 2
            
    return cost