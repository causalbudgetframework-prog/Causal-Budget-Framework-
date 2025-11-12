# Dev Blog 3: Special Relativity from Budget Allocation

## Part 1: Developer Blog
**Causal Budget Framework (CBF)**  
*Author: Jamie Whitten (25+ years software engineering)*  
*Dev Blog 3: Special Relativity*  
*Version 1.0* · *Last updated: 2025-10-11*  
*Contact:* [/contact](/contact) · *GitHub:* https://github.com/causalbudgetframework-prog

**Attachments**:  
[Reference Table](../referenceTable.md)
[How to Compute Mch](./m_ch.md)  
[M Channel demo](./demo/)  
[Beat-Matching vs Confidence-Gating: Two Timing Modes](./timing_modes.md)  
[Planck Spectrum Demo](./demos/planck_demo.html)  
[Redshift Demo](./demos/redshift_demo.html)  
[Particles Blog](./exp_creation.md)  
[Oscillation Blog](./exp_oscillation.md)  

---

## The Symmetry Crisis

At first, $C = T + M$ felt complete. The math matched the Lorentz factor, time dilation fell out naturally, and nothing went faster than $c$. But a problem showed up as soon as I compared two moving frames. The rule was **directional**.

In my CA, higher speed meant smaller $M$, so the internal clock ran slower. That makes sense from a lab frame. But in special relativity there is no preferred frame. Each observer should see the other as moving and treat their own clock as normal. A CA update loop should only need one linear pass, not a separate re-frame for every observer.

I called this the symmetry crisis. How can both observers see the other’s clock running slow if the code has only one budget split? It started to feel like I was about to run SR on top of SR.

Up to now, the observer only needed the same $T$ and $M$ rules as the particles in its frame to stay in sync. My first fix was an “observer mapper” that viewed the universe through Einstein’s equations. It worked, but it felt like cheating. It effectively revolved the universe around the observer. A CA cannot work like that.

So I set two tests the model had to pass.

(Full numerical walkthroughs with code are provided in the AI Mathematical Appendix, Part IV.B-C)

### Train Test 1 — Same Direction

Two trains move east, one at $0.25c$ and one at $0.5c$. The slower train has more $M$, so its clock runs faster. The faster train has less $M$, so its clock runs slower. From a single lab frame that is fine. But each train should be allowed to call itself at rest. From the $0.5c$ train’s view, the $0.25c$ train is moving backward at some speed, so it should see the other clock as slow. With only local budgets, both stories cannot be true at once.

### Train Test 2 — Opposite Directions

Now both trains run at $0.9c$, one east and one west. Their local $M$ values match, so each runs its own clock at the same rate. But if I compare naively, the relative speed looks like $1.8c$. That breaks SR. I need the **velocity addition law** to appear from the raw CA mechanics.

### Quick Refresher: Budget Normalization

**Before diving into the solution**, let's clarify the notation from Blog 1:

The causal budget splits as $C = T + M$, where $T$ drives motion and $M$ runs the internal clock. In flat spacetime, we normalize $C = 1$, giving $T + M = 1$. The Pythagorean form $T^2 + M^2 = 1$ follows from the relativistic relations $T = v/c$ and $M = \sqrt{1 - v^2/c^2}$. This holds locally even in non-uniform pacing, because it's just the Lorentz trade-off written in budget form. What changes in gravity is the total budget $C$: it becomes the local lapse $\alpha(x)$, giving $T + M = \alpha(x)$. That means different positions run at different tick rates. CBF treats this as a change in pacing, not a bend in the lattice itself (see the GR blog).

**Takeaway:** $C = T + M$ explains a single particle's time dilation, but it does not, by itself, give mutual symmetry between observers.

## Collapse Buffering Fixed It

Before this point, the framework explained how time dilation and motion budgeting worked locally with $C = T + M$. But there was still a puzzle: how could two observers in different frames both see the other's clock as slow if the update rule was purely directional? The answer came from something that was already hiding in the system: the **Event Ledger**.

### The Discovery

The Event Ledger first appeared during the Wave Mechanics work. It was designed to mark *where* a collapse should happen, but it appeared to do something unexpected. It **waited**. Collapse candidates were collecting before committing, as seen with the double-slit interference build-up.

My realization was that the Ledger wasn’t only deciding **where** an event occurs, it was also deciding **when**. It wasn’t just a spatial coordinator; it was a temporal one too. The same mechanism that lets interference patterns form also ensures that two systems with different internal clocks can agree on a shared event.

### The Global Buffer

The key is that **buffering happens in global time**. The Event Ledger waits a fixed number of global steps before committing, but each participant experiences a different amount of *proper time* during that wait. The slower clock (smaller $M$) advances less, the faster clock (larger $M$) advances more, and yet they both share the same global delay. This is how symmetry appears without running another layer of relativity on top of the simulation.

So while the CA code updates directionally, the Event Ledger provides a neutral meeting ground. It holds all proposals until they line up in frequency, and then commits a shared event that both sides interpret consistently.

For the complete mathematical formalism of how the Event Ledger enforces temporal reconciliation, see AI Appendix Part II (Three Reconciliation Gates) and Part IV.E (Symmetry Proof).

### Energy, Mass, and the Universal Phase Bridge

