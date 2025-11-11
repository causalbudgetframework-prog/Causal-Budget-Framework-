// Copy buttons for code blocks
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const sel = btn.getAttribute('data-copy');
  const el = document.querySelector(sel);
  if (!el) return;
  const text = el.innerText;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = 'Copy'), 1200);
  } catch {
    btn.textContent = 'Failed';
    setTimeout(() => (btn.textContent = 'Copy'), 1200);
  }
});

// Optional: show a subtle hint if a table is horizontally scrollable
document.querySelectorAll('.table-wrap').forEach(wrap => {
  const overflow = wrap.scrollWidth > wrap.clientWidth + 2;
  if (overflow) {
    const hint = wrap.parentElement.querySelector('.table-hint');
    if (hint) hint.style.opacity = 1;
  }
});

// Ensure all "Run Demo" buttons are bright, not disabled, and point to data-run
document.querySelectorAll('a.btn-run[data-run]').forEach(a => {
  a.setAttribute('href', a.getAttribute('data-run'));
  a.setAttribute('aria-disabled', 'false');
  a.style.opacity = '1';
  a.style.pointerEvents = 'auto';
});
