    // --- Basic smoke tests (debug aid) ---
    window.__tests__ = {};

    // Update year
    document.getElementById('y').textContent = new Date().getFullYear();

    // Measure header height and set offset
    (function() {
      const header = document.querySelector('.site-header');
      function setHeaderOffset(){
        const h = header ? header.offsetHeight : 80;
        document.documentElement.style.setProperty('--header-h', h + 'px');
      }
      window.addEventListener('load', setHeaderOffset);
      window.addEventListener('resize', setHeaderOffset);
      setHeaderOffset();
      window.__tests__.headerOffsetSet = true;
    })();

    // Mobile drawer
    (function(){
      const burger = document.getElementById('burger');
      const drawer = document.getElementById('drawer');
      const closeDrawer = document.getElementById('closeDrawer');
      function openDrawer(){ drawer.hidden = false; requestAnimationFrame(()=>{ drawer.classList.add('open'); }); if(burger) burger.setAttribute('aria-expanded','true'); }
      function hideDrawer(){ drawer.classList.remove('open'); if(burger) burger.setAttribute('aria-expanded','false'); setTimeout(()=>{ drawer.hidden = true; }, 200); }
      burger && burger.addEventListener('click', openDrawer);
      closeDrawer && closeDrawer.addEventListener('click', hideDrawer);
      drawer && drawer.addEventListener('click', (e)=>{ if(e.target === drawer) hideDrawer(); });
      window.__tests__.drawerBound = !!burger;
    })();

    // Sidebar category toggling + deep-link routing
    (function(){
      const catTitles = document.querySelectorAll('.toc .cat-title');
      const itemLinks = Array.from(document.querySelectorAll('.toc .items a'));

      catTitles.forEach(cat => {
        cat.addEventListener('click', () => {
          const catId = cat.dataset.cat;
          const items = document.getElementById('items-' + catId);
          const isActive = cat.classList.contains('active');
          document.querySelectorAll('.toc .cat-title').forEach(c => c.classList.remove('active'));
          document.querySelectorAll('.toc .items').forEach(div => div.style.display = 'none');
          if (!isActive) { cat.classList.add('active'); if (items) items.style.display = 'block'; }
        });
      });

      function showArticleById(id, updateHash = true){
        const article = document.getElementById(id);
        if(!article) return;
        const section = article.closest('section.cat');
        // Hide all sections except containing one
        document.querySelectorAll('section.cat').forEach(sec => {
          const show = (sec === section);
          sec.style.display = show ? '' : 'none';
          if(show){
            sec.querySelectorAll('article.conclusion').forEach(a => {
              const isTarget = (a.id === id);
              a.style.display = isTarget ? '' : 'none';
              const d = a.querySelector('details'); if(d) d.open = isTarget;
            });
          }
        });
        // Sidebar selection states
        itemLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.toc .items a[href="#${id}"]`);
        if(link){ link.classList.add('active'); }
        // Open the correct category
        document.querySelectorAll('.toc .cat-title').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.toc .items').forEach(div => div.style.display = 'none');
        const catId = section.id;
        const catBtn = document.querySelector(`.toc .cat-title[data-cat="${catId}"]`);
        const catItems = document.getElementById('items-' + catId);
        if(catBtn) catBtn.classList.add('active');
        if(catItems) catItems.style.display = 'block';
        // Update hash only when navigating via clicks
        if(updateHash){ history.replaceState(null, '', '#' + id); }
      }

      // Click handlers
      itemLinks.forEach(link => {
        link.addEventListener('click', (e) => { e.preventDefault(); showArticleById(link.getAttribute('href').slice(1)); });
      });

      // Hash routing (first load + subsequent changes)
      function initFromHash(){
        const hasHash = !!location.hash;
        const hash = location.hash.replace('#','');
        if(hasHash && document.getElementById(hash)) {
          showArticleById(hash, false);
        } else {
          showArticleById('first-item', false);
        }
      }
      window.addEventListener('hashchange', initFromHash);
      initFromHash();

      // Minimal tests to verify functions don't throw
      try { showArticleById('first-item', false); window.__tests__.showOk = true; } catch(e){ window.__tests__.showOk = false; console.warn('showArticleById test failed', e); }
      try { showArticleById('does-not-exist', false); window.__tests__.showMissingOk = true; } catch(e){ window.__tests__.showMissingOk = false; console.warn('showArticleById missing ID failed', e); }
    })();