Before I dive into the Train Tests, we need to connect the abstract budget variables $T$ and $M$ to measurable energy. This connection comes through **Planck’s constant**, where $h$ (and the reduced constant $\hbar \equiv h / 2\pi$) turns phase rates into joules.

Planck’s constant is the single number that connects every energy process in the universe to the tick rate of its underlying phase. In ordinary quantum mechanics it first appeared in $E = h f$, where each photon carries energy proportional to its frequency. In the **Causal Budget Framework (CBF)**, that same bridge extends to all forms of causal activity: motion, maintenance, and binding.

### The Photon Side: Pure Translation

Einstein’s explanation of the photoelectric effect showed that light delivers energy in discrete chunks, $E_\gamma = h f = \hbar\omega$. The frequency $f$ comes from electromagnetic oscillation, and the constant $h$ converts that oscillation rate into measurable energy.

In CBF language, photons live purely in the **translation channel** $(T)$. Each emission is a "commit" that releases one quantum of size $h f$. This is what my queue → [Planck Spectrum Demo](./demos/planck_demo.html) revealed: when overflows emit $E = h f$, the black-body curve emerges automatically. The demo is easier to follow after the Queue Buffering section, but it also validated the photon energy rule.

### The Matter Side: Maintenance Oscillation

Bound particles oscillate too, but their phase lives in the **maintenance channel** $(M)$, the part of the causal budget that pays the cost of staying coherent. The cellular automaton’s relativistic dispersion relation is

$$
\omega^2 = c^2 k^2 + \omega_0^2, \qquad \omega_0 = \frac{m c^2}{\hbar}.
$$

At rest $(k = 0)$, only the maintenance term survives. Through the same Planck bridge $E = \hbar\omega$,

$$
E_{\text{rest}} = \hbar\omega_0 = m c^2,
$$

so the corresponding frequency

$$
f_0 = \frac{m c^2}{h}
$$

is the particle’s **Compton frequency**, the heartbeat of matter itself.

A moving particle’s proper-time ticking slows by the Lorentz factor

$$
\gamma(v) = \frac{1}{\sqrt{1 - v^2/c^2}},
$$

giving the **maintenance frequency**

$$
f_M(v) = \frac{f_0}{\gamma(v)}.
$$

This expresses time dilation. Internal processes tick more slowly in the lab frame. *(In lab time, the total phase rate associated with energy is $E/\hbar = \gamma,\omega_0$, which differs from the proper-time tick rate by one power of $\gamma$.)*

### One Constant, Two Channels

| Channel             | Observable          | Law                     | Physical Meaning            |
| :------------------ | :------------------ | :---------------------- | :-------------------------- |
| **T (Translation)** | Photons, radiation  | $E = h f = \hbar\omega$ | Energy of wave propagation  |
| **M (Maintenance)** | Matter, rest energy | $E = h f_0 = m c^2$     | Energy of bound oscillation |

Both use the identical conversion factor $h$. The only difference is where the oscillation lives:

* **Photons**: oscillation in space (T-channel)
* **Matter**: oscillation in proper time (M-channel)

CBF treats them as orthogonal halves of the same causal budget:

$$
C = T + M.
$$

### Why This Matters for the Train Tests

When we analyze the Train Tests below, we will track maintenance frequencies $f_M(v) = f_0/\gamma(v)$. Now the symbols have concrete meaning:

* $f_0$: the particle’s Compton frequency $(m c^2 / h)$
* $f_M$: the time-dilated maintenance frequency
* **Beat frequency**: $\Delta f_M = |f_A - f_B|$, the phase mismatch that requires reconciliation

The energy differences you will see are not abstract, they are real joules, connected to phase rates through $h$.

Planck’s constant is the bridge between computation and physics. It turns local phase into measurable energy, giving CBF its universal scale for both light and matter.

> **Note on $h$ vs $\hbar$:** We use $h$ when we speak in terms of frequency $f$ $(E = h f)$, and $\hbar$ when we speak in terms of angular frequency $\omega = 2\pi f$ $(E = \hbar\omega)$. They are the same bridge written in two notations: $\hbar = h/2\pi$.

### How Frequency Alignment Works

Think of $C = T + M$ as a **frequency budget**:

* $T$ drives the traveling phase—motion and oscillation.
* $M$ runs the local clock—the internal tick rate (via $\omega_0$).

When two systems with different $M$ values interact, their clock rates don’t match. The Event Ledger uses **beat-matching**: it waits for the next natural phase coincidence. The frequency mismatch is

$$
\Delta f_M = f_0 |M_1 - M_2| \quad (\text{Hz}),
$$

and the commit delay is

$$
\tau_{\mathrm{commit}} = \tau_0 + \frac{1}{|\Delta f_M|}.
$$

**Larger** mismatches give **shorter** waits (more frequent alignments); **smaller** mismatches take **longer** to realign—exactly how beat frequencies behave.

That buffering delay isn’t arbitrary, it’s how time-dilation symmetry emerges computationally. Each participant still evolves under its own $C = T + M$ rule; the Ledger only commits when their internal frequencies momentarily coincide.

**Scope.** This is the simplified **same-direction** form ($\theta = 0$). The full directional extension adds the $M_{\text{ch}}(1 - \cos\theta)$ term (see §2.2 and AI Appendix Part IV.C / Part II.C).

