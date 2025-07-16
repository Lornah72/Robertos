

  document.addEventListener('DOMContentLoaded', function() {
    // 1) Grab our elements
    const btnToggle = document.querySelector('.nav-toggle');
    const menu      = document.querySelector('.nav-links');
    const langSel   = document.querySelector('.lang-select');

    // 2) If both toggle button and menu exist, wire them up
    if (btnToggle && menu) {
      btnToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('open');
      });
    }

    // 3) Prevent the language selector from toggling the menu
    if (langSel) {
      // block pointer events from bubbling up
      ['mousedown','touchstart','click'].forEach(function(evt) {
        langSel.addEventListener(evt, function(e) {
          e.stopPropagation();
        });
      });
    }

    // 4) Click anywhere else closes the menu
    document.addEventListener('click', function(e) {
      if (menu && menu.classList.contains('open')) {
        // if click is not inside menu or toggle button
        if (!menu.contains(e.target) && !(btnToggle && btnToggle.contains(e.target))) {
          menu.classList.remove('open');
        }
      }
    });
  });
