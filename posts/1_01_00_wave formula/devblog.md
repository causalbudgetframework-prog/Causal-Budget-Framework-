# Dev Blog 2: The CA Wave Formula

## Part 1: Developer Blog
**Causal Budget Framework (CBF)**  
*Author: Jamie Whitten (25+ years software engineering)*  
*Dev Blog 2:  The CA Wave Formula*  
*Version 1.0* · *Last updated: 2025-10-11*  
*Contact:* [/contact](/contact) · *GitHub:* https://github.com/causalbudgetframework-prog  
Disclaimer: ChatGPT and Claude assisted with prototypes, critiques, and algebraic derivations. I take full responsibility for the ideas, interpretations, and conclusions presented here unless otherwise stated.  

**Attachments**:  
[Reference Table](../referenceTable.md)  
[SR Lorentz factor demo](./demo/sr_demo.html) 

---

## How C=T+M Started

After seeing Wave Mechanics behave like a search algorithm, I wanted to see how far a CA could go. Before I switched to a vector CA, I tried warping space on a pixel grid. I spent hours seeing if I could squish the grid as particles moved faster. That broke the moment a fast particle came near a slow one, the grids were incompatible.

Next I tried squishing the particle instead of the grid. If the particle goes faster along x, give it less width. That failed too. If you squish x, you end up letting y outrun it.

On a short walk the fix clicked. I could remove warping and length contraction entirely if I clamp the step to a causal budget. This snaps to the Lorentz factor, but it turned out to be only half the story.

**Takeaway:** stop warping space or the particle, split a fixed causal budget.

---

## Key Terminology

- **Translation (T)**: Budget for moving through space
- **Maintenance (M)**: Budget for internal state - phase accumulation, clock ticks, quantum numbers
- **Causality budget (C)**: Total per-tick allocation, with C = T + M
- **Event Ledger (EL)**: Coordination layer that buffers and commits interactions

---

### Attempt #1: Move or Grow (failed)

This rule came from a misunderstanding, but it gave me my first hints of time dilation in a CA.

At the time I thought photons were ever-expanding shells that also had a reference frame for motion. Watching the double-slit, interference looked like forward-biased expansion. I assumed the photon’s origin could “move” to match the source frame. My thought experiment made it feel obvious: shine a flashlight out the left window of a car at 100 km/h, the light grows for light-years, and its center drifts left at 100 km/h to stay in frame. This was wrong.

Even so, it handed me a budget rule: each CA step you either move or grow the wavefront, never both. If you do that, nothing goes faster than c.

The rule mapped to the Lorentz factor in a simple way, which told me I was on the right trail. **Note:** The mapping itself survives into the next attempt (**Translation + Maintenance**); only the interpretation changes.

First, the step count problem. A car at 100 km/h would have to wait trillions of steps before it could move, while a stopped object could “grow” every step. Second, gravity. As I explained in the Wave Mechanics blog, a growing shell breaks steering. You can rotate momentum along the rim, but you cannot redirect the interior. Gravity needs the whole particle to translate as one piece.

The math hint was right. The model was not. Particles do not grow. What looked like growth at the slits was Huygens-style spreading of the front.

**Takeaway:** a budget tied to c pointed me to the Lorentz factor, but the “move or grow” rule locked particles into the wrong shape.


### Attempt #2: Translation + Maintenance

I thought I was stuck. Particles are not ever-expanding shells, but they are not tiny discrete packets that slip through one slit either. As mentioned in the previous blog, I combined both ideas. I made free-floating particles **non-growing wavefronts** large enough to cover both slits. This solved almost everything. Particles only appear to grow when punctured and heal through the slits, yet are small enough to be steered properly by gravity.

If particles only move, or `Translate`, then what is the other half of the equation? On another walk it hit me, the answer is **time to process**. I called that second half `Maintenance`.

**New model: C = T + M**

- **T (Translation):** budget for moving through space as a complete entity  
- **M (Maintenance):** budget for internal coherence (its clock and state)

