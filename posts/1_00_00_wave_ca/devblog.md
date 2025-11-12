# Dev Blog 1: Wave Mechanics and the Double-Slit Discovery

## Part 1: Developer Blog
**Causal Budget Framework (CBF)**  
*Author: Jamie Whitten (25+ years software engineering)*  
*Dev Blog 1: Wave Mechanics*  
*Version 1.0* · *Last updated: 2025-10-11*  
*Contact:* [/contact](/contact) · *GitHub:* https://github.com/causalbudgetframework-prog

**Attachments**:  
[Reference Table](../referenceTable.md)  
[AI Appendix](./appendix.md)  

---

## Preface (Read This First)

I'm Jamie, a software engineer of 25+ years and a physics enthusiast. My strengths are building engines/frameworks and turning ideas into code. After years of watching talks on competing TOEs (Theories of Everything), I **decided to write a simple double-slit simulation** using a cellular automaton so I could step through it frame by frame and look for patterns. I didn't expect much, but within three months of evenings I kept finding angles that pushed me further and nudged me toward a computational view of the universe.

**Reality check:** this is not the story of one polished simulator. I built about a dozen evolving, half-working double-slit prototypes. Nothing was polished because I kept trying new ideas quickly. This is the story of how a CA approach began to **reproduce known laws of physics from simple rules**. I have a full-time day job, so I'm publishing the core ideas now (especially C=T+M) and I'm open to handing them off or collaborating with anyone who wants to push them further.

**Note on AI collaboration.** I brought in AIs (ChatGPT, Claude) for quick prototypes, critiques, and algebra checks, then often pitted them against each other to try to break (or save) an idea. I include an AI-Assisted Appendix to credit that help. I still want physicists/mathematicians to verify the math, and **I'm accountable** for all conclusions; the core concepts come from observation, pattern-matching, prototyping, and a lot of rubber-ducking with AI.

### How to Read This Series
* **Developer Blog (this section):** candid build log: failures, pivots, and the moments when patterns clicked.
* **AI-assisted math:** derivations and checks that map the claims onto known physics, plus skeptic/red-team notes.

### A quick note about dead ends

This isn’t a polished textbook, it’s my build log. I’m keeping some early ideas I later replaced, because the mistakes led to the better rules. You’ll see a few of these in this blog and the next until everything clicks: probability bead, particles “growing,” and the Move-or-Grow rule (next post). When one of these shows up, I circle back later and explain why it failed.

### Roadmap
1. **Wave Mechanics**: Vector-based CA, diffraction/interference, BFS-like propagation
2. **Special Relativity (SR)**: Budget allocation (translate vs. maintain) recovering Lorentz behavior
3. **Event Ledger**: Commit/reconciliation that resolves timing and conservation globally
4. **General Relativity (GR)**: Fields as pacing/curvature; geodesic motion from the same budget rule
5. **Maxwell**: How the budget framework reproduces EM dynamics and experiments
6. **Putting It All Together**: Unification, predictions, tests, and open problems

*Interested in collaborating or verifying the math?* **Contact:** /contact · **GitHub:** https://github.com/causalbudgetframework-prog

---

## How Coding the Double-Slit Changed Everything

This is the story of a rapid sequence of prototypes to diagnose double-slit behavior. I'll walk through the key pivots: what failed, what surprised me, and how that journey led to a simple cellular-automaton budgeting rule from causality, $C = T + M$. I call the approach the **Causal Budget Framework (CBF)**: "causal" because it centers on causality, "budget" because the core mechanic trades translation for maintenance, and later I introduce an **Event Ledger** (organized as a commit graph) that records when interactions finalize so outcomes stay consistent across observers.

*Note:* The next paper, on Special Relativity, will explain $C = T + M$. This paper provides the lead-up.

> CBF in one line: **budget locally ($C=T+M$), reconcile globally (Event Ledger).**

