## Understanding Oscillation in the Causal Budget Framework (CBF)

During development of the CBF model, one of the most confusing areas turned out to be **oscillation**: what it means, where it lives, and how it connects to both translation ($T$) and maintenance ($M$). After several iterations, here’s the clean explanation that now unifies the picture.

---

### 1 · The Two Channels of Motion

Each system divides its **per‑tick causal budget** with a unit normalization:
$$
C = T + M, \qquad T^2 + M^2 = 1.\tag{1}
$$
- **$T$** = **translation** (motion through space / field propagation).
- **$M$** = **maintenance** (internal coherence / proper‑time pacing).

This split sets both the apparent speed and the local tick rate.

---

### 2 · What “Oscillation” Means Here

In CBF, **oscillation is phase advance carried by translation**. It is *not* the internal clock. We distinguish two phase variables:

| Type | Symbol | Channel | Meaning |
|:--|:--|:--|:--|
| Translational oscillation | $\phi_T$ | $T$ | Phase of the propagating wave / field |
| Maintenance phase | $\phi_M$ | $M$ | Proper‑time tick; spin/upkeep of bound state |

Per tick, their updates are
$$
\begin{aligned}
\phi_T &\mathrel{+}= 2\pi f_T\,dt, \\
\phi_M &\mathrel{+}= 2\pi\,\omega_0\,(M\,dt),
\end{aligned}\tag{2}
$$
where $f_T$ is the **carried** (propagation) frequency and $\omega_0$ is the **intrinsic** maintenance frequency of the matter species. Importantly, $\phi_T$ lives in $T$ whether or not $M$ exists.

---

### 3 · Why Oscillation Lives in $T$ (Not in $M$)

Photons make it obvious: with $M=0$ they still display wave oscillation. Therefore oscillation cannot require $M$.

- **Photons ($\omega_0=0$):** pure $T$ oscillation; no proper‑time tick; no temporal gate. The emitted frequency $f_{\text{emit}}$ is stamped at birth and **carried** unchanged in flight.  
- **Matter ($\omega_0>0$):** $M$ pays the cost of internal upkeep (spin, quantum numbers) and paces proper time. Oscillation seen from bound matter is a **$T$‑phase** maintained by $M$.

This rule keeps a single update loop — no special‑case branching.

---

### 4 · Vibration vs Radiation (Ledger View)

When two atoms exchange momentum, the Event Ledger may need a **temporal/directional buffer** to reconcile them. The reconciliation outcome routes energy:

- **Stabilized:** the perturbation is absorbed as **vibration** — increase in $M$‑mediated internal motion (heat).  
- **Released:** excess translation escapes as **radiation** — a photon commit (pure $T$ oscillation) carrying the phase outward.

**In short:** *vibration is $M$ correcting $T$; radiation is $T$ escaping $M$.*

---

### 5 · Maxwell Dynamics in $T$

Maxwell’s curls operate in the translation channel. $\phi_T$ is the field phase that propagates at $c$ along null paths. $M$ does not drive the curl; it supplies the **inertia/identity** for bound charges and sets their proper‑time pacing.

- **Photons:** $M=0$ \Rightarrow pure curl propagation; no temporal buffering on the photon leg.  
- **Matter:** $M>0$ \Rightarrow curl propagation + internal maintenance (spin), and any timing reconciliation happens **at the matter endpoints**.

---

### 6 · Redshift and Detection

In flight, photons keep their **birth oscillation**. Apparent shifts arise **at detection** when the carried phase is read against the detector’s pacing and geometry. With local lapse values $\alpha$ (clock pacing $d\tau/dt$):
$$
 f_{\text{obs}} = f_{\text{emit}}\,\frac{\alpha_{\text{obs}}}{\alpha_{\text{emit}}}, \qquad 1+z = \frac{\alpha_{\text{emit}}}{\alpha_{\text{obs}}}.\tag{3}
$$
Directional alignment (angle and relative velocity) appears through the usual Doppler/aberration factor, applied at the detector; no mid‑flight retiming is assigned to the photon.

---

#### Doppler Factor Inset

In standard relativity, the observed frequency depends on both relative speed $\beta$ and the incidence angle $\theta$ between emitter and detector:
$$
\Pi(\beta,\theta) = \gamma(1 - \beta \cos\theta), \qquad \gamma = \frac{1}{\sqrt{1-\beta^2}}.\tag{4}
$$
CBF reads this as a **spatial‑directional correction** applied at the boundary. The photon carries its $f_T$ unchanged, and the Event Ledger applies $\Pi(\beta,\theta)$ at detection, consistent with the observed Doppler/aberration laws.

---

### 7 · Key Takeaways

1. **Oscillation lives in $T$** (propagating phase). **$M$** paces proper time and maintains bound structure.  
2. **Vibration** = $M$ correcting $T$; **Radiation** = $T$ escaping $M$.  
3. **Photons**: $M=0$ (no temporal gate), carry fixed $f_T$ in flight; all timing reconciliation occurs at emission/detection.  
4. **Maxwell + Ledger**: curls evolve $\phi_T$; the Event Ledger’s temporal/directional gates resolve when/how commits finalize.  
5. **Redshift**: endpoint comparison of pacing ($\alpha$) and angle; photons themselves remain unchanged in transit.

---

### Summary Table

| Concept | CBF Role | Description |
|:--|:--|:--|
| $C = T + M$ | causal budget split | per‑tick compute partition |
| $T^2 + M^2 = 1$ | normalization | unit budget per tick |
| $\phi_T$ | translational phase | propagation oscillation |
| $\phi_M$ | maintenance phase | proper‑time tick (upkeep) |
| $\omega_0$ | maintenance frequency | $0$ for photons, $>0$ for matter |
| Vibration | $M$ correcting $T$ | internal stabilization (heat) |
| Radiation | $T$ escaping $M$ | emitted photon (pure $T$) |
| $\Pi(\beta,\theta)$ | Doppler factor | directional scaling at detection |

---

**Bottom line:** Oscillation is what translation looks like as a phase process. Maintenance is what it costs to keep that phase bound and paced in matter; photons carry the phase for free in $T$, with all frequency shifts resolved only at their emission and detection boundaries.