Photons get **M = 0**, so they spend the whole tick on motion. Matter needs **M > 0**, so it cannot spend the whole tick moving. That alone keeps matter below $c$. As speed goes up, the share for maintenance goes down, so the clock slows. That felt like time dilation for free.

I did not start from equations. I just needed a clean exchange rate. The Lorentz factor slid in as the neat way to express the split:

$$\gamma(v) = \frac{1}{\sqrt{1-\frac{v^2}{c^2}}}, \quad M = \frac{\alpha}{\gamma(v)}, \quad T = \alpha - M$$

In standard SR terms, γ links coordinate time to proper time: dτ=dt/γ.
In CBF, 𝛾 measures how the per-tick budget shifts between translation and maintenance. When γ=1, the particle is at rest and all processing goes into its internal clock. As 𝛾 grows, more budget is spent on motion and less on upkeep, which shows up as time dilation.

In CBF α represents the baseline per-tick causal budget for the local frame. Essentially it's the pacing constant that sets how fast translation can proceed when nothing slows it down. In empty space, α corresponds to c (the maximum causal speed in the simulation). Later papers extend α to vary with environment (e.g., near gravity wells or inside materials), but for now it simply acts as the normalization constant for one tick of causal time in flat space.

Thus, at rest, 𝛾=1, so M=𝛼 and there is no leftover for motion that tick. Once you set a velocity, future ticks push more into $T$ and less into $M$. Your internal clock slows by the same fraction.

**Species by budget**
- **Photons:** $ M=0 \Rightarrow T=\alpha $. No proper time.  
- **Matter:** $ 0 < M < \alpha $. Proper time advances at rate $ M/\alpha $.  
- **Heavier upkeep:** larger baseline maintenance cost means less headroom for speed.

**Takeaway:** split the tick. Motion uses $T$, the clock uses $M$. The clean exchange rate is 𝛾. Time dilation is just less maintenance share while you move.

**Side note.** In the upcoming Maxwell blog I explain that **oscillation lives in $T$** for all species, while **$M$** pays the cost of maintaining **bound/internal ticks** in matter. You do not need a photon special case if you introduce a species parameter $ \omega_0 $: photons use $ \omega_0=0 $ (no bound tick), matter uses $ \omega_0>0 $ (internal tick advances with proper time).

#### Pseudocode (no `if` needed for photons)
```javascript
// dt: Photons moving at c travels one spatial unit per simulation tick
// τ (tau): tracks how much proper time has passed for the particle. That value determines how much processing time is available in M for maintaining its internal state.
// Translational frequency: is the oscillation rate carried by motion itself
// φ_T (phi_T): is the running phase of that oscillation. Updating phi_T each tick keeps the traveling wave oscillating as it moves.
// ω₀ (omega0): is the particle type (species) constant which gives us how strongly the particle’s internal structure is bound. It scales how the internal phase evolves with proper time.
// φ_M (phi_M): is that internal or spin phase, rotating with the maintenance clock rather than the translational one.
// * Photons use ω0=0: only phi_T advances, giving a pure traveling wave.
// * Matter uses ω0 > 0: phi_M also advances, representing spin or internal ticking.
tau   += M * dt;                          // proper time
phi_T += 2 * Math.PI * f_T * dt;          // translational phase (all species)
phi_M += 2 * Math.PI * omega0 * (M * dt); // internal/bound tick via proper time
```

> **Note on oscillation:**
> The expression `phi_M += 2 * Math.PI * omega0 * (M * dt)` does not mean oscillation *lives* in ($M$). It means the particle’s bound tick ( $\phi_M$ ) advances at the local proper-time rate (M,dt) while being *carried* by the translational oscillation in ($T$). The base wave is always in the translation channel ($T$); ($M$) only modulates how much of that phase budget goes into maintaining internal spin or structure. Thus, photons ($ \omega_0=0$) ride the pure translational wave, while matter superimposes an internal rotation at its maintenance pace. (See Appendix A.1 for the full mapping of ($f_T$), ($k$), and ($λ$).)


**Takeaway:** Each tick advances two clocks. phi_T handles the wave’s outward motion, and phi_M handles the particle’s internal rotation. Both run from the same C = T + M rule, so photons and matter share one unified update loop.