**Project setup (at a glance)**  
- **Goal:** step through a double-slit CA frame by frame to spot patterns.  
- **Starting point:** pixel-grid CA → recursion loops and diagonal/orthogonal speed asymmetry.  
- **Pivot:** linked, vector-based wavefront points in continuous space with neighbor pointers.  
- **Core constraints:** one hop per tick, anti-recursion, pointer-based neighborhood, gap-fill spawning.  
- **Outcome:** BFS-like propagation, Huygens-style spreading, and a path to $C = T + M$.

### Attempt #1: The Naive Approach (pivot to cellular automaton)

My first approach modeled the wave as an expanding ripple from the source toward the detector. In open space it looked fine. The moment I added slits, everything broke.

Through the slits the field behaved like ray tracing. The wave shot straight ahead in narrow beams. There was no diffraction, no interference, just rays.

That raised my first real question: photons travel at c, so what actually causes the sideways spread at slit edges? What can turn energy ninety degrees at those speeds? Could quantum mechanics be running on local rules similar to a cellular automaton?

This is where I pivoted to a cellular automaton. I had used CA for falling-sand effects in games, and a neighbor-rule system can accomplish this naturally.

**Takeaway:** a global ripple needs a mechanism to diffract.

### Attempt #2: The Recursion Disaster (led to waves as wavefronts)

This is when I tried standard cellular automata. Each pixel was an independent agent that propagated to its neighbors. I called them WaveCells in my code, and the Wave class held an array of WaveCells.

This immediately created recursive feedback loops. Cells would propagate back to where they came from, creating infinite cycles. I added an anti-recursion rule: a cell cannot step back to its immediate previous location, only forward into unexplored territory.

Once this was working, I noticed a side effect: with back-propagation blocked, the update naturally formed **expanding wavefronts**. That raised a bigger idea. Maybe a single photon is not a thick, continuous field, but a **front** or thin shell that carries the actionable information. In electromagnetic terms, do atoms receiving kilometer-scale radio waves need to wait for an entire cycle, or can interaction begin at the front? After researching this, I found I was on the right track.

But I kept hitting a wall with pixel grids. A pixel grid breaks symmetry in a way that effectively violates light-speed. Only four of eight neighbors are equidistant, diagonals are √2 farther, and diagonal propagation becomes faster than orthogonal. I tried different tricks to preserve symmetry, but faking √2 was not how the universe does it.

**Takeaway:** blocking back-propagation forces an expanding front, not a full field.

### Side Note: C = T + M starts to form

It was at this point that I started seeing a connection. In the CA, moving one pixel per tick feels like the speed of light for the double-slit. But the double-slit also works with electrons, and one pixel per tick is not c for them. So maybe they do not step every tick. Maybe they wait a few ticks, then take a one-pixel step.

### Attempt #3: The Linked-Sphere Breakthrough (pivot to vector-based CA)

I started researching how others recreated the double-slit with CA and stumbled onto the perfect rule. The source shocked me. Christiaan Huygens, in 1678, had already described it long before computers.

Then it hit me: CA does not require a pixel grid. I could go vector-based and let cells heal when broken.

I built a "linked-sphere cellular automaton," where wave cells move in continuous space while maintaining pointers to their neighbors. Think of a doubly linked list wrapped around the wavefront perimeter. Each cell moves exactly one unit per tick (its own step size). There are no diagonal speed violations because every wave cell carries its own vector.

From watching the double-slit, it looked like a single photon grows as a ring or shell, starting small when spawned and expanding until it finds collapse.

**Side Note.** I didn’t realize it yet, but this was the start of the **Event Ledger**. The `Wave` object acted as the parent spawn event and every `WaveCell` held a pointer back to it. Collapse was simple. When an interaction wins, invalidate the parent pointer, the children go unreachable, and they auto-delete on the next tick. This became the Event Ledger, a persistent history that records parent–child links for every collapse.

For direction, I attached a "probability bead" to the shell circumference, which I treated as momentum. The wave assigns the highest probability to cells near that bead, fading to nearly zero around the rest of the shell. Rotating direction is just passing the bead along neighbors. 