### Measuring $f_M$ in Hertz

In CBF, the maintenance frequency $f_M$ is the proper-time tick rate — how fast internal processes run in hertz:

$$
f_M(v) = \frac{f_0}{\gamma(v)} = f_0 \sqrt{1 - \frac{v^2}{c^2}},
$$

where $f_0 = \dfrac{mc^2}{h}$ is the particle’s baseline or “rest” maintenance frequency. For an electron, $f_0 \approx 1.24 \times 10^{20}\,\text{Hz}$. At $0.9c$, that drops to about $5.4 \times 10^{19}\,\text{Hz}$. The difference between these internal clock rates is what the Ledger buffers over.

This means buffering delay is not arbitrary — it’s literally measured in real, physical frequency mismatches. The Event Ledger synchronizes those clocks so both observers agree on the final outcome.

The derivation of $f_0 = mc^2/h$ as the rest maintenance frequency is provided in AI Appendix Part V.A (Compton Frequency as Maintenance Rate), which shows how this connects to measurable physics via atom interferometry and the Compton wavelength.

### Distinguishing Oscillation and Frequency

It’s important not to confuse the two:

- **Oscillation** (in $T$): the wave motion, the repeating spatial phase of movement.  
- **Frequency** (in $M$): the tick rate of proper time, how fast the system updates internally.

Oscillation is about motion through space. Frequency is about the rate of maintenance and synchronization. They are linked by the shared causal budget $C$, but they live on opposite sides of it.

### Summary

Each participant still runs the same local rule ($C = T + M$), but now the **Ledger** delays commitments until both sides are in phase. The event that finally commits becomes a shared anchor in history, and both observers can project it into their own timelines without contradictions. That’s why both can truthfully say the other’s clock was slower.

**Takeaway:** Buffering in global time creates relativity automatically. It lets local processes stay simple and directional while ensuring global outcomes stay symmetric. This can even be expressed directly in measurable frequencies, tying CBF’s abstract budget to real physics in hertz.

## Queue Buffering

Collapse Buffering via the Event Ledger synchronizes timelines when two or more objects meet. It doesn’t rewrite their pasts—it only ensures they agree on the same commit when their histories intersect. Each object still evolved independently under $C = T + M$ until that point. The slower one really did accumulate more proper time; the faster one less.

But what about while they are *in flight*, constantly exchanging information instead of colliding once? This is where **Queue Buffering** enters.

### 1 · What Queue Buffering Does

While Collapse Buffering ensures **shared commits**, Queue Buffering manages **continuous interactions**—the sustained stream of photons, messages, or updates passing between moving systems.

Each object keeps running its own local loop under $C = T + M$. Whenever a new photon or signal arrives, it must wait until the current collapse finishes. If another arrives during that wait, it joins a queue. The length of this queue becomes the *observable* time dilation.

Objects with a larger $M$ drain their queues quickly. Objects with smaller $M$ (faster motion) drain them slowly, because most of their causal budget is already spent on translation.

In effect:
- The **slower** frame (larger $M$) processes events rapidly.
- The **faster** frame (smaller $M$) accumulates a backlog of pending commits.

That backlog makes external clocks appear to slow down in its view.

---

### 2 · How Symmetry Emerges

In special relativity, both observers see the other’s clock as slow. Queue Buffering reproduces that without extra postulates.

From the ship’s frame (high speed, low $M$):
- Earth’s photons pile up waiting for the ship’s Ledger to process them.  
- The ship sees Earth’s time crawl, because it is behind on event commits.

From Earth’s frame (low speed, high $M$):
- The ship cannot emit or reflect new photons until its internal commits finish.  
- Earth receives a sparser stream of updates and also sees the ship’s clock run slow.

The symmetry arises automatically because the Event Ledger uses the **same channel share M_ch** (derived from their relative velocity) to gate both inbound and outbound commits. The bilateral delay function is symmetric: τ_commit(A,B) = τ_commit(B,A), as proven formally in Appendix Part IV.E.

---

### 3 · Why It Matters

Queue Buffering shows that SR symmetry doesn’t require duplicating physics for every frame. The Event Ledger’s pacing alone enforces it. Each worldline keeps running $C = T + M$ at its own proper tick rate, and the shared Ledger layer handles the apparent delay through backlog management.

Formally, a simple scaling for queue delay is

$$
\tau_{\text{queue}} \propto \frac{1}{M_{\text{ch}}}\,N_{\text{pending}},
$$

where $M_{\text{ch}}$ is the **channel maintenance share** between the two worldlines (from their relative velocity), and $N_{\text{pending}}$ is the number of unresolved commits.

As $M_{\text{ch}} \to 0$ (high relative speed), the same number of incoming events takes longer to clear—matching SR’s time dilation.

---

### 4 · Intuitive Picture

Think of each worldline as a CPU core:
- $T$ is compute time spent *moving data*.
- $M$ is compute time spent *maintaining coherence*.
- The Event Ledger is a global scheduler that waits until both sides finish their queued jobs.

A faster-moving object (high $T$, low $M$) burns most of its CPU on motion. It has less processing left for synchronization, so its message queue grows. A stationary object (low $T$, high $M$) has plenty of processing capacity, so it stays caught up.

