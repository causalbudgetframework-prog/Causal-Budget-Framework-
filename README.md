# Causal Budget Framework (CBF)  
*Discrete Simulation of the Double-Slit Experiment with Cellular Automata*

## Project Overview
This repository is an ongoing experiment in modeling wave interference phenomena using cellular automata (CA). Instead of solving continuous equations, the simulation uses simple, rule-based updates where each wavefront cell is tracked step by step.  

The focus is on testing whether **discrete propagation rules** can generate realistic diffraction and interference patterns.

## Key Features
- **Directional wave cells** that carry velocity and spawn new neighbors.  
- **Barrier & slit handling** through edge-based "healing" rules that produce spreading and diffraction.  
- **Interference from overlaps**, with constructive and destructive patterns forming naturally.  
- **Efficient, lightweight updates** suitable for real-time visualization.

## Current Status
Currently implemented:  
- Basic wave propagation in a CA grid.  
- Barrier interactions including single- and double-slit setups.  
- Emergent interference patterns.  

In progress / planned:  
- Rewrite of early demos for clarity and performance.  
- Expanded geometries and rule variations.  
- Multi-frequency wavefronts.  
- Visualization improvements.

## Applications
- **Education**: Interactive demos for exploring diffraction and interference.  
- **Simulation research**: Comparing discrete vs. continuous approaches.  
- **Game/graphics**: Lightweight wave simulation for interactive environments.

---

### Notes
This project is still under development. Many of the demos are being rewritten, and the rules are evolving as new behaviors are tested. The goal is to explore what kinds of wave effects can emerge from simple, local, discrete rules.
