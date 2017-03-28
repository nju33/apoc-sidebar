(() => {
  const s = new ApocSidebar(document.getElementById('sidebar'));
  s.init();

  document.getElementById('trigger').addEventListener('click', () => {
    if (s.isOpen()) {
      s.close();
    } else {
      s.open();
    }
  });
})();
