export function getDataAttr(el, name) {
  return el.getAttribute(`data-apoc-sidebar-${name}`);
}

export const getUID = (() => {
  const cache = [];
  return function generateUID(len = 8) {
    const id = Math.random().toString(35).substr(2, len + 2);
    if (cache.indexOf(id) !== -1) {
      generateUID(len);
      return;
    }
    cache.push(id);
    return id;
  };
})();

export function isChild(parent, el) {
  const result = Array.prototype.slice.call(parent.children)
                   .find(_el => _el === el) || null;
  if (result === null) {
    return false;
  }
  return true;
}