From either side, the other’s clock appears to run slow—but in reality, both are simply seeing a shared, throughput-limited scheduler at work.

---

### 5 · Takeaway

Queue Buffering turns relativity symmetry into a direct consequence of **computational load balancing**:

> Time dilation is not a change in local physics; it’s the visible effect of unequal queue depths in the Event Ledger.

Both observers are right. Their histories remain intact. What changes is how long each has to wait for the shared world to catch up.

---

### Numerical Example: Earth ↔ Ship at $0.99c$

For a ship at $0.99c$,
$$
M_{\text{ship}} = \sqrt{1-0.99^2} \approx 0.141,\qquad \gamma \approx 7.09.
$$
If Earth emits one photon per Earth tick, the ship’s Event Ledger can only process about $0.141$ commits per *ship* tick. Over a short window, this produces a backlog that scales roughly like
$$
N_{\text{backlog}} \approx N_{\text{arrivals}} - N_{\text{processed}} \sim N - 0.141\,N,\quad \text{i.e., }\;0.859\,N.
$$
So after $N=10$ Earth ticks, the ship has a backlog of about $8.6$ events waiting to commit.

From the ship’s perspective, Earth’s clock looks $\sim7\times$ slower (matching $\gamma$). From Earth’s perspective, the ship’s *emission* cadence is throttled by the same $M$ gate. Both views arise from one bottleneck: the ship’s limited $M$ for reconciliation.

(For the complete queue buffering mathematics and service-rate derivation, see Appendix Part IV.D.)

## Validation: Train Scenarios Revisited

### Entanglement matters

These train examples don’t exist for each other until a shared event occurs — a photon exchange, a radar ping, or a physical contact. That event entangles their histories, creating one Ledger entry with a single global timestamp and two local proper times. Before that, the trains are just independent threads of computation with no mutual reference. After the exchange, they share a synchronized record, so both can consistently say “the other’s clock ran slow” without contradiction.

For example, the Andromeda paradox thought experiment doesn’t apply in CBF. Without an actual contact event, no cross-reference is created in the Ledger, so there’s no meaningful way to compare timelines across that gap.

---

## Validation: Train Test 1

The following walkthrough is the informal version. For the complete formal derivation with all mathematical steps, see AI Appendix Part IV.B (Train Test 1 — Full Numerical Walkthrough).

### Buffering and Proper-Time Split

Two trains move in the same direction:

- Train A at $0.25c$ → $M_A = \sqrt{1 - 0.25^2} = 0.968$
- Train B at $0.50c$ → $M_B = \sqrt{1 - 0.50^2} = 0.866$

The **Event Ledger** waits until their internal tick frequencies line up. That wait time, expressed in global simulation steps, is the buffer delay.

---

### Step 1 — Find the buffer delay

Let the baseline commit tick be $\tau_0 = 0.1\,\text{s}$ and each train’s rest-frame maintenance frequency $f_0 = 10\,\text{Hz}$. The frequency mismatch is

$$
\Delta f_M = f_0\,|M_A - M_B| = 10\,(0.968 - 0.866) = 1.02\,\text{Hz}.
$$

Then the Ledger holds the event until

$$
\tau_{\text{commit}} = \tau_0 + \frac{1}{|\Delta f_M|} = 0.1 + 0.98 \approx 1.08\,\text{s}.
$$

That equals

$$
N = \frac{\tau_{\text{commit}}}{\tau_0} = \frac{1.08}{0.1} \approx \mathbf{11\,\text{global steps}}.
$$

---

### Step 2 — Compute each clock’s progress during the same global wait

Each train’s proper-time advance per global tick equals $M_i\,\tau_0$.

$$
\Delta\tau_A = N\,M_A\,\tau_0 = 11\,(0.968)\,(0.1) = 1.06\,\text{s},
$$
$$
\Delta\tau_B = N\,M_B\,\tau_0 = 11\,(0.866)\,(0.1) = 0.95\,\text{s}.
$$

Ratio:

$$
\frac{\Delta\tau_A}{\Delta\tau_B} = \frac{1.06}{0.95} = \mathbf{1.118}.
$$

---

### Step 3 — Interpretation

- Both trains waited **the same 11 global steps** for the Ledger to commit.  
- Each step carries a different local tick size, so their proper times diverge.  
- From A’s viewpoint: $1.00\,\text{s}$ of its own time $\Rightarrow 0.894\,\text{s}$ on B’s clock.  
- From B’s viewpoint: $1.00\,\text{s}$ of its own time $\Rightarrow 1.12\,\text{s}$ on A’s clock.

That symmetric mismatch is exactly what special relativity demands — but here it **emerges from the single global buffer delay**.

**Takeaway:** The Event Ledger doesn’t favor a frame. It inserts one neutral global pause (about 11 steps). Each participant’s proper-time rate $M$ makes that pause look different locally. That’s how CBF reproduces time dilation symmetry without adding an extra relativity layer.

## Train Test 2 — Directional Buffering and Symmetry Validation

Up to this point, the trains were treated as **scalar worldlines**, differing only by speed. This made comparing $M$ and $T$ straightforward. But what happens when the magnitudes of $M$ and $T$ are the same—like in the second train example? To handle that, the commit‑delay law $\tau_{\text{commit}}$ must include **direction**.

