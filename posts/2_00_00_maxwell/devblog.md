# Paper 5: Maxwell Equations from the Causal Budget Framework

## Part 1: Developer Blog
**Causal Budget Framework (CBF)**  
*From Field Equations to Budget Accounting*

---

## The Maxwell Challenge

After getting gravity working through the ADM formalism in Paper 4, I thought I was done. Wave mechanics, special relativity, quantum measurement, and general relativity all worked through the C=T+M budget framework. But there was one glaring omission: electromagnetism.

Maxwell's equations are the foundation of classical field theory. If CBF couldn't reproduce them, the whole framework would be incomplete. But I had a problem: I didn't know how to fit electromagnetic fields into the budget allocation picture.

Were E and B fields part of T (translation) or M (maintenance)? How do you even think about fields in terms of computational budgets? And if oscillation lives in T for photons (ω₀=0), what does that mean for the electromagnetic wave itself?

## The FDTD Experiment

I decided to approach this empirically, like I did with the double-slit. Instead of deriving Maxwell's equations theoretically, I'd implement them computationally and see where the budget accounting appeared.

I built a finite-difference time-domain (FDTD) simulator using the standard Yee grid algorithm. This is how computational electromagnetics actually works—you discretize space and time, place E fields on edges and H fields on faces, and update them using Maxwell's curl equations.

The setup was simple:
- TEz mode (Ez, Hx, Hy components)
- Soft source on the left injecting a sinusoidal wave
- Absorbing boundaries to prevent reflections
- Two-slit configuration for interference testing

Then I added budget tracking. At each cell, I computed:

**Energy density (stored budget)**:
```javascript
u = 0.5 * (ε*Ez² + Hx² + Hy²)
```

**Poynting vector (flowing budget)**:
```javascript
Πx = -Ez*Hy
Πy = Ez*Hx
```

**Conservation check**:
```javascript
balance = ∂u/∂t + ∇·Π + σE²
```

If Maxwell's equations truly conserve energy, this balance should be zero (within numerical precision).

## The Budget Revelation

Running the simulation, the budget residual stayed at machine precision (~10⁻¹² relative error). Energy was perfectly conserved. But more importantly, I could now see what the budget components meant:

**M (maintenance)**: Energy stored in the electromagnetic field itself—the E² and H² terms. This is budget "sitting still" in the field configuration.

**T (translation)**: Energy flowing through space—the Poynting vector Π = E×H. This is budget moving from cell to cell.

Maxwell's curl equations are literally the rules that convert between M and T:

**Faraday's law**: ∇×E = -∂B/∂t
- Translates to: Edge-flow circulation creates face-storage changes
- Budget interpretation: T flows create M changes

**Ampère's law**: ∇×H = j + ε∂E/∂t  
- Translates to: Face-circulation balances edge-current plus edge-storage rate
- Budget interpretation: Face-T circulations balance edge sources and edge-M changes

The electromagnetic field isn't a mysterious entity—it's a budget allocation state. E and H represent how much computational budget is allocated to edges and faces at each moment.

## The Oscillation Placement Resolution

This solved my earlier crisis about where oscillation lives. In electromagnetic waves:

- **Oscillation is in T**: The wave phase advances as the field propagates (translation)
- **Field storage is in M**: The energy density at each point (maintenance)

For photons (ω₀=0), there's no binding cost. The budget freely converts between stored field energy (M) and flowing Poynting flux (T) via the curl equations. The wave propagates by this constant M↔T exchange.

For matter (ω₀>0), you'd need additional M budget to maintain bound states—but the electromagnetic field propagation itself is still the same M↔T conversion.

This eliminated all the conditional logic. One universal rule: oscillation lives in T, fields store budget in M, curl equations govern the exchange.

## Gauge Invariance as Accounting Redundancy

The FDTD implementation revealed something else: gauge invariance emerges naturally from budget bookkeeping.

In CBF, only integrated quantities matter:
- EMF: ∮ E·dl (line integrals)
- Flux: ∫ B·dS (surface integrals)  
- Energy flows: Physical currents and field energy

The scalar potential φ and vector potential A are just accounting labels—Lagrange multipliers that enforce conservation constraints. Changing them by a gauge transformation:

A → A + ∇χ
φ → φ - ∂χ/∂t

...is merely relabeling without changing any billable quantities (E, B, Π). Gauge invariance isn't imposed—it's inherent redundancy in how we label budget allocations.

## The Two-Slit Electromagnetic Test

I implemented the classic two-slit experiment with electromagnetic waves. A sinusoidal source on the left, a barrier with two slits in the middle, a detector region on the right.

The results were exactly what you'd expect from classical electromagnetics:
- Plane wave propagation with proper E-H phase relationships
- Diffraction at the slit edges
- Interference pattern on the detection screen
- Energy conservation maintained throughout

But the budget accounting added insight. The interference pattern emerges from:

**Spatial reconciliation**: Different paths from source to detector have different momentum vectors. Where they meet, they superpose—constructive where phases align, destructive where they cancel.

**Temporal reconciliation**: In this static setup, source and detector frequencies match (no Doppler, no gravity gradient). So commit time is just τ₀ (baseline processing). No additional buffering needed.

