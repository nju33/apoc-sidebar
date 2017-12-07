(() => {
  [
    'slide',
    'water',
    'push',
    'lid',
    'door',
    'waterfall',
    'waterfallReverse'
  ].forEach(type => {
    const s = new ApocSidebar(document.getElementById(type), {type});
    if (type === 'slide') {
      s.init(true);
    } else {
      s.init();
    }
    document.getElementById(type + '-trigger').addEventListener('click', () => {
      if (s.isOpen()) {
        s.close();
      } else {
        s.open();
      }
    });
  });
})();