---

## 2.1: Directional Buffering

This is where the **maintenance channel** $M_{\text{ch}}$ enters. It measures how much of each object's $M$ is effectively available **along the direction of interaction**.

**Wave-cell representation and unification.** Particles in CBF are represented by **distributions of wave cells**, each carrying its own momentum vector. This is the same representation used in Paper 1 (Wave Mechanics) to explain interference: when cells from different paths meet, their momentum vectors are compared to determine the collision probability (see Appendix Part I for the foundational formalism).

For time dilation, the Event Ledger applies the same directional comparison. When two systems interact:
- Their wave cells carry momentum vectors **k**₁ and **k**₂
- The angle θ between these vectors determines the directional mismatch
- The Ledger uses this angle in the commit-delay formula

This unifies **spatial interference** (Paper 1, $W(r)$ ∝ $cos^2$ $θ_k$, Appendix Part II.A) with **temporal buffering** (this paper, delay ∝ $M_{\text{ch}}(1 - cos θ)$, Appendix Part II.C). Both emerge from comparing wave-cell momentum at the interaction boundary.

**Angular dependence:**
- Two objects moving in the **same direction** have aligned wave cells (θ ≈ 0), minimal directional penalty
- Objects moving in **opposite directions** have anti-aligned cells (θ ≈ π), maximum directional penalty  
- The magnitude of this penalty is set by $M_{\text{ch}}$, the channel maintenance share derived from their relative velocity

**Computing the channel share.** The maintenance channel $M_{\text{ch}}$ quantifies the effective throughput between two worldlines based on their relative velocity. It is computed using Einstein velocity addition applied to the projected speeds along the interaction line:
 
$$M_{\text{ch}} = \frac{1}{\gamma(w)}, \quad w = \frac{u_1 - u_2}{1 - \frac{u_1 u_2}{c^2}}$$
 
This ensures that observers moving at different velocities experience symmetric time dilation when exchanging information. The complete derivation showing how $M_{\text{ch}}$ reproduces the Lorentz factor without explicit coordinate transforms is provided in:
- **AI Appendix Part IV.C** (Train Test 2 — Full Numerical Walkthrough)  
- **AI Appendix Part II.C** (Directional Gate Formalism)  
- **[How to Compute Mch](./m_ch.md)** (Standalone derivation document)


### 2.2 Directional Commit Rule

**Beat-matching (definition).** In this paper, *beat-matching* means the Event Ledger commits at the **next natural phase coincidence** between participants. The larger the mismatch, the **sooner** a coincidence occurs; the wait time therefore scales **inversely** with the mismatch.

The complete commit-delay law accounting for both temporal and directional mismatches is:
$$
\tau_{\text{commit}}
= \tau_0 + \frac{1}{\,f_0\big(|\Delta f_M| + M_{\text{ch}}(1-\cos\theta)\big)}.
$$

where:
- $f_0$ is the rest maintenance frequency,
- $|\Delta f_M|$ handles temporal (frequency) mismatch,
- $M_{\text{ch}}(1-\cos\theta)$ handles directional (angular) mismatch.

This is exactly the beat-matching logic of $\tau_0 + \tfrac{1}{f_0|\Delta f_M|}$, now extended with the **directional penalty** $M_{\text{ch}}(1-\cos\theta)$.

For same-direction motion ($\theta=0$), the directional term vanishes (pure frequency alignment). For opposite-direction motion ($\theta=\pi$), the term becomes $2M_{\text{ch}}$, producing the full relativistic factor $\gamma(w)$. The mathematical justification appears in **AI Appendix Part IV.C** (Train Test 2) and **Part II.C** (Directional Gate).

---

**Timing modes (for context).** The formula above uses **beat-matching** (delay $\propto 1/$ mismatch) throughout SR/GR results. An alternative **confidence-gating** form models thresholded decisions with delay $\propto$ mismatch:

$$
\tau_{\text{commit}} = \tau_0 + k\big(|\Delta f_M| + M_{\text{ch}}(1 - \cos\theta)\big)
$$

Both preserve Lorentz symmetry; beat-matching aligns naturally with wave phenomena (interference, resonance), while confidence-gating is useful for probabilistic detection (photon clicks, weak measurements). All SR and GR derivations in this paper use **beat-matching**. For a detailed comparison of when each mode applies, see:

[**Beat-Matching vs Confidence-Gating: Two Timing Modes**](./timing_modes.md)

### 2.3 Opposite‑Direction Setup

Let train A move right at $v_A=0.9c$ and train B move left at $v_B=-0.9c$. In the global lattice, each train’s per‑tick causal budget is $C=T+M$ with $\tau_0$ as the universal tick interval. Each train divides its per‑tick compute share using its Lorentz factor:

$$
M_A=M_B=\frac{1}{\gamma(0.9)}\approx0.436,\qquad
T_A=T_B=1-M\approx0.564.
$$

Although magnitudes match, the translation vectors oppose each other. The Event Ledger must now buffer not only temporal frequency mismatch $\Delta f_M$ but also the **directional channel mismatch**, since reconciliation demands both WHEN and WHERE consistency.

---

### 2.4 Channel Maintenance Share

The effective channel share quantifies how much maintenance budget each side must reserve to sustain the shared link. It follows the same relativistic composition law as velocity addition (applied to the **projected** speeds along the interaction line):