The pattern you see is pure spatial reconciliation—momentum conservation determining where energy flows. The temporal coordination happens instantly at baseline because nothing is moving or mismatched.

## NodeGraph Commits in FDTD

The detector implementation showed how electromagnetic measurement works in CBF. Instead of continuous detection, the detector probabilistically "commits" to specific absorption events:

```javascript
// Weight each cell by chosen observable
for (each detector cell) {
    weight = u(cell)           // energy density
          or |Π(cell)|         // flux magnitude  
          or Π·n̂               // normal flux
          or |E(cell)|²        // field intensity
}

// Select cell ∝ weight
selected_cell = weighted_random_choice(cells, weights)

// Backtrack parent against energy flow
parent = find_neighbor_most_opposite_to_Π(selected_cell)

// Record commit in NodeGraph
nodeGraph.push({location: selected_cell, time: t, parent: parent})
```

Each commit is a transaction finalizing in the Event Ledger. The electromagnetic wave collapses to a specific detection event. The probability weighting by |ψ|² emerges from optimizing momentum conservation (Paper 3's spatial reconciliation).

The parent backtracking establishes causality—tracing energy flow backwards through the field. This creates the NodeGraph structure that would coordinate entanglement if we had multiple correlated sources.

## What This Means for ω₀

The electromagnetic implementation finally clarified the ω₀ parameter:

**Dispersion relation**: ω² = c²k² + ω₀²

**For photons (ω₀=0)**:
- ω = ck (linear dispersion)
- Pure translation, no binding
- All budget available for propagation

**For matter (ω₀>0)**:
- ω = √(c²k² + ω₀²) (massive dispersion)
- Mixed translation + maintenance
- Budget split between propagation and binding

The FDTD naturally implements ω₀=0 photons. The update equations assume massless waves traveling at c. To simulate matter waves (electrons, etc.), you'd need to add the ω₀² term to the dispersion, which would require additional M budget to maintain the bound oscillation.

## Novel Predictions

The FDTD implementation makes testable predictions that distinguish CBF from standard Maxwell theory:

**Lattice dispersion effects**: At frequencies approaching the grid cutoff (ω ≈ π/τ), phase velocities deviate from c due to discrete time stepping. In CBF, this isn't a numerical artifact—it's a fundamental feature if reality has a finite tick rate τ.

**Moving boundary timing**: When slits or boundaries move, Doppler shifts create frequency mismatches. CBF predicts additional temporal reconciliation delays beyond baseline τ₀. Standard EM predicts no such delays.

**Coherence-only losses**: The D-field (dark matter scars from Paper 3) can suppress interference without absorbing energy. Failed wave-matter interactions leave scars that bias future collapses. This creates decoherence without dissipation.

**Gravitational coupling**: Since EM propagation uses the universal lapse function α(x) from Paper 4, electromagnetic waves automatically include gravitational time dilation and Shapiro delays. No separate coupling needed—it's built into the computational substrate.

## The Computational Perspective

Standing back, Maxwell's equations look different through the CBF lens:

**Standard view**: Fundamental laws governing electromagnetic fields
**CBF view**: Accounting rules for budget allocation on geometric simplices

The curl equations aren't physics laws—they're bookkeeping constraints:
- ∇×E = -∂B/∂t: Edge flows change face storage
- ∇×B = μ₀j + με∂E/∂t: Face circulations balance edge sources and storage

Energy conservation (Poynting's theorem) isn't an additional law—it's automatic from the budget structure. The FDTD residual staying at machine precision confirms this: if you enforce budget rules locally via curl updates, global conservation emerges.

## What Remains

The FDTD shows electromagnetic waves work in CBF. But there are open questions:

**Quantum electrodynamics**: How do you extend this to photon creation/annihilation operators? The classical field is budget allocation—is the quantum field the same with discrete commits?

**Nonlinear effects**: Strong field regimes where E approaches fundamental limits. CBF predicts saturation when field energy approaches available budget. Is this testable?

**Material coupling**: How do atoms and matter interact with EM fields through the Material Coupling Field (MCF) from future papers? The FDTD treats this as simple absorption (σE²), but the microscopic story involves frequency matching and temporal reconciliation.

## Conclusion

Maxwell's equations emerge from budget conservation in CBF. Electromagnetic fields are budget allocation states on geometric elements (edges, faces). The curl equations are accounting rules that convert between stored energy (M) and flowing energy (T).

The FDTD implementation validates this: energy is conserved, interference patterns emerge, and gauge invariance falls out naturally as accounting redundancy. The framework unifies electromagnetism with the quantum/relativistic/gravitational picture from Papers 1-4.

One budget rule (C=T+M), one reconciliation engine (Event Ledger with spatial and temporal gates), and the full scope of physics emerges—from quantum interference to electromagnetic waves to gravitational time dilation.

Whether nature literally implements FDTD or merely behaves as if it does, the computational perspective provides intuitive understanding. The smooth field picture of classical physics is an approximation to discrete budget transactions operating on a finite-capacity substrate.

Post the code, run the demo, and let people see electromagnetic waves as budget accounting in action. The residual staying at 10⁻¹² precision isn't a numerical trick—it's evidence that conservation laws might be computational constraints all the way down.

---

*Continue to Paper 5: Formal Framework →*