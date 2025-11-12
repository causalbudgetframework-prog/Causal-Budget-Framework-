## Confidence-Gating vs Beat-Matching in CBF
This is a technical supplement to Dev Blog 3 (Special Relativity). It explains two alternative timing modes for the Event Ledger's commit-delay formula.

### 1. What Confidence-Gating Really Is

Confidence-gating is a *delay rule*. Instead of asking *"When do two oscillators line up?"* (beat-matching), it asks *"How long should the Event Ledger wait until it’s confident the two belong to the same event?"*

Mathematically:

$$
\tau_{\text{commit}} = \tau_0 + k\big(|\Delta f_M| + M_{\text{ch}}(1 - \cos\theta)\big)
$$

so the larger the mismatch, the **longer** the delay.

That’s not how waves behave — it’s how *filters* behave. The Ledger holds an event until its uncertainty (mismatch) drops below a threshold.

---

### 2. Where It Fits Conceptually

| Model use | Why confidence-gating makes sense |
|------------|----------------------------------|
| **Perception or measurement** | The system waits longer before committing to an observation if incoming information is inconsistent. |
| **AI or Ledger intelligence** | The Ledger is treated like an information processor that postpones commits when uncertainty is high. |
| **Quantum measurement** | Mimics the statistical aspect of collapse: more mismatch → smaller collapse probability → longer expected wait. |
| **Simulation throttling** | Prevents premature merges of asynchronous clocks in a discrete system. |

So confidence-gating is not about raw physics timing. It’s a modeling tool for **stability and probabilistic acceptance**.

---

### 3. When to Prefer Beat-Matching

Beat-matching, on the other hand, is **physics-faithful**:

$$
\tau_{\text{commit}} = \tau_0 + \frac{1}{f_0\big(|\Delta f_M| + M_{\text{ch}}(1 - \cos\theta)\big)}
$$

Larger mismatch → faster beat period → sooner coincidence → **shorter** wait. That’s how real interference behaves.

Use beat-matching for:
- **Wave interference and coherence**
- **Special relativity timing and buffer symmetry**
- **Energy exchange between moving frames**

---

### 4. Why Keep Both

They form a complementary pair inside CBF:

| Lens | Delay rule | Meaning |
|------|-------------|---------|
| **Beat-matching** | $\tau \propto 1/\text{mismatch}$ | Natural resonance timing; defines *when* coincidences occur. |
| **Confidence-gating** | $\tau \propto \text{mismatch}$ | Probabilistic filtering; defines *whether* a coincidence is trusted. |

In practice, you can layer them:
1. **Beat-matching** decides *when* the next alignment is possible.  
2. **Confidence-gating** decides *whether* the system actually accepts it.

That combination produces realistic probabilistic commits — like photon detections or quantum collapse — instead of purely periodic coincidences.

---

### 5. Why Use Confidence-Gating at All

Because it lets you model *decision latency* — the **"wait until I’m sure"** behavior of the Event Ledger, detectors, or even consciousness-like systems.  
It’s not how light waves sync, it’s how intelligent systems decide *when* synchronization means something.


## Which mode does CBF use?
All SR and GR derivations in the main papers use beat-matching, as it naturally reproduces interference, resonance, and continuous phase evolution. Confidence-gating remains available as a higher-level interpretation for probabilistic detection events (photon clicks, weak measurements, etc.), where the Ledger acts more like an observer deciding "is this signal real?" than a wave synchronizer.
For the mathematical formalism of both modes, see AI Appendix Part II.B (Temporal Gate).