One problem appeared. As the shell expands, neighbors drift too far apart. I added healing. If two neighbors exceed a spacing threshold, the parent spawns a child between them. This became critical at the slits.

I also lost the strong diffraction I had seen in the pixel CA. To restore it, I added a rule. If a cell loses a neighbor because that neighbor was absorbed, it spawns a replacement ninety degrees to the side of the lost neighbor's direction. I also forbid turning back into where you came from. Without that, new 90° spawns could chain into loops.

**Key features**
- Wave cells exist only on the wavefront, not in the interior.
- Cells maintain pointers to their immediate neighbors on the front.
- When gaps appear, parents spawn children at midpoints to heal spacing.
- When the front hits edges or obstacles, survivors spawn children at right angles to fill the lateral spread.

This naturally produced omnidirectional diffraction at slits. When part of the front is absorbed by a slit edge, the survivors now have missing neighbors. They spawn children perpendicular to motion, and that creates the instant 90° spread observed in real experiments.

**Takeaway:** pointer-linked fronts in continuous space restore symmetry and enable instant 90° spreading at edges, while the parent pointer sets up a simple, global collapse.

### Side Note: C = T + M continued

Now that I was off a grid, steps were no longer tied to pixels. I could think in terms of fractional hops and waits. I parked that thought for later.

### My (Breadth-first search) Observation 

Once I added the diffraction rule and treated waves as growing fronts, the behavior looked BFS-like. The front fans out in parallel, paths compete where they meet, and things “finish” when a valid target wins. Functionally, it behaves like a breadth-first search for propagation, even though it’s not literally running a textbook BFS.

- Wave propagation = pathfinding through space
- Wavefront expansion = exploring many routes in parallel
- Interference = overlapping paths combining or canceling
- Collapse = the search ending at a valid target

Takeaway: diffraction and interference look like a search for collapse.

### Collapse Delay (collapse is buffered)

While testing the double-slit prototypes I kept seeing the same thing. Collapses were held back. It was not first-come, first-served. If it were, getting through both slits would be almost impossible.

I also noticed that for a single particle the first arrivals at the screen show up before the interference does. The interference needs time for the fronts from both paths to overlap and compete. That overlap window looks like a short buffer where multiple candidates exist before one wins.

There appears to be a commit rhythm between “candidate found” and “event finalized.” After that, the wave disappears in one step.

**Takeaway:** collapse is buffered, not instantaneous.

### Side Note

This buffering became a key pillar of the Event Ledger later on. The ledger uses that commit rhythm to keep outcomes consistent across observers.

### The Finger Pattern

I wanted to see the interference pattern in my double-slit CA. First I created a history field that marked where collapses would have taken place between the slits and the detector, then I rendered the amplitude that wave cells carried as they passed each location. That produced the classic interference look.

Something bothered me. When wave cells overlapped they overwrote each other's amplitude. So I tried blending instead of overwriting, and the history smeared into finger-like streaks extending from the slits. I did not think much of it until I later read about near-field behavior on Wikipedia. I was stunned when I saw an image with the same "finger" structure that matched my results.

I have since updated the blending to use phase-coded updates and to combine contributions by the superposition principle (add complex field contributions, then look at intensity).

**Takeaway:** simple CA created a finger pattern for the double-slit interference.

### Particles Cannot Grow (realization)

At this point I was thinking particles grow, or at least photons do, by adding more neighbors to the circumference as they travel. That seemed fine until I started thinking about steering with gravity. I can rotate the probability bead (momentum) along the shell toward a gravity well at the perimeter. But what if something happens **inside** the shell after it has expanded? The bead can rotate, yet the front cannot turn back on itself.

My fix was to stop treating a particle as a shell that keeps expanding and to treat it as a **discrete wavefront** with a set size, big enough to interact with both slits. I recalibrated the vector CA so a single particle breaks at the slits, then heals on the other side. The "growth" you see is the healing process redistributing what is already there, not the particle getting larger.

One side effect: the back of the particle can enter the slits too. In practice it is facing the wrong way, so it does not carry probability to create interference and is ignored.