$$
M_{\text{ch}}=\frac{1}{\gamma(w)},\qquad
w=\frac{u_1-u_2}{1-\dfrac{u_1u_2}{c^2}}.
$$

For $u_1=0.9c$ and $u_2=-0.9c$:

$$
w\approx0.994475\,c,\qquad \gamma(w)\approx9.5263,\qquad M_{\text{ch}}\approx0.105.
$$

This matches the special‑relativistic time‑dilation factor between counter‑moving frames. The Ledger reproduces the same result *without explicit Lorentz transforms*: the extra buffering delay naturally yields $\gamma(w)$.

---

### 2.5 Interpretation

In CBF terms:

- The **temporal gate** measures frequency alignment (via $M$).
- The **directional gate** measures momentum alignment (via $\theta$).
- The **channel share** $M_{\text{ch}}$ couples the two, producing the correct Lorentz relative factor.

When trains move in opposite directions, their proper clocks remain consistent within their own Ledgers. However, exchanging information requires waiting for the **directional buffer** to reconcile timing *and* orientation. The resulting commit interval is dilated by $\gamma(w)$, ensuring both trains record the same number of global ticks per shared event—preserving full SR symmetry.

---

### 2.6 Relation to the Paper 1 Interference Mechanism

Directional buffering is the temporal analogue of the **interference mechanism** discussed in Paper 1. In both cases, the Event Ledger adjusts commit probability by comparing projected momentum vectors:

$$
W(\mathbf r)=\cos^2(\theta_k) \quad \text{(Paper 1 interference weighting)}
$$

and

$$
\tau_{\text{commit}} = \tau_0 + \frac{1}{f_0\,M_{\text{ch}}(1-\cos\theta)} \quad \text{for}\ \Delta f_M=0 \quad \text{(directional delay)}.
$$

Together these ensure any exchange—whether interference or moving‑frame communication—remains symmetric across all observers. CBF achieves Lorentz invariance **not by coordinate transformation**, but by **budget symmetry** within its discrete update rule.

## How Photons Work in This System

In the Causal Budget Framework, photons are the simplest case: they have no maintenance channel ($M=0$) and therefore never enter the temporal ("when") gate of the Event Ledger. They carry only translation ($T$), moving along null paths at the universal tick speed $c$. From this I generated two short demos that test how a causal automaton reproduces redshift and radiation statistically. See: Statistical Validation via Demos

---

### 1. Emission: Birth Oscillation

At emission, the source stamps its proper-frame oscillation frequency $f_{\text{emit}}$ into the photon’s translation phase. That phase is not an internal clock but part of the source’s $T$ budget. The photon then departs with this fixed phase signature (*birth oscillation*). 

$$ f_{\text{carried}} = f_{\text{emit}} $$

This blog explains how I think particles are created [Particles Blog](./exp_creation.md) and this blog on how I think oscilation is created [Oscillation Blog](./exp_oscillation.md)  

---

### 2. Propagation: The No-Queue Leg

In CBF, nothing alters the photon during propagation. It does not buffer or accumulate delay, because there is no $M$ to store phase drift or energy loss. Even gravitational redshift is treated as a comparison between differently paced clocks at emission and detection, not as a mid-flight change.

As discussed in my earlier Cellular-Automaton posts, $C=T+M$ doesn’t imply spatial stretching. Therefore, the photon’s frequency does not change en route; the apparent shift arises entirely at the boundary comparison between emitter and detector pacing, quantified by their local lapse values $\alpha_{\text{emit}}$ and $\alpha_{\text{obs}}$:

$$ f_{\text{obs}} = f_{\text{emit}} \times \frac{\alpha_{\text{obs}}}{\alpha_{\text{emit}}} $$

and the corresponding redshift factor

$$ 1 + z = \frac{\alpha_{\text{emit}}}{\alpha_{\text{obs}}} $$

The gravitational lapse $\alpha(x)$ and its connection to the weak-field metric is derived in AI Appendix Part V.C (Gravitational Lapse from Poisson Field). This shows how $\alpha \approx 1 + \Phi / c^2$ reproduces Pound-Rebka redshift and GPS corrections.

---

### 3. Detection: Reading Against the Detector’s $M$

At detection, the photon’s unaltered phase is compared to the detector’s local maintenance rate. Pacing differences in $M$ and the angle of incidence determine the measured frequency. The photon itself does not change; the measurement context does.

This reproduces both special and general relativistic predictions using nothing more than relative clock rate and motion.

---

## 4. Statistical Validation via Demos

Based on these assumptions, I **generated** two short demos purely as test instruments:

1. A **queue-emission model** that produces a *Planck-like spectrum* without ultraviolet blow-up. This tests whether local budget exchange and overflow dynamics can statistically reproduce the Planck distribution without requiring any continuum equations.

2. A **redshift and phase visualizer** where photons retain their *birth oscillation*, and the observed shift follows the rule

$$ f_{\text{obs}} = f_{\text{emit}} \times \frac{\alpha_{\text{obs}}}{\alpha_{\text{emit}}} $$

### Demos:

