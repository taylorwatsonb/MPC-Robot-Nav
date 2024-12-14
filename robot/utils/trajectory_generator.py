"""
Utilities for generating reference trajectories.
"""
import numpy as np

def generate_circular_trajectory(radius, num_points, center=(0, 0)):
    """
    Generate a circular reference trajectory.
    
    Args:
        radius (float): Circle radius
        num_points (int): Number of points in trajectory
        center (tuple): Center coordinates (x, y)
        
    Returns:
        np.array: Array of trajectory points
    """
    t = np.linspace(0, 2*np.pi, num_points)
    x = center[0] + radius * np.cos(t)
    y = center[1] + radius * np.sin(t)
    theta = t
    
    return np.column_stack((x, y, theta))

def generate_linear_trajectory(start, end, num_points):
    """
    Generate a linear reference trajectory.
    
    Args:
        start (tuple): Start point (x, y)
        end (tuple): End point (x, y)
        num_points (int): Number of points in trajectory
        
    Returns:
        np.array: Array of trajectory points
    """
    x = np.linspace(start[0], end[0], num_points)
    y = np.linspace(start[1], end[1], num_points)
    theta = np.arctan2(end[1] - start[1], end[0] - start[0]) * np.ones(num_points)
    
    return np.column_stack((x, y, theta))