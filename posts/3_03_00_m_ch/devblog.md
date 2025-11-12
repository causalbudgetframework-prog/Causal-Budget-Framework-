# How to Compute $M_{\text{ch}}$ (Channel Maintenance Share)

This is the exact recipe used in the paper to compute the **channel maintenance share** $M_{\text{ch}}$ for directional buffering.

---

## 1) Project velocities onto the interaction channel
Let $\hat{\mathbf{k}}$ be the unit vector along the interaction (signal) line. The channel-parallel speeds are
$$
u_1 \,=\, \mathbf{v}_1\!\cdot\!\hat{\mathbf{k}},\qquad
u_2 \,=\, \mathbf{v}_2\!\cdot\!\hat{\mathbf{k}}.
$$
If you parameterize by angles $\theta_i$ to the channel, then $u_i = v_i\cos\theta_i$.

---

## 2) Compute relativistic relative speed along the channel
Use Einstein velocity addition on the **projected** speeds:
$$
 w \,=\, \frac{u_1 - u_2}{1 - \dfrac{u_1 u_2}{c^2}} \;\; (\,|w|<c\,).
$$
Equivalently in dimensionless form with \(\beta_i=u_i/c\):
$$
 \beta_{\rm rel} \,=\, \frac{\beta_1-\beta_2}{1-\beta_1\beta_2}\,,\qquad |\beta_{\rm rel}|<1.
$$

---

## 3) Convert to $M_{\text{ch}}$
Compute the Lorentz factor at \(w\) and invert:
$$
 \gamma(w) \,=\, \frac{1}{\sqrt{1-\dfrac{w^2}{c^2}}} \,,\qquad
 \boxed{\; M_{\text{ch}} \,=\, \frac{1}{\gamma(w)} \,=\, \sqrt{1-\beta_{\rm rel}^{\,2}} \; }.
$$

---

## 4) Use inside the commit-delay rule
The channel factor multiplies the **directional mismatch** term; temporal mismatch $|\Delta f_M|$ is separate:

**Beat-matching form**
$$
 \tau_{\text{commit}} \,=\, \tau_0 \,+\, \frac{1}{\,f_0\big(\;|\Delta f_M|\; +\; M_{\text{ch}}\,(1-\cos\theta)\;\big)}\,.
$$

**Confidence-gating form**
$$
\tau_{\text{commit}} = \tau_0 + 
  \frac{|\Delta f_M| + M_{\text{ch}}(1-\cos\theta)}{f_0}.
$$
with 

$$
|\Delta f_M| = f_0\,|M_1 - M_2|
$$

---

## 5) Sanity check (Train Test 2)
For $v_A=0.9c$ and $v_B=-0.9c$ along the line,
$$
 w \,=\, \frac{0.9c-(-0.9c)}{1-\dfrac{(0.9c)(-0.9c)}{c^2}} \,=\, 0.994475\,c,\qquad
 \gamma(w)\approx 9.5263,\;\; M_{\text{ch}}\approx 0.105\,.
$$
This reproduces the SR relative factor exactly in the commit-delay term. 