### What C = T + M Really Means

After writing the first working code for $ C = T + M $, I began realizing how wide its reach could be. If a particle’s tick is split between motion and maintenance, that same rule can describe **energy transfer, field behavior, and even the structure of spacetime itself**.

This rule can be mapped to **E = mc²**. In later papers I show that $E$ corresponds to the total causal rate, $m$ reflects the locked-in maintenance share, and $c²$ comes directly from the lattice constants $a/τ_0$ that define the universal pacing. Nothing mystical: it is just how much update power is locked into self-maintenance versus how much is free to move.

When a moving particle interacts with an atom, the two must exchange part of their causal budget. The particle’s translation share becomes the atom’s maintenance share for a moment — that is **energy transfer**. It is not a separate mechanism; it is bookkeeping.

Maxwell’s equations fit naturally into this picture too. (As I'll show in the Maxwell blog) The electromagnetic field becomes the distributed version of the same translation-maintenance exchange: electric potential stores “paused translation,” and magnetic flow releases it. The local conservation laws of the field are just the continuous form of the C = T + M rule.

Even spacetime itself starts to look like the ledger of all these exchanges. Translation builds the space-like relationships between events, maintenance holds the time-like ones, and the **Event Ledger** ties them together consistently so the same budget never gets spent twice. (As I'll show in the SR, Event Ledger and GR blogs)

**Takeaway:** This was the moment I realized C = T + M is not just a neat trick for time dilation. It’s the basic accounting rule of physics.

### How the budget moves the wave

I define `a` as the integer distance unit, equal to one $\gamma$-length. This was introduced in the previous paper and serves as the baseline stride for a lightlike update.

Next, I define `τ₀` as the time it takes light to travel one $\gamma$-length in a vacuum. That becomes one tick of global causal time.

Then comes $\alpha(x)$, the local pacing factor for the causal budget. Gravity or material media reduce $\alpha(x)$, which slows everything down by lengthening the local tick while leaving the spatial stride (a) unchanged. The effective tick is

$$
\tau_{\text{eff}}(x) = \frac{\tau_0}{\alpha(x)}
$$

In flat space $\alpha = 1$, one tick advances one $\gamma$-length. In slower regions $\alpha < 1$, each commit takes longer even though the stride ($a$) stays the same. This is the same budget law describing free-space motion and gravitational slowdown with one variable, $\alpha(x)$.

Note: The mechanism for how gravity and materials affect α(x) will be show in the GR and MCF blogs.

## How to Calculate T and M from Velocity

Every object in CBF divides its causal budget per tick between **translation** ($T$) and **maintenance** ($M$). This split defines the same geometry that, in relativity, produces the Lorentz factor.  No extra physics is added, this is just the bookkeeping rule for how the budget is spent.

Each worldline updates with one global tick $\tau_0$ and divides its per-tick causal budget:

$$
C = T + M.
$$

In flat spacetime we normalize $C = 1$, so $T + M = 1$. Combining this with the relativistic relations $T = v/c$ and $M = \sqrt{1 - v^2/c^2}$ gives the Pythagorean form:

$$
T^2 + M^2 = 1.
$$

This makes $T$ and $M$ follow hyperbolic relations of the rapidity (a hyperbolic angle): $T=\tanh\eta$, $M=\operatorname{sech}\eta=1/\gamma$, and $\gamma=\cosh\eta$. This mapping mirrors the hyperbolic geometry of Lorentz motion, which CBF later extends upon in the next blog on Special Relativity.

### 1. The Kinematic Identity

Each moving system satisfies

$$
T^2 + M^2 = 1,
$$

where  
- $T$ is the **translation share** (fraction of the causal step used for motion),  
- $M$ is the **maintenance share** (fraction used for proper-time progression).

This is the discrete form of the Minkowski metric: one tick’s causal budget projected into space and time.

### 2. Define T from Velocity

Normalized velocity:

$$
\beta = \frac{v}{c}.
$$

Then the translation share is simply

$$
T = \beta.
$$

### 3. Compute M as the Remainder of the Causal Budget

$$
M = \sqrt{1 - \beta^{2}}.
$$

This expresses that whatever portion of the causal step is used for translation, the rest is available for internal maintenance.

### 4. Recover the Lorentz Factor (for Reference)

Since $M = d\tau/dt$, the usual Lorentz factor follows automatically:

$$
\gamma = \frac{dt}{d\tau} = \frac{1}{M}
       = \frac{1}{\sqrt{1 - v^{2}/c^{2}}}.
$$

In CBF language: Lorentz symmetry is the *shape* of the causal-budget triangle, not an additional law.

### 5. Worked Example

For a particle moving at $v = 0.75c$:

$$
\begin{aligned}
T &= 0.75,\\[4pt]
M &= \sqrt{1 - 0.75^2} = 0.661,\\[4pt]
T^2 + M^2 &= 0.75^2 + 0.661^2 = 1.00,\\[4pt]
\gamma &= 1/M = 1.51.
\end{aligned}
$$

$T^2 + M^2 = 0.75^2 + 0.661^2 \approx 1.000$ (to rounding), $\gamma = 1/M \approx 1.51$.

Orthogonal budget check: $T=0.75$ is the spatial translation component and $M=0.661$ is the temporal (proper-time) component of the unit causal vector. These do not add; they combine as $T^2 + M^2 = 1$. The conservation is in the norm, not a sum of percentages. Think of it like a unit circle: if you walk 0.75 units east ($T$) and 0.661 units north ($M$), you're exactly 1 unit from the origin, even though $0.75 + 0.661 > 1$.

---

## The Hidden Geometry of C = T + M

What you’re seeing is the hidden geometry behind both the Lorentz transformation  
and the CBF causal-budget rule.

### 1 · CBF’s Kinematic Identity Is Literally Pythagorean

CBF writes

$$
T^2 + M^2 = 1.
$$

That’s the same structure as the Pythagorean theorem

$$
a^2 + b^2 = c^2.
$$

If the total causal budget $C=1$ is the hypotenuse of a right triangle, then

| Triangle element | CBF meaning | Geometric analogy |
|:--|:--|:--|
| **C** | total causal step per tick | hypotenuse |
| **T** | motion through space | base |
| **M** | maintenance through time | height |


Each tick divides the causal step between translation and proper-time upkeep. The right angle means they are orthogonal components of one invariant whole. Just like space and time in relativity.

### 2 · Minkowski Geometry = Rotated Pythagoras

Special Relativity’s invariant interval is

$$
c^2 d\tau^2 = c^2 dt^2 - dx^2.
$$

Normalize by $c$ and define $\beta = v/c = dx/dt$:

$$
\left(\frac{d\tau}{dt}\right)^2 + \beta^2 = 1.
$$

That is *identical* to the CBF relation $T^2 + M^2 = 1$,
just written in continuous form.
CBF expresses the same hyperbolic geometry through a normalized, per-tick budget.

### 3 · Intuitive Interpretation

Each tick is a fixed-length step in a 2-D causal plane (space vs time):

| Motion | $T$ | $M$ | Path angle |
|:--|:--:|:--:|:--:|
| Stationary | 0 | 1 | vertical |
| Lightlike | 1 | 0 | 45° |
| Intermediate | $v/c$ | $$ \sqrt{1 - v^{2}/c^{2}} $$ | between |


Moving faster tilts the step horizontally (larger T, smaller M). Standing still is a vertical step; light travels at 45°, pure T-flow.

### 4 · Why It Matters

The CBF law

$$
T^2 + M^2 = 1
$$

is the discrete computational analogue of the spacetime invariant

$$
(c\,dt)^2 = (c\,d\tau)^2 + (dx)^2.
$$

That’s why CBF automatically reproduces time dilation:  Lorentz symmetry *is* the shape of the budget triangle.

---

## From Budget Geometry to Energy Geometry

Once physical units are attached, the same causal-budget triangle becomes the familiar energy–momentum structure of special relativity. The CBF identity $T^2 + M^2 = 1$ sets the geometry, while the constants $\hbar$ and $c$ supply the physical scales.

### 1 · Attaching Units to the Budget

Each unit of causal budget represents a share of possible energy per tick. The translation share $T$ corresponds to kinetic and field motion, and the maintenance share $M$ corresponds to bound or rest energy. By introducing a baseline frequency $\omega_0$ where

$$
\hbar\omega_0 = m c^2,
$$

the maintenance channel gains its natural energy scale. This sets how much update power is needed to keep a particle's internal state alive when at rest.

### 2 · Energy–Momentum Triangle

Multiply the normalized CBF identity by $(mc^2)^2$:

$$
(mc^2)^2 = (mvc)^2 + (mc^2 M)^2.
$$

Substituting $p = \gamma m v$ and $E = \gamma mc^2$ gives the familiar relation

$$
E^2 = (p c)^2 + (m c^2)^2.
$$

The same right-triangle geometry now appears in physical units: motion along one side, rest energy along the other, and the invariant total as the hypotenuse.

| CBF quantity | Physical counterpart | Description |
|:--|:--|:--|
| **T** | $pc / E$ | Translational energy share |
| **M** | $mc^2 / E$ | Rest (maintenance) energy share |
| **C** | 1 | Normalized total causal step |

### 3 · E = mc² as the Causal Budget Scale

In this view, $E = mc^2$ is not a separate law but the *unit calibration* of the maintenance channel. The full energy of a moving system, $E = \gamma mc^2$, simply represents the same causal budget redistributed between motion and internal upkeep. As speed increases, more of the budget flows into $T$ and less into $M$, slowing the internal clock by the same fraction.

### 4 · Time Dilation as Energy Redistribution

Each tick keeps the total energy constant, but its allocation shifts:

- Translational energy grows with $T = v/c$
- Proper-time energy shrinks with $M = 1/\gamma$

The result is time dilation expressed as energy trade. What looks like slower ticking is simply less causal power devoted to maintenance. The object spends more of its budget on motion through space, leaving less for internal state updates.

### 5 · Photon and Matter as One Rule

By using the species parameter $\omega_0$, the same formula handles all particles:

- **Photon:** $\omega_0 = 0$, no bound maintenance tick ($M=0$), pure translation.  
- **Matter:** $\omega_0 > 0$, bound tick advances with proper time, cost carried in $M$.

Photons and massive particles therefore share one unified causal rule: the same budget, different coupling to the maintenance channel.

---

### The Complete Picture

| Perspective | Invariant Form | CBF Reading |
|:--|:--|:--|
| **Budget law** | $T^2 + M^2 = 1$ | total causal step per tick |
| **Spacetime geometry** | $c^2 d\tau^2 = c^2 dt^2 - dx^2$ | invariant interval |
| **Energy–momentum** | $E^2 = (p c)^2 + (m c^2)^2$ | energy decomposition |
| **Mass–energy equivalence** | $E = m c^2$ | per-tick causal energy |

All four expressions describe the same right-triangle invariant viewed through different unit systems: the geometry of the causal budget, the curvature of spacetime, and the accounting of energy are all reflections of a single conserved rule.

---

### In Summary

At this point, the CBF has turned relativity into something I can code using a cellular automaton. Every object spends the same causal budget each tick, and as speed rises, less of that budget remains for internal upkeep. Time slows as maintenance decreases. Yet this raises a deeper problem. Einstein’s observer can choose any frame as the one at rest, but 𝐶=𝑇+𝑀 can’t do that on its own.

The next blog explores that impossible observer problem, where mismatched clocks, buffered interactions, and the illusion of a shared “now” are all woven from the same computational rule through the Event Ledger.

What comes next:
- **Special Relativity:** Observer Reconciliation using the Event Ledger.
- **Event Ledger** Global reconciliation layer.
- **General Relativity:** SR pacing and curvature that fall out of the same budget.
- **Maxwell:** how the budget reproduces electromagnetic behavior and standard experiments.
- **Putting It All Together:** unification, predictions, tests, and open problems.

---

*Continue to Dev Blog 3: Special Relativity →*