**[Planck Spectrum Demo](./demos/planck_demo.html):** (Local queueing produces a stable blackbody curve and avoids the ultraviolet catastrophe.)  
**[Redshift Demo](./demos/redshift_demo.html):** (This demonstrates how apparent frequency shifts emerge from comparing emitter and detector pacing, not from mid-flight energy loss.)

The theoretical foundation for these simulations is provided in AI Appendix Part V.B (Planck Spectrum Emergence), which shows the 5-step roadmap from bosonic hazards to the Planck distribution without UV catastrophe, and Part V.C-D for the gravitational and electromagnetic connections.

These demos simply check whether the CBF rules behave as expected when applied to basic photon cases. Interpreting $\alpha$ as the local clock pacing $d\tau/dt$, both outcomes match standard SR and GR predictions while maintaining the causal automaton structure of the framework.

---

### 5. Interpretation

Together, these results show that the CBF’s discrete rules naturally reproduce two of the most fundamental radiative laws:

- The **Planck energy distribution**, from local queue statistics.
- The **cosmological redshift**, from clock-rate comparison.

Rather than reinterpreting cosmology, these simulations suggest that key observational laws can **emerge from local causal automaton dynamics**. The photons’ simplicity — carrying no $M$, never buffering, and only interacting through boundary reconciliation — provides a clean computational window into how radiation, temperature, and time pacing intertwine in the fabric of the Event Ledger.

## The Three Gates of Reconciliation

### 1. **Spatial Gate (Where)**
- **Role:** Chooses *which candidate location* an event collapses into.  
- **Mechanism:** Conserves momentum and energy to pick a spatial winner among all proposals.  
- **Scope:** Universal — applies to photons and matter alike.  
- **Key trait:** No delay, only positional selection.  
- **In Train Example:** Decides the actual meeting point of the two trains’ signals.  
- **In Photons:** Only this gate applies (they have no internal clock).  

### 2. **Temporal Gate (When)**
- **Role:** Aligns proper-time frequencies between systems with maintenance budgets $M > 0$.  
- **Mechanism:** The Event Ledger buffers until their tick rates (frequencies $f_M$) phase-match within tolerance.  
- **Scope:** Applies only to matter; photons skip this gate.  
- **Key trait:** Creates the *queue delay* that emulates time dilation.  
- **In Train Example:** Handles the scalar difference between $M_A$ and $M_B$.  
- **In CBF math:** This appears as $\Delta f_M$ in the commit-delay equation.  

### 3. **Directional Gate (How)**
- **Role:** Aligns the *orientation* of worldlines — ensuring events match both timing and trajectory direction.  
- **Mechanism:** The maintenance channel $M_{ch}$ acts as a throughput coefficient that scales with the cosine of the angle between translation vectors.  
- **Scope:** Applies to any event with moving participants (matter or mixed interactions).  
- **Key trait:** Adds the $M_{ch}(1 - \cos \theta)$ term to $\tau_{\text{commit}}$, accounting for angular offset and producing Lorentz-correct delay for counter-motion.  
- **In Train Example:** The reason opposite-direction trains experience an extra wait even when $|\Delta f_M|=0$.  
- **In CBF math:** Couples with the temporal gate to yield full Lorentz symmetry: $\gamma(w)$ emerges from the combined buffering.

---

### Summary Table

| Gate | Function | Applies To | Observable Effect | Corresponds To |
|------|-----------|-------------|-------------------|----------------|
| **Spatial** | Selects *where* collapse occurs | All systems | Interference, diffraction, geometry | Momentum conservation |
| **Temporal** | Decides *when* collapse commits | Matter (M>0) | Time dilation, queue buffering | Frequency alignment |
| **Directional** | Aligns *how* the vectors meet | Moving systems | Doppler/aberration consistency | Angular phase matching |

---

### Integration Note

In summary, what was earlier described as *directional buffering* actually combines two reconciliations: a **temporal gate** that aligns tick rates and a **directional gate** that aligns velocity vectors. Both live inside the maintenance channel $M_{ch}$, while the **spatial gate** simply chooses the winning collapse location.

## Diffraction is Interference (Continued from Blog 1)

In Blog 1, I showed you that diffraction and interference are the same phenomenon—both involve comparing wave cells from multiple paths. But I didn't explain **why** that comparison produces the Born rule P(**r**) ∝ |ψ|². Now I can.

**The mechanism is beat-matching.**

When wave cells from different paths arrive at a detector, each carries its own phase:

$$\theta_i = \mathbf{k}_i \cdot \mathbf{r} - \omega t$$

The Event Ledger doesn't commit immediately. It **waits** for phases to align—the same way it waits for maintenance frequencies to align in the Train Tests above. During each global tick, it opens a coincidence window of width δ. Cells arriving within that window get counted together:

$$\lambda(t) \propto \left|\sum_i e^{i\theta_i}\right|^2$$

Over many ticks, the commit frequency at position **r** becomes proportional to the time-averaged value of this expression—which is exactly |ψ(**r**)|².

**This is the same temporal reconciliation that creates time dilation.** The only difference:
- **In interference**: Phase differences come from spatial paths (different **k** vectors)
- **In time dilation**: Phase differences come from motion (different M rates)

Both use beat-matching. Both wait for coincidence. Both produce squared-magnitude weighting.

**Single-slit**: Continuous fan of **k** directions → broad central peak  
**Double-slit**: Two discrete **k** bundles → fine fringes  
**Time dilation**: Different M frequencies → reciprocal slowing

