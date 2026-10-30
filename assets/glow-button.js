/* ai-mode-glow · 把鼠标相对按钮的坐标写进 --glow-x / --glow-y */
(function () {
  function bind(el) {
    if (el.__glowBound) return;
    el.__glowBound = true;
    function update(e) {
      var r = el.getBoundingClientRect();
      // ::before 向外扩了 --glow-spread，坐标要补上这段偏移
      var s = parseFloat(getComputedStyle(el).getPropertyValue('--glow-spread')) || 0;
      el.style.setProperty('--glow-x', (e.clientX - r.left + s) + 'px');
      el.style.setProperty('--glow-y', (e.clientY - r.top + s) + 'px');
    }
    el.addEventListener('pointerenter', update);
    el.addEventListener('pointermove', update);
  }
  function init() {
    document.querySelectorAll('.glow-btn, [data-glow]').forEach(bind);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.initGlowButtons = init; // 动态插入元素后可手动再调一次
})();