**Takeaway:** particles do not grow. What looks like growth in the double-slit is healing on a fixed-size front.

### Diffraction is Interference

After I realized particles don't "grow," it clicked that the slit itself reshapes the particle's wave: the aperture creates diffraction, which spreads the momentum directions and, with them, the possible collapse locations. Even with a single slit, I was seeing multiple wave cells arrive at each detector position—one from each possible path through the aperture.

That's when I realized: interference isn't about "two slits colliding." It's about comparing all the different paths, whether they come from one slit or two. The double-slit just gives you two discrete bundles of paths instead of one continuous fan. But the mechanism is the same: the simulation was comparing phases across all those paths and deciding where collapse was most likely.

I didn't understand the full mechanism yet—that would come later when I formalized the Event Ledger and realized this "phase comparison" was actually temporal reconciliation (see the SR blog for how this connects to beat-matching and the Born rule). But even at this stage, it was clear that diffraction and interference were the same phenomenon, not two separate effects.

### What if Planck length is not the resolution (C = T + M continued)

I needed to pick a length to represent one unit of $C$, but Planck is unrealistically small. If a wave cell were 1 Planck long and the size of a grain of sand, an atom would be the size of the Milky Way. So I stopped treating Planck length as a tile size and started using it as decimal precision for position, phase, and timing.

**Why I picked gamma as the integer unit of $C$**

I chose **gamma** as the unit of $C$ because it is the smallest wavelength in scope for this model and it is about one hundred times smaller than an atom. It is also a natural way to count oscillations. Define one **tick** as the time light needs to travel 1 gamma; then $c$ corresponds to **1 gamma per tick**. Since roughly $6.19 \times 10^{22}$ Planck lengths fit inside one gamma (γ ≈ 10⁻¹² m, ℓₚ ≈ 1.616×10⁻³⁵ m), we have over 22 orders of magnitude of decimal precision—more than enough to track phase, position, and timing with extraordinary accuracy.

There are no pixels for vector wave cells, so they do not need to hop from location to location each step. They can move a fraction of a gamma per tick or simply slide continuously.

With this calibration, the resolution is enough to resolve slits, edges, and atoms without treating space like a checkerboard.

**Takeaway:** gamma is the integer yardstick for causality, Planck is the decimal precision for phase and timing.

### In Summary

- Vector-based CA with pointer-linked fronts in continuous space fixes symmetry and produces 90° spreading at edges.
- The dynamics mirror of a breadth-first search: propagation is parallel exploration, interference occurs where paths meet, collapse is the search terminating at a valid target.
- Collapse is buffered.
- Particles are fixed-size fronts; apparent growth is healing.
- Gamma is the yardstick for $C$; Planck is decimal precision for position, phase, and timing. Wave cells slide in continuous space rather than hop on a grid.
- The budget idea $C = T + M$ will be developed in the next paper; here it appears only as the wave's per-tick rule.

**Tagline:** budget locally ($C = T + M$), reconcile globally (Event Ledger).

### Next Steps

This wave-as-search framework was only the beginning. It pushed me to look at physics through a computational lens. If wave mechanics reduces to something BFS-like, then relativity can emerge from a budgeting rule. The next paper explains $C = T + M$ in detail.

The journey from "let me code the double-slit" to a full framework took about three months. What began as the Quantum Automata Experiment (QAE) grew into the **Causal Budget Framework (CBF)**. Each bug exposed a rule I had not seen, and each optimization lined up with a principle of physics I was not aiming for.

What comes next:
- **The CA Wave Formula:** $C = T + M$ as a per-tick budget that recovers Lorentz behavior.
- **Special Relativity:** Observer reconciliation using the Event Ledger.
- **Event Ledger** Global reconciliation layer.
- **General Relativity:** SR pacing and curvature that fall out of the same budget.
- **Maxwell:** how the budget reproduces electromagnetic behavior and standard experiments.
- **Putting It All Together:** unification, predictions, tests, and open problems.

---

*Continue to Dev Blog 2: The CA Wave Formula →*