/*!
 * Copyright 2017, nju33
 * Released under the MIT License
 * https://github.com/nju33/apoc-sidebar
 */
var ApocSidebar = (function () {
'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty$3 = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$3, __esModule: true };
});

unwrapExports(defineProperty$1);

var defineProperty = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
});

var _defineProperty = unwrapExports(defineProperty);

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign$1 = _core.Object.assign;

var assign = createCommonjsModule(function (module) {
module.exports = { "default": assign$1, __esModule: true };
});

var _Object$assign = unwrapExports(assign);

var _extends = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

var classCallCheck = createCommonjsModule(function (module, exports) {
exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module, exports) {
exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var defaultOpts = {
  type: 'slide',
  // type: 'water',
  // type: 'push',
  // type: 'lid',
  // type: 'door',
  // type: 'waterfall',
  // type: 'waterfallReverse',
  side: 'left',
  // side: 'right'
  transitionTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  transitionDuration: '.2s',
  wallBackgroundColor: 'rgba(0,0,0,.3)'
};

var ApocSidebar = function () {
  function ApocSidebar() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts;

    _classCallCheck(this, ApocSidebar);

    if (el === null) {
      throw new Error('Required element');
    }
    this.wall = null;
    this.el = el;
    this.opts = _Object$assign({}, defaultOpts, opts);
    if (typeof this.opts.container === 'undefined') {
      this.opts.container = el.parentElement;
    }

    this.handleTransitionendForWall = this.createTransitionendHandlerForWall.bind(this);
    this.handleTransitionendForSidebar = this.createTransitionendHandlerForSidebar.bind(this);
    this.handleTransitionendForOther = this.createTransitionendHandlerForOther.bind(this);
    this.handleClose = this.close.bind(this);

    this.inited = false;
    this.opened = false;
    this.defaultStyle = {};
  }

  _createClass(ApocSidebar, [{
    key: 'createTransitionendHandlerForWall',
    value: function createTransitionendHandlerForWall() {
      _Object$assign(this.wall.style, {
        webkitBackfaceVisibility: '',
        backfaceVisibility: '',
        willChange: ''
      });
    }
  }, {
    key: 'createTransitionendHandlerForOther',
    value: function createTransitionendHandlerForOther() {
      if (this.opts.type === 'lid' && this.isOpen()) {
        _Object$assign(this.el.style, {
          zIndex: 9999
        });
      }
    }
  }, {
    key: 'createTransitionendHandlerForSidebar',
    value: function createTransitionendHandlerForSidebar() {
      if (!this.isOpen()) {
        _Object$assign(this.el.style, {
          webkitBackfaceVisibility: '',
          backfaceVisibility: '',
          willChange: '',
          borderRadius: 0,
          zIndex: -9999
        });
      } else {
        _Object$assign(this.el.style, {
          webkitBackfaceVisibility: '',
          backfaceVisibility: '',
          willChange: '',
          borderRadius: 0,
          zIndex: 9999
        });
      }
    }
  }, {
    key: 'createWall',
    value: function createWall() {
      this.wall = document.createElement('div');
      _Object$assign(this.wall.style, _extends$1({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: this.opts.wallBackgroundColor,
        opacity: 0,
        zIndex: -9998
      }, this.transitionDecls));
      this.wall.className = 'apoc-sidebar-wall';
      document.body.appendChild(this.wall);
      this.wall.addEventListener('click', this.handleClose);
      this.wall.addEventListener('transitionend', this.handleTransitionendForWall);
    }
  }, {
    key: 'init',
    value: function init(isOpen) {
      var _this = this;

      if (typeof isOpen === 'undefined') {
        isOpen = this.el.style.display !== 'none';
      }

      if (this.inited) {
        return;
      }

      this.inited = true;
      this.createWall();
      this.defaultStyle = _Object$assign({}, this.el.style);

      if (this.opts.type === 'push') {
        _Object$assign(document.body.style, {
          webkitTransition: '.2s',
          transition: '.2s'
        });
        document.body.addEventListener('transitionend', this.handleTransitionendForOther);
      } else if (this.opts.type === 'lid') {
        this.siblings.forEach(function (el) {
          _Object$assign(el.style, _this.transitionDecls);
        });
      }

      var styles = [this.el.style];
      styles.push(_defineProperty({
        display: '',
        height: '100%',
        position: 'fixed',
        zIndex: this.initZIndex,
        top: this.initYPosition
      }, this.opts.side, this.initXPosition));

      if (this.opts.type === 'door') {
        styles.push(_extends$1({
          webkitTransformOrigin: this.opts.side + ' top',
          transformOrigin: this.opts.side + ' top'
        }, this.postdoor));
      } else if (this.opts.type === 'waterfall' || this.opts.type === 'waterfallReverse') {
        styles.push(this.postwaterfall);
      }

      _Object$assign.apply(null, styles);

      if (isOpen) {
        this.open();
      }

      this.el.addEventListener('transitionend', this.handleTransitionendForSidebar);

      setTimeout(function () {
        _Object$assign(_this.el.style, _this.transitionDecls);
      }, 0);
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.opened;
    }
  }, {
    key: 'isSlideType',
    value: function isSlideType() {
      return (/^(?:slide|water)$/.test(this.opts.type)
      );
    }
  }, {
    key: 'isWaterType',
    value: function isWaterType() {
      return this.opts.type === 'water';
    }
  }, {
    key: 'isDoorType',
    value: function isDoorType() {
      return this.opts.type === 'door';
    }
  }, {
    key: 'isWaterfallType',
    value: function isWaterfallType() {
      return this.opts.type === 'waterfall';
    }
  }, {
    key: 'isWaterfallReverseType',
    value: function isWaterfallReverseType() {
      return this.opts.type === 'waterfallReverse';
    }
  }, {
    key: 'open',
    value: function open() {
      var _this2 = this;

      if (this.opened) {
        return;
      }

      this.opened = true;

      _Object$assign(this.wall.style, {
        webkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        willChange: 'opacity',
        zIndex: 9998,
        opacity: 1
      });

      if (this.opts.type === 'push') {
        _Object$assign(document.body.style, _extends$1({}, this.preslide));
      } else if (this.opts.type === 'lid') {
        this.siblings.forEach(function (el) {
          _Object$assign(el.style, _extends$1({}, _this2.preslide));
        });
      }

      _Object$assign(this.el.style, _extends$1({
        width: this.defaultStyle.width,
        webkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        willChange: 'transform, border-radius'

      }, this.isSlideType() ? this.preslide : {}, this.isWaterType() ? this.prewater : {}, this.isDoorType() ? this.predoor : {}, this.isWaterfallType() ? this.prewaterfall : {}, this.isWaterfallReverseType() ? this.prewaterfallReverse : {}, {

        zIndex: 9999
      }));
    }
  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      if (!this.opened) {
        return;
      }

      this.opened = false;

      _Object$assign(this.wall.style, {
        webkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        willChange: 'opacity',
        zIndex: -9998,
        opacity: 0
      });

      if (this.opts.type === 'push') {
        _Object$assign(document.body.style, _extends$1({}, this.postslide));
      } else if (this.opts.type === 'lid') {
        this.siblings.forEach(function (el) {
          _Object$assign(el.style, _extends$1({}, _this3.postslide));
        });
      }

      _Object$assign(this.el.style, _extends$1({
        webkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        willChange: 'transform, border-radius',
        zIndex: this.initZIndex

      }, this.isSlideType() ? this.postslide : {}, this.isWaterType() ? this.postwater : {}, this.isDoorType() ? this.postdoor : {}, this.isWaterfallType() ? this.postwaterfall : {}, this.isWaterfallReverseType() ? this.postwaterfall : {}));

      this.opened = false;
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      var _this4 = this;

      if (this.isOpen()) {
        this.close();
      }

      if (!this.inited) {
        return;
      }

      this.inited = false;

      if (this.opts.type === 'push') {
        document.body.removeEventListener('transitionend', this.handleTransitionendForOther);
      } else if (this.opts.type === 'lid') {
        this.siblings.forEach(function (el) {
          el.removeEventListener('transitionend', _this4.handleTransitionendForOther);
        });
      }

      this.el.removeEventListener('transitionend', this.handleTransitionendForWall);
      this.el.removeEventListener('transitionend', this.handleTransitionendForSidebar);

      document.body.removeChild(this.wall);
      this.el.style = this.defaultStyle;
    }
  }, {
    key: 'width',
    get: function get() {
      return getComputedStyle(this.el).width;
    }
  }, {
    key: 'initXPosition',
    get: function get() {
      if (/^(?:lid|door|waterfall|waterfallReverse)$/.test(this.opts.type)) {
        return 0;
      }
      return '-' + this.width;
    }
  }, {
    key: 'initYPosition',
    get: function get() {
      if (this.opts.type === 'waterfall') {
        return '-100%';
      } else if (this.opts.type === 'waterfallReverse') {
        return '100%';
      }
      return 0;
    }
  }, {
    key: 'initZIndex',
    get: function get() {
      if (this.opts.type === 'lid') {
        return -9999;
      }
      return '';
    }
  }, {
    key: 'transitionDecls',
    get: function get() {
      return {
        wabkitTransitionTimingFunction: this.opts.transitionTimingFunction,
        transitionTimingFunction: this.opts.transitionTimingFunction,
        webkitTransitionDuration: this.opts.transitionDuration,
        transitionDuration: this.opts.transitionDuration
      };
    }
  }, {
    key: 'preslide',
    get: function get() {
      var size = this.opts.side === 'left' ? this.width : '-' + this.width;
      return {
        webkitTransform: 'translate3d(' + size + ', 0, 0)',
        transform: 'translate3d(' + size + ', 0, 0)',
        zIndex: 9997
      };
    }
  }, {
    key: 'postslide',
    get: function get() {
      return {
        webkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)'
      };
    }
  }, {
    key: 'prewater',
    get: function get() {
      if (this.opts.side === 'left') {
        return {
          borderTopRightRadius: '40% 80%',
          borderBottomRightRadius: '40% 80%'
        };
      }
      return {
        borderTopLeftRadius: '40% 80%',
        borderBottomLeftRadius: '40% 80%'
      };
    }
  }, {
    key: 'postwater',
    get: function get() {
      if (this.opts.side === 'left') {
        return {
          borderTopRightRadius: '0 80%',
          borderBottomRightRadius: '0 80%'
        };
      }
      return {
        borderTopLeftRadius: '0 80%',
        borderBottomLeftRadius: '0 80%'
      };
    }
  }, {
    key: 'predoor',
    get: function get() {
      return {
        webkitTransform: 'rotateY(0deg)',
        transform: 'rotateY(0deg)'
      };
    }
  }, {
    key: 'postdoor',
    get: function get() {
      return {
        webkitTransform: 'rotateY(90deg)',
        transform: 'rotateY(90deg)'
      };
    }
  }, {
    key: 'prewaterfall',
    get: function get() {
      return {
        borderBottomLeftRadius: '80% 40%',
        borderBottomRightRadius: '80% 40%',
        webkitTransform: 'translate3d(0, 100%, 0)',
        transform: 'rotateY(0, 100%, 0)'
      };
    }
  }, {
    key: 'prewaterfallReverse',
    get: function get() {
      return {
        borderTopLeftRadius: '80% 40%',
        borderTopRightRadius: '80% 40%',
        webkitTransform: 'translate3d(0, -100%, 0)',
        transform: 'rotateY(0, 100%, 0)'
      };
    }
  }, {
    key: 'postwaterfall',
    get: function get() {
      return {
        webkitTransform: 'translate3d(0, 0, 0)',
        transform: 'rotateY(0, 0, 0)'
      };
    }
  }, {
    key: 'siblings',
    get: function get() {
      var siblings = Array.prototype.slice.call(this.opts.container.children).filter(function (el) {
        return el.getAttribute('data-apoc-sidebar-sibling') !== null;
      });
      if (siblings.length === 0) {
        throw new Error('\nIn \'push\' or \'lid\' type,\nRequired [data-apoc-sidebar-sibling] attr to sibling elements');
      }
      return siblings;
    }
  }]);

  return ApocSidebar;
}();

return ApocSidebar;

}());
