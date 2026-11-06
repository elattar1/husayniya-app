/**
 * خدمات الحسينية — محرك تبديل المظهر النهاري والليلي
 * Al-Husayniya Services — Theme Engine (Default: Light Mode ☀️)
 */

(function () {
  'use strict';

  // 1. Get current theme (Default is ALWAYS LIGHT)
  function getTheme() {
    return localStorage.getItem('husayniya_theme') || 'light';
  }

  // 2. Apply theme to <html>
  function applyTheme(theme) {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update all toggle buttons on page
    var buttons = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var isDark = theme === 'dark';
      var icon = btn.querySelector('.theme-icon') || btn.querySelector('#theme-toggle-icon');
      var label = btn.querySelector('.theme-label') || btn.querySelector('#theme-toggle-label');
      
      if (icon) {
        icon.textContent = isDark ? '☀️' : '🌙';
      }
      if (label) {
        label.textContent = isDark ? 'فاتح' : 'ليلي';
      }
      btn.title = isDark ? 'التحويل للمظهر الفاتح (النهاري)' : 'التحويل للمظهر الليلي (الداكن)';
    }
  }

  // 3. Global toggle function
  window.toggleAppTheme = function () {
    var current = getTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('husayniya_theme', next);
    applyTheme(next);
  };

  // Run immediately in head to avoid flash of dark content
  applyTheme(getTheme());

  // 4. Auto-mount toggle button in navbar if not present
  function autoMountThemeButton() {
    applyTheme(getTheme());

    if (document.getElementById('theme-toggle-btn')) {
      return; // Already present in HTML
    }

    // Try finding action container in navbar
    var target = document.querySelector('header .flex.items-center.gap-2, nav .flex.items-center.gap-2, nav .flex.items-center.gap-3, header .flex.items-center.gap-3, nav .flex.items-center:last-child, header .flex.items-center:last-child');
    if (target) {
      var isDark = getTheme() === 'dark';
      var btn = document.createElement('button');
      btn.id = 'theme-toggle-btn';
      btn.type = 'button';
      btn.onclick = window.toggleAppTheme;
      btn.className = 'glass px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition theme-toggle-btn active:scale-95';
      btn.title = isDark ? 'التحويل للمظهر الفاتح (النهاري)' : 'التحويل للمظهر الليلي (الداكن)';
      btn.innerHTML = '<span id="theme-toggle-icon" class="theme-icon">' + (isDark ? '☀️' : '🌙') + '</span>' +
        '<span id="theme-toggle-label" class="theme-label hidden sm:inline">' + (isDark ? 'فاتح' : 'ليلي') + '</span>';
      
      // Insert as first or second action button
      target.insertBefore(btn, target.firstChild);
    }
  }

  // Mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountThemeButton);
  } else {
    autoMountThemeButton();
  }

})();