Same gate, three contexts. The pattern I noticed in Blog 1 wasn't an accident—it was the first hint that one timing mechanism underlies both quantum and relativistic phenomena.

For the complete mathematical treatment of how phase-coincidence counting produces the Born rule, see the AI Appendix Part III (Emergent QM from Phase Statistics).

## What's Falsifiable

The Causal Budget Framework (CBF) makes testable predictions across multiple domains, grouped into three categories:

**Category A (Compatible):** Same predictions as standard physics, confirming internal consistency  
**Category B (Reinterpretation):** Same outcomes but explained through different mechanisms  
**Category C (Unique):** Distinct predictions that could falsify CBF if disproven

---

### Special Relativity Tests

1. **Time dilation** (A): $M = 1/\gamma(v)$ reproduces muon lifetime, GPS corrections, and transported atomic clock results (precision $10^{-15}$).

2. **Velocity addition** (A): $M_{\text{ch}} = 1/\gamma(w)$ matches Einstein’s velocity-addition law in collider time-of-flight tests (precision $10^{-6}$).

3. **Doppler / aberration** (B): $f' = f\,\gamma(1 - \beta \cos \theta)$ emerges from queue throughput rather than continuous wave stretching.

4. **Queue burst sensitivity** (C-Unique): Predicts transient dilation variations with commit clustering even at fixed velocity ($\Delta\tau/\tau < 10^{-12}$ measurable threshold).

---

### Photon Predictions

5. **No temporal buffering in vacuum** (C-Unique): Photons have $M = 0$, so $\tau_{\text{commit}} \to \tau_0$ with no queue delay during propagation.

6. **Endpoint-only redshift** (B): Frequency shifts occur solely at emission or detection boundaries, not continuously during flight.

7. **Asymmetric commit times** (C-Unique): Matter–matter interactions show finite $\tau_{\text{commit}} - \tau_0$; photon–matter interactions show $\tau_{\text{commit}} \to \tau_0$ on the photon side.

---

### General Predictions

8. **Ledger reciprocity** (C-Unique): Enabling the temporal gate reproduces reciprocal time dilation; disabling it breaks reciprocity (simulation falsifier).

9. **Planck spectrum from queues** (B): Local emission and absorption hazards generate a blackbody distribution without requiring a continuum assumption.

10. **Channel-share universality** (A): $M_{\text{ch}}$ must agree with special relativity across all velocity combinations and observer frames.

---

For the complete falsifiable predictions table with measurement precision requirements, see **AI Appendix Part VI (Falsifiable Predictions)**.  
Tests marked **(C-Unique)** represent the empirical frontier where the Causal Budget Framework can be definitively challenged or confirmed.

## Conclusions

**What the model explains**

- **SR from two layers, not two laws.**  
  Local budgeting ($C=T+M$, $T^2+M^2=1$) sets each worldline’s proper tick; the **Event Ledger** enforces shared commits by buffering until clocks align.
- **Why symmetry appears.**  
  Observers only compare **committed events**. Queue Buffering throttles continuous exchange based on the receiver’s $M$ and the channel share $M_{\text{ch}}$, so each sees the other’s clock slow—reciprocally.
- **Photons are the simple case.**  
  Photons ($M=0$): they skip the temporal gate and propagate at $c$. Apparent frequency/time shifts arise only at emission/detection—when the carried phase is read against the detector’s $M$ (clock rate) and directional alignment (relative velocity and angle $θ$; Doppler/aberration).  
- **One mechanism, two faces.**  
  The same reconciliation rule that builds interference patterns (spatial) also enforces Lorentz symmetry (temporal).

**Key formulas to remember**

- **Budget law:** $C = T + M$ (total causal budget per tick).
- **Flat-space normalization:** In flat spacetime, $C = 1 \;\Rightarrow\; T + M = 1$.
- **Pythagorean form (demo normalization):** Under $C=1$, $T^2 + M^2 = 1$.
- **Lorentz factor link:** $T=\beta=v/c,\quad M=1/\gamma(v)=\sqrt{1-\beta^2}$.
- **Commit delay (directional beat-matching):**  
  $$\tau_{\rm commit}=\tau_0+\frac{1}{f_0\big(|\Delta f_M|+M_{\text{ch}}(1-\cos\theta)\big)}$$
- **Channel share:** $M_{\text{ch}}=\sqrt{1-\beta_{\rm rel}^2}$, where $\beta_{\rm rel}=\dfrac{\beta_1-\beta_2}{1-\beta_1\beta_2}$.

**Why it’s interesting**

- **Computational causality → physics.** SR symmetry emerges from a scheduling rule, not a coordinate axiom.  
- **Predictive & testable.** The falsifiable bullets above tie the abstract Ledger to lab‑grade measurements.
- **Unifying intuition.** Interference and relativity look different in textbooks; in CBF they’re both **wait‑until‑agree** rules over phases.

**What’s next**

- Full **Event Ledger** paper (commit graph, gating modes, stochasticity, proofs).  
- **Appendix A:** computing $M_{\text{ch}}$ and worked Train‑2 numbers.  
- **GR preview:** spacetime pacing via $\alpha(x)$ blending with the same buffering law.