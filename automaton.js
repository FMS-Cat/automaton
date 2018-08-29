/*!
  Automaton v2.0.0
  Animation engine with Timeline GUI for creative coding
 
  Copyright (c) 2017-2018 FMS_Cat
  Automaton is distributed under the MIT License
  https://opensource.org/licenses/MIT

  Repository: https://github.com/FMS-Cat/automaton
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Automaton = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":5}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log10"), __esModule: true };
},{"core-js/library/fn/math/log10":6}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/sign"), __esModule: true };
},{"core-js/library/fn/math/sign":7}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":1}],5:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":13,"../../modules/es6.array.from":58,"../../modules/es6.string.iterator":61}],6:[function(require,module,exports){
require('../../modules/es6.math.log10');
module.exports = require('../../modules/_core').Math.log10;

},{"../../modules/_core":13,"../../modules/es6.math.log10":59}],7:[function(require,module,exports){
require('../../modules/es6.math.sign');
module.exports = require('../../modules/_core').Math.sign;

},{"../../modules/_core":13,"../../modules/es6.math.sign":60}],8:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],9:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":29}],10:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
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

},{"./_to-absolute-index":49,"./_to-iobject":51,"./_to-length":52}],11:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":12,"./_wks":56}],12:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],13:[function(require,module,exports){
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],14:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":38,"./_property-desc":43}],15:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
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

},{"./_a-function":8}],16:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],17:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":21}],18:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":22,"./_is-object":29}],19:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],20:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
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
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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
module.exports = $export;

},{"./_core":13,"./_ctx":15,"./_global":22,"./_has":23,"./_hide":24}],21:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],22:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],23:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],24:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":17,"./_object-dp":38,"./_property-desc":43}],25:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":22}],26:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":17,"./_dom-create":18,"./_fails":21}],27:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":12}],28:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":34,"./_wks":56}],29:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],30:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":9}],31:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":24,"./_object-create":37,"./_property-desc":43,"./_set-to-string-tag":45,"./_wks":56}],32:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":20,"./_hide":24,"./_iter-create":31,"./_iterators":34,"./_library":35,"./_object-gpo":40,"./_redefine":44,"./_set-to-string-tag":45,"./_wks":56}],33:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":56}],34:[function(require,module,exports){
module.exports = {};

},{}],35:[function(require,module,exports){
module.exports = true;

},{}],36:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],37:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":9,"./_dom-create":18,"./_enum-bug-keys":19,"./_html":25,"./_object-dps":39,"./_shared-key":46}],38:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":9,"./_descriptors":17,"./_ie8-dom-define":26,"./_to-primitive":54}],39:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":9,"./_descriptors":17,"./_object-dp":38,"./_object-keys":42}],40:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":23,"./_shared-key":46,"./_to-object":53}],41:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":10,"./_has":23,"./_shared-key":46,"./_to-iobject":51}],42:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":19,"./_object-keys-internal":41}],43:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],44:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":24}],45:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":23,"./_object-dp":38,"./_wks":56}],46:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":47,"./_uid":55}],47:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":13,"./_global":22,"./_library":35}],48:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":16,"./_to-integer":50}],49:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":50}],50:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],51:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":16,"./_iobject":27}],52:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":50}],53:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":16}],54:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":29}],55:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],56:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":22,"./_shared":47,"./_uid":55}],57:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":11,"./_core":13,"./_iterators":34,"./_wks":56}],58:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":14,"./_ctx":15,"./_export":20,"./_is-array-iter":28,"./_iter-call":30,"./_iter-detect":33,"./_to-length":52,"./_to-object":53,"./core.get-iterator-method":57}],59:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":20}],60:[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":20,"./_math-sign":36}],61:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":32,"./_string-at":48}],62:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],63:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":62,"timers":63}],64:[function(require,module,exports){
var Vue // late bind
var version
var map = (window.__VUE_HOT_MAP__ = Object.create(null))
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }
  
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cahced together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }
      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)
      instance.$forceUpdate()
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

},{}],65:[function(require,module,exports){
(function (process,global,setImmediate){
/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (process.env.NODE_ENV !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

module.exports = Vue;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)

},{"_process":62,"timers":63}],66:[function(require,module,exports){
var inserted = exports.cache = {}

function noop () {}

exports.insert = function (css) {
  if (inserted[css]) return noop
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return function () {
    document.getElementsByTagName('head')[0].removeChild(elem)
    inserted[css] = false
  }
}

},{}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value, message) {
  if (value) {
    return true;
  } else {
    throw new Error(message);
  }
};

},{}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * **Usually you don't need to know about this class.**
 * Class that deals with time.
 * This is "frame" type clock, the frame increases every update call.
 * @extends Clock
 * @param {Automaton} _automaton Parent automaton object
 * @param {number} _fps Frames per second
 */
var ClockFrame = function (_Clock) {
  _inherits(ClockFrame, _Clock);

  function ClockFrame(_automaton, _fps) {
    _classCallCheck(this, ClockFrame);

    var _this = _possibleConstructorReturn(this, (ClockFrame.__proto__ || Object.getPrototypeOf(ClockFrame)).call(this, _automaton));

    _this.frame = 0.0;
    _this.fps = _fps;
    return _this;
  }

  /**
   * Update the clock. It will increase the frame by 1.
   * @returns {void} void
   */


  _createClass(ClockFrame, [{
    key: 'update',
    value: function update() {
      if (this.isPlaying) {
        this.time = this.frame / this.fps;
        this.deltaTime = 1.0 / this.fps;
        this.frame++;
      } else {
        this.deltaTime = 0.0;
      }
    }
  }]);

  return ClockFrame;
}(_clock2.default);

exports.default = ClockFrame;

},{"./clock":70}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * **Usually you don't need to know about this class.**
 * Class that deals with time.
 * This is "realtime" type clock, the time goes on as real world.
 * @extends Clock
 * @param {Automaton} _automaton Parent automaton object
 */
var ClockRealtime = function (_Clock) {
  _inherits(ClockRealtime, _Clock);

  function ClockRealtime(_automaton) {
    _classCallCheck(this, ClockRealtime);

    var _this = _possibleConstructorReturn(this, (ClockRealtime.__proto__ || Object.getPrototypeOf(ClockRealtime)).call(this, _automaton));

    _this.realtime = true;
    _this.rtTime = 0.0;
    _this.rtDate = +new Date();
    return _this;
  }

  /**
   * Update the clock. Time is calculated based on time in real world.
   * @returns {void} void
   */


  _createClass(ClockRealtime, [{
    key: 'update',
    value: function update() {
      if (this.isPlaying) {
        var prevTime = this.time;
        var now = Date.now();
        var deltaDate = now - this.rtDate;
        this.time = this.rtTime + deltaDate / 1000.0;
        this.deltaTime = this.time - prevTime;
      } else {
        this.rtTime = this.time;
        this.rtDate = +new Date();
        this.deltaTime = 0.0;
      }
    }

    /**
     * Set the time manually.
     * @param {number} _time Time
     * @returns {void} void
     */

  }, {
    key: 'setTime',
    value: function setTime(_time) {
      this.time = _time;
      this.rtTime = this.time;
      this.rtDate = +new Date();
    }
  }]);

  return ClockRealtime;
}(_clock2.default);

exports.default = ClockRealtime;

},{"./clock":70}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * **Usually you don't need to know about this class.**
 * Class that deals with time.
 * In this base class, you need to set time manually from `Automaton.update()`.
 * Best for sync with external clock stuff.
 * @param {Automaton} _automaton Parent automaton object
 */
var Clock = function () {
  function Clock(_automaton) {
    _classCallCheck(this, Clock);

    this.automaton = _automaton;

    this.time = 0.0;
    this.deltaTime = 0.0;
    this.isPlaying = true;
  }

  /**
   * Update the clock.
   * @param {number} _time Time. You need to set manually
   * @returns {void} void
   */


  _createClass(Clock, [{
    key: "update",
    value: function update(_time) {
      var prevTime = this.time;
      this.time = _time;
      this.deltaTime = this.time - prevTime;
    }

    /**
     * Start the clock.
     * @returns {void} void
     */

  }, {
    key: "play",
    value: function play() {
      this.isPlaying = true;
    }

    /**
     * Stop the clock.
     * @returns {void} void
     */

  }, {
    key: "pause",
    value: function pause() {
      this.isPlaying = false;
    }

    /**
     * Set the time manually.
     * @param {number} _time Time
     * @returns {void} void
     */

  }, {
    key: "setTime",
    value: function setTime(_time) {
      this.time = _time;
    }
  }]);

  return Clock;
}();

exports.default = Clock;

},{}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _paramGui = require('./param-gui');

var _paramGui2 = _interopRequireDefault(_paramGui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultData = {
  v: "2.0.0",

  length: 1.0,
  resolution: 1000.0,
  params: {},

  guiSettings: {
    snapActive: false,
    snapTime: 0.1,
    snapValue: 0.1
  }
};

var compat = function compat(_data) {
  if (!_data) {
    return Object.assign({}, defaultData);
  }

  var data = void 0;
  if ((typeof _data === 'undefined' ? 'undefined' : _typeof(_data)) === 'object') {
    data = _data;
  } else if (typeof _data === 'string') {
    try {
      data = JSON.parse(_data);
    } catch (e) {
      console.error('Loaded data is invalid');
      return Object.assign({}, defaultData);
    }
  } else {
    console.error('Loaded data is invalid');
    return Object.assign({}, defaultData);
  }

  var v = parseFloat(data.v);

  if (!v && !data.rev) {
    if (data.gui) {
      // "Shift" version of automaton, has incompatible gui params
      delete data.gui;
      data.gui = Object.assign({}, defaultData.gui);
    } else {
      // wtf is this
      console.error('Loaded data is not compatible with this revision');
      return Object.assign({}, defaultData);
    }
  }

  if (data.rev) {
    // fuck
    v = 1.0;
    delete data.rev;
  }

  if (v < 2.0) {
    var _loop = function _loop(name) {
      var oldParam = data.params[name];
      var newParam = {
        nodes: oldParam.map(function (node, i) {
          return {
            time: node.time,
            value: node.value,
            in: i === 0 ? undefined : { time: 0.0, value: 0.0 },
            out: i === oldParam.length - 1 ? undefined : { time: 0.0, value: 0.0 }
          };
        }),
        fxs: []
      };

      var head = 0;
      for (var i = 1; i < oldParam.length; i++) {
        head++;

        if (oldParam[i].mode === 0) {
          // hold
          newParam.nodes.splice(head, 0, {
            time: oldParam[i].time,
            value: oldParam[i - 1].value,
            in: { time: 0.0, value: 0.0 },
            out: { time: 0.0, value: 0.0 }
          });
          head++;
        } else if (oldParam[i].mode === 1) {// linear
          // do nothing
        } else if (oldParam[i].mode === 2) {
          // cosine
          var l = newParam.nodes[head].time - newParam.nodes[head - 1].time;
          newParam.nodes[head - 1].out = { time: l * 0.37, value: 0.0 };
          newParam.nodes[head].in = { time: -l * 0.37, value: 0.0 };
        } else {
          newParam.nodes.splice(head, 0, {
            time: oldParam[i - 1].time,
            value: oldParam[i].value,
            in: { time: 0.0, value: 0.0 },
            out: { time: 0.0, value: 0.0 }
          });
          head++;

          if (oldParam[i].mode === 3) {
            // exp
            newParam.fxs.push({
              name: 'Exponential Smoothing',
              bypass: false,
              row: 0,
              time: oldParam[i - 1].time - 1.0 / data.resolution, // 🔥
              length: oldParam[i].time - oldParam[i - 1].time,
              params: {
                factor: oldParam[i].params.factor,
                preserve: true
              }
            });
          } else if (oldParam[i].mode === 4) {
            // spring
            newParam.fxs.push({
              name: 'Critically Damped Spring',
              bypass: false,
              row: 0,
              time: oldParam[i - 1].time - 1.0 / data.resolution, // 🔥
              length: oldParam[i].time - oldParam[i - 1].time,
              params: {
                factor: oldParam[i].params.rate,
                ratio: oldParam[i].params.damp,
                preserve: true
              }
            });
          } else if (oldParam[i].mode === 5) {
            // gravity
            newParam.fxs.push({
              name: 'Gravity',
              bypass: false,
              row: 0,
              time: oldParam[i - 1].time - 1.0 / data.resolution, // 🔥
              length: oldParam[i].time - oldParam[i - 1].time,
              params: {
                a: oldParam[i].params.gravity,
                e: oldParam[i].params.bounce,
                preserve: true
              }
            });
          }
        }

        if (oldParam[i].mods[1]) {
          newParam.fxs.push({
            name: 'Sinewave',
            bypass: false,
            row: 1,
            time: oldParam[i - 1].time,
            length: oldParam[i].time - oldParam[i - 1].time,
            params: {
              freq: oldParam[i].mods[1].freq,
              amp: oldParam[i].mods[1].amp,
              phase: oldParam[i].mods[1].phase
            }
          });
        }

        if (oldParam[i].mods[2]) {
          newParam.fxs.push({
            name: 'Fractal Noise',
            bypass: false,
            row: 2,
            time: oldParam[i - 1].time,
            length: oldParam[i].time - oldParam[i - 1].time,
            params: {
              amp: oldParam[i].mods[2].amp,
              recursion: oldParam[i].mods[2].recursion,
              freq: oldParam[i].mods[2].freq,
              reso: oldParam[i].mods[2].reso,
              seed: oldParam[i].mods[2].seed
            }
          });
        }

        if (oldParam[i].mods[3]) {
          newParam.fxs.push({
            name: 'Lo-Fi',
            bypass: false,
            row: 3,
            time: oldParam[i - 1].time,
            length: oldParam[i].time - oldParam[i - 1].time,
            params: {
              resolution: oldParam[i].mods[3].freq,
              relative: true
            }
          });
        }
      }
      data.params[name] = newParam;
    };

    // v1, modes and modifiers, CURSED
    for (var name in data.params) {
      _loop(name);
    }

    data.guiSettings = {
      snapActive: false,
      snapTime: 0.1,
      snapValue: 0.1
    };
  }

  data.v = "2.0.0";
  return data;
};

exports.default = compat;

},{"./param-gui":100}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ref: https://github.com/gre/bezier-easing/blob/master/src/index.js

var NEWTON_ITER = 4;
var NEWTON_EPSILON = 0.001;
var SUBDIV_ITER = 10;
var SUBDIV_EPSILON = 0.000001;
var TABLE_SIZE = 21;

var tab = [];

var A = function A(a1, a2) {
  return 1.0 - 3.0 * a2 + 3.0 * a1;
};
var B = function B(a1, a2) {
  return 3.0 * a2 - 6.0 * a1;
};
var C = function C(a1) {
  return 3.0 * a1;
};

var saturate = function saturate(x) {
  return Math.min(Math.max(x, 0.0), 1.0);
};

var calc = function calc(t, a1, a2) {
  return ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
};

var delta = function delta(t, a1, a2) {
  return 3.0 * A(a1, a2) * t * t + 2.0 * B(a1, a2) * t + C(a1);
};

var subdiv = function subdiv(x, a, b, x1, x2) {
  var cx = 0;
  var ct = 0;

  for (var i = 0; i < SUBDIV_ITER; i++) {
    ct = a + (b - a) / 2.0;
    cx = calc(ct, x1, x2) - x;
    0.0 < cx ? b = ct : a = ct;
    if (SUBDIV_EPSILON < Math.abs(cx)) {
      break;
    }
  }

  return ct;
};

var newton = function newton(x, gt, x1, x2) {
  for (var i = 0; i < NEWTON_ITER; i++) {
    var d = delta(gt, x1, x2);
    if (d === 0.0) {
      return gt;
    }
    var cx = calc(gt, x1, x2) - x;
    gt = gt - cx / d;
  }

  return gt;
};

var rawCubicBezier = function rawCubicBezier(x1, y1, x2, y2, x) {
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    return x;
  } // heh
  if (x1 === y1 && x2 === y2) {
    return x;
  } // linear
  if (x <= 0.0) {
    return 0.0;
  }
  if (1.0 <= x) {
    return 1.0;
  }

  x1 = saturate(x1);
  x2 = saturate(x2);

  for (var i = 0; i < TABLE_SIZE; i++) {
    tab[i] = calc(i / (TABLE_SIZE - 1.0), x1, x2);
  }

  var sample = 1;
  for (var _i = 1; _i < TABLE_SIZE; _i++) {
    sample = _i - 1;
    if (x < tab[_i]) {
      break;
    }
  }

  var dist = (x - tab[sample]) / (tab[sample + 1] - tab[sample]);
  var t = (sample + dist) / (TABLE_SIZE - 1);
  var d = delta(t, x1, x2);
  if (NEWTON_EPSILON <= d) {
    t = newton(x, t, x1, x2);
  } else if (d !== 0.0) {
    t = subdiv(x, sample / (TABLE_SIZE - 1), (sample + 1.0) / (TABLE_SIZE - 1), x1, x2);
  }

  return calc(t, y1, y2);
};

var cubicBezier = function cubicBezier(node0, node1, time) {
  var tL = node1.time - node0.time;
  var vL = node1.value - node0.value;
  var x1 = node0.out.time / tL;
  var y1 = node0.out.value / vL;
  var x2 = (node1.time + node1.in.time - node0.time) / tL;
  var y2 = (node1.value + node1.in.value - node0.value) / vL;
  var x = (time - node0.time) / tL;
  return node0.value + rawCubicBezier(x1, y1, x2, y2, x) * vL;
};

exports.default = cubicBezier;

},{}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [require('./fxs/add').default, require('./fxs/cds').default, require('./fxs/clamp').default, require('./fxs/exp').default, require('./fxs/gravity').default, require('./fxs/lofi').default, require('./fxs/noise').default, require('./fxs/pow').default, require('./fxs/sine').default];

},{"./fxs/add":74,"./fxs/cds":75,"./fxs/clamp":76,"./fxs/exp":77,"./fxs/gravity":78,"./fxs/lofi":79,"./fxs/noise":81,"./fxs/pow":82,"./fxs/sine":83}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['add', {
  name: 'Add',
  description: 'The simplest fx ever. Just add a constant value to the curve.',
  params: {
    value: { name: 'Value', type: 'float', default: 1.0 }
  },
  func: function func(context) {
    return context.v + context.params.value;
  }
}];

},{}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['cds', {
  name: 'Critically Damped Spring',
  description: 'Basically the best smoothing method. Shoutouts to Keijiro Takahashi',
  params: {
    factor: { name: 'Factor', type: 'float', default: 100.0, min: 0.0 },
    ratio: { name: 'Damp Ratio', type: 'float', default: 1.0 },
    preserve: { name: 'Preserve Velocity', type: 'boolean', default: false }
  },
  func: function func(context) {
    var dt = context.dt;
    var v = context.v;
    var k = context.params.factor;

    if (context.init) {
      context.pos = context.v;
      if (context.params.preserve) {
        var dv = v - context.getValue(context.t - dt);
        context.vel = dv / dt;
      } else {
        context.vel = 0.0;
      }
    }

    context.vel += (-k * (context.pos - v) - 2.0 * context.vel * Math.sqrt(k) * context.params.ratio) * dt;
    context.pos += context.vel * dt;
    return context.pos;
  }
}];

},{}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clamp = function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b);
};

var smin = function smin(a, b, k) {
  var h = Math.max(k - Math.abs(a - b), 0.0);
  return Math.min(a, b) - h * h * h / (6.0 * k * k);
};

exports.default = ['clamp', {
  name: 'Clamp',
  description: 'Constrain the curve between two values, featuring smooth minimum.',
  params: {
    min: { name: 'Min', type: 'float', default: 0.0 },
    max: { name: 'Max', type: 'float', default: 1.0 },
    smooth: { name: 'Smooth', type: 'float', default: 0.0, min: 0.0 }
  },
  func: function func(context) {
    if (context.params.smooth === 0.0) {
      return clamp(context.v, context.params.min, context.params.max);
    }

    var v = -smin(-context.params.min, -context.v, context.params.smooth);
    return smin(context.params.max, v, context.params.smooth);
  }
}];

},{}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['exp', {
  name: 'Exponential Smoothing',
  description: 'Smooth the curve. Simple but good.',
  params: {
    factor: { name: 'Factor', type: 'float', default: 10.0, min: 0.0 }
  },
  func: function func(context) {
    var v = context.v;

    if (context.init) {
      context.pos = v;
    }

    var k = Math.exp(-context.dt * context.params.factor);
    context.pos = context.pos * k + v * (1.0 - k);
    return context.pos;
  }
}];

},{}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['gravity', {
  name: 'Gravity',
  description: 'Accelerate and bounce the curve.',
  params: {
    a: { name: 'Acceleration', type: 'float', default: 9.8 },
    e: { name: 'Restitution', type: 'float', default: 0.5, min: 0.0 },
    preserve: { name: 'Preserve Velocity', type: 'boolean', default: false }
  },
  func: function func(context) {
    var dt = context.dt;
    var v = context.v;

    if (context.init) {
      context.pos = v;
      if (context.params.preserve) {
        var dv = v - context.getValue(context.t - dt);
        context.vel = dv / dt;
      } else {
        context.vel = 0.0;
      }
    }

    var a = Math.sign(v - context.pos) * context.params.a;
    context.vel += a * dt;
    context.pos += context.vel * dt;

    if (Math.sign(a) !== Math.sign(v - context.pos)) {
      context.vel *= -context.params.e;
      context.pos = v + context.params.e * (v - context.pos);
    }

    return context.pos;
  }
}];

},{}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['lofi', {
  name: 'Lo-Fi',
  description: 'Make curve more crunchy.',
  params: {
    rate: { name: 'Frame Rate', type: 'float', default: 10.0, min: 0.0, max: 1000.0 },
    relative: { name: 'Relative', type: 'boolean', default: false },
    reso: { name: 'Reso Per Unit', type: 'float', default: 0.1, min: 0.0, max: 1000.0 },
    round: { name: 'Round', type: 'boolean', default: false }
  },
  func: function func(context) {
    var t = void 0;
    if (context.params.rate === 0.0) {
      t = context.t;
    } else if (context.params.relative) {
      t = context.t0 + Math.floor((context.t - context.t0) * context.params.rate) / context.params.rate;
    } else {
      t = Math.floor(context.t * context.params.rate) / context.params.rate;
    }

    var v = context.getValue(t);
    if (context.params.reso !== 0.0) {
      v = Math.floor(v * context.params.reso + (context.params.round ? 0.5 : 0.0)) / context.params.reso;
    }
    return v;
  }
}];

},{}],80:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Xorshift = function () {
  function Xorshift(_seed) {
    _classCallCheck(this, Xorshift);

    this.set(_seed);
  }

  _createClass(Xorshift, [{
    key: "gen",
    value: function gen(_seed) {
      if (_seed) {
        this.set(_seed);
      }
      this.seed = this.seed ^ this.seed << 13;
      this.seed = this.seed ^ this.seed >>> 17;
      this.seed = this.seed ^ this.seed << 5;
      return this.seed / Math.pow(2, 32) + 0.5;
    }
  }, {
    key: "set",
    value: function set(_seed) {
      this.seed = _seed || this.seed || 1;
    }
  }]);

  return Xorshift;
}();

module.exports = Xorshift;

},{}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xorshift = require('./modules/xorshift');

var _xorshift2 = _interopRequireDefault(_xorshift);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xorshift = new _xorshift2.default();

var smoothstep = function smoothstep(_a, _b, _k) {
  var smooth = _k * _k * (3.0 - 2.0 * _k);
  return _a + (_b - _a) * smooth;
};

exports.default = ['noise', {
  name: 'Fractal Noise',
  description: 'wiggle()',
  params: {
    recursion: { name: 'Recursion', type: 'int', default: 4, min: 1, max: 99 },
    freq: { name: 'Frequency', type: 'float', default: 1.0, min: 0.0 },
    reso: { name: 'Resolution', type: 'float', default: 8.0, min: 1.0 },
    seed: { name: 'Seed', type: 'int', default: 1, min: 0 },
    amp: { name: 'Amp', type: 'float', default: 0.2 }
  },
  func: function func(context) {
    if (context.init) {
      xorshift.gen(context.params.seed);

      context.table = new Float32Array(Math.floor(context.params.reso) + 2);
      for (var i = 1; i < context.params.reso; i++) {
        context.table[i] = xorshift.gen() * 2.0 - 1.0;
      }
    }

    var v = context.v;
    var p = context.progress;

    for (var _i = 0; _i < context.params.recursion; _i++) {
      var index = p * context.params.freq * context.params.reso * Math.pow(2.0, _i) % context.params.reso;
      var indexi = Math.floor(index);
      var indexf = index - indexi;
      var factor = Math.pow(0.5, _i + 1.0);

      v += context.params.amp * factor * smoothstep(context.table[indexi], context.table[indexi + 1], indexf);
    }
    return v;
  }
}];

},{"./modules/xorshift":80}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['pow', {
  name: 'Power',
  description: 'You got boost power!',
  params: {
    pow: { name: 'Power', type: 'float', default: 2.0 },
    bias: { name: 'Bias', type: 'float', default: 0.0 },
    positive: { name: 'Force Positive', type: 'boolean', default: false }
  },
  func: function func(context) {
    var v = context.v - context.params.bias;
    var sign = context.params.positive ? 1.0 : Math.sign(v);
    return Math.pow(Math.abs(v), context.params.pow) * sign + context.params.bias;
  }
}];

},{}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TAU = Math.PI * 2.0;

exports.default = ['sine', {
  name: 'Sinewave',
  description: 'Overlay a sinewave to the curve.',
  params: {
    amp: { name: 'Amp', type: 'float', default: 0.1 },
    freq: { name: 'Frequency', type: 'float', default: 5.0 },
    phase: { name: 'Phase', type: 'float', default: 0.0, min: 0.0, max: 1.0 }
  },
  func: function func(context) {
    var v = context.v;
    var p = context.progress * context.params.freq + context.params.phase;
    return v + context.params.amp * Math.sin(p * TAU);
  }
}];

},{}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var ret = '';
  for (var i = 0; i < 16; i++) {
    ret += Math.floor(16.0 * Math.random()).toString(16);
  }
  return ret;
};

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasOverwrap = function hasOverwrap(t1, l1, t2, l2) {
  if (l2 < l1) {
    return hasOverwrap(t2, l2, t1, l1);
  }
  return t2 < t1 && t1 < t2 + l2 || t2 < t1 + l1 && t1 + l1 < t2 + l2;
};

exports.default = hasOverwrap;

},{}],86:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E %3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E %3Csvg width='100%25' height='100%25' viewBox='0 0 128 128' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd%3Bclip-rule:evenodd%3Bstroke-linejoin:round%3Bstroke-miterlimit:1.41421%3B'%3E     %3Cpath d='M64%2C55.537L105.023%2C14.513L113.487%2C22.977L72.463%2C64L113.487%2C105.023L105.023%2C113.487L64%2C72.463L22.977%2C113.487L14.513%2C105.023L55.537%2C64L14.513%2C22.977L22.977%2C14.513L64%2C55.537Z' style='fill:rgb(201%2C226%2C255)%3B'/%3E %3C/svg%3E"
},{}],87:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E %3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E %3Csvg width='100%25' height='100%25' viewBox='0 0 64 64' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd%3Bclip-rule:evenodd%3Bstroke-linejoin:round%3Bstroke-miterlimit:1.41421%3B'%3E     %3Cg id='a' transform='matrix(1.10297%2C0%2C0%2C1.10297%2C-22.0454%2C-38.5886)'%3E         %3Cpath d='M44.397%2C47.274C42.928%2C45.991 42%2C44.104 42%2C42L42%2C41.998C42%2C38.133 45.133%2C35 48.998%2C35L49.002%2C35C52.867%2C35 56%2C38.133 56%2C41.998L56%2C42C56%2C44.113 55.063%2C46.008 53.583%2C47.292L68.047%2C79.064C68.358%2C79.022 68.676%2C79 68.998%2C79L69.002%2C79C72.867%2C79 76%2C82.133 76%2C85.998L76%2C86C76%2C89.866 72.866%2C93 69%2C93L69%2C93C65.134%2C93 62%2C89.866 62%2C86L62%2C85.998C62%2C83.891 62.931%2C82.001 64.405%2C80.718L49.937%2C48.938C49.631%2C48.979 49.318%2C49 49%2C49L49%2C49C48.673%2C49 48.351%2C48.978 48.036%2C48.934L33.591%2C80.715C35.067%2C81.998 36%2C83.889 36%2C85.998L36%2C86C36%2C89.866 32.866%2C93 29%2C93L29%2C93C25.134%2C93 22%2C89.866 22%2C86L22%2C85.998C22%2C82.133 25.133%2C79 28.998%2C79L29.002%2C79C29.323%2C79 29.639%2C79.022 29.948%2C79.064L44.397%2C47.274ZM29%2C89C30.657%2C89 32%2C87.657 32%2C86L32%2C86C32%2C84.343 30.657%2C83 29%2C83L29%2C83C27.343%2C83 26%2C84.343 26%2C86L26%2C86C26%2C87.657 27.343%2C89 29%2C89L29%2C89ZM69%2C89C70.657%2C89 72%2C87.657 72%2C86L72%2C86C72%2C84.343 70.657%2C83 69%2C83L69%2C83C67.343%2C83 66%2C84.343 66%2C86L66%2C86C66%2C87.657 67.343%2C89 69%2C89L69%2C89ZM49%2C45C50.657%2C45 52%2C43.657 52%2C42L52%2C42C52%2C40.343 50.657%2C39 49%2C39L49%2C39C47.343%2C39 46%2C40.343 46%2C42L46%2C42C46%2C43.657 47.343%2C45 49%2C45L49%2C45Z' style='fill:rgb(201%2C226%2C255)%3B'/%3E     %3C/g%3E %3C/svg%3E"
},{}],88:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E %3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E %3Csvg width='100%25' height='100%25' viewBox='0 0 720 64' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd%3Bclip-rule:evenodd%3Bstroke-linejoin:round%3Bstroke-miterlimit:1.41421%3B'%3E     %3Cg transform='matrix(1.10297%2C0%2C0%2C1.10297%2C78.1502%2C-38.5886)'%3E         %3Cg id='a' transform='matrix(1%2C0%2C0%2C1%2C-92.3303%2C0)'%3E             %3Cpath d='M44.397%2C47.274C42.928%2C45.991 42%2C44.104 42%2C42L42%2C41.998C42%2C38.133 45.133%2C35 48.998%2C35L49.002%2C35C52.867%2C35 56%2C38.133 56%2C41.998L56%2C42C56%2C44.113 55.063%2C46.008 53.583%2C47.292L68.047%2C79.064C68.358%2C79.022 68.676%2C79 68.998%2C79L69.002%2C79C72.867%2C79 76%2C82.133 76%2C85.998L76%2C86C76%2C89.866 72.866%2C93 69%2C93L69%2C93C65.134%2C93 62%2C89.866 62%2C86L62%2C85.998C62%2C83.891 62.931%2C82.001 64.405%2C80.718L49.937%2C48.938C49.631%2C48.979 49.318%2C49 49%2C49L49%2C49C48.673%2C49 48.351%2C48.978 48.036%2C48.934L33.591%2C80.715C35.067%2C81.998 36%2C83.889 36%2C85.998L36%2C86C36%2C89.866 32.866%2C93 29%2C93L29%2C93C25.134%2C93 22%2C89.866 22%2C86L22%2C85.998C22%2C82.133 25.133%2C79 28.998%2C79L29.002%2C79C29.323%2C79 29.639%2C79.022 29.948%2C79.064L44.397%2C47.274ZM29%2C89C30.657%2C89 32%2C87.657 32%2C86L32%2C86C32%2C84.343 30.657%2C83 29%2C83L29%2C83C27.343%2C83 26%2C84.343 26%2C86L26%2C86C26%2C87.657 27.343%2C89 29%2C89L29%2C89ZM69%2C89C70.657%2C89 72%2C87.657 72%2C86L72%2C86C72%2C84.343 70.657%2C83 69%2C83L69%2C83C67.343%2C83 66%2C84.343 66%2C86L66%2C86C66%2C87.657 67.343%2C89 69%2C89L69%2C89ZM49%2C45C50.657%2C45 52%2C43.657 52%2C42L52%2C42C52%2C40.343 50.657%2C39 49%2C39L49%2C39C47.343%2C39 46%2C40.343 46%2C42L46%2C42C46%2C43.657 47.343%2C45 49%2C45L49%2C45Z' style='fill:rgb(201%2C226%2C255)%3B'/%3E         %3C/g%3E         %3Cg id='u' transform='matrix(1%2C0%2C0%2C1%2C-69.252%2C0)'%3E             %3Cpath d='M78%2C35L82%2C35L82%2C73C82%2C81.836 89.154%2C89 98%2C89C106.827%2C89 114%2C81.712 114%2C73L114%2C34.975L118%2C35L118%2C73C118%2C84.046 109%2C93 97.99%2C93C86.945%2C93 78%2C84.046 78%2C73L78%2C35Z' style='fill:rgb(201%2C226%2C255)%3B'/%3E         %3C/g%3E         %3Cg id='t' transform='matrix(1%2C0%2C0%2C1%2C-46.171%2C0)'%3E             %3Cpath d='M125%2C35L167%2C35L167%2C39.032L148%2C39.032L148%2C93L144%2C93L144%2C39.032L125%2C39.032L125%2C35Z' style='fill:rgb(201%2C226%2C255)%3Bfill-rule:nonzero%3B'/%3E         %3C/g%3E         %3Cg id='o' transform='matrix(1%2C0%2C0%2C1%2C-23.1034%2C0)'%3E             %3Cpath d='M228%2C63.986C228%2C56.298 224.946%2C48.926 219.51%2C43.49C214.074%2C38.054 206.702%2C35 199.014%2C35C199.005%2C35 199%2C35 199%2C35C199%2C35 199%2C35 198.999%2C35C191.31%2C34.993 183.934%2C38.043 178.495%2C43.477C173.056%2C48.912 170%2C56.285 170%2C63.974L170%2C64C170%2C71.691 173.055%2C79.068 178.494%2C84.506C183.932%2C89.945 191.309%2C93 199%2C93L199%2C93C206.691%2C93 214.068%2C89.945 219.506%2C84.506C224.945%2C79.068 228%2C71.691 228%2C64C228%2C63.992 228%2C63.987 228%2C63.987C228%2C63.987 228%2C63.987 228%2C63.986ZM223.977%2C63.986C223.977%2C50.198 212.8%2C39.022 199.013%2C39.022C199.004%2C39.022 199%2C39.022 199%2C39.022C199%2C39.022 199%2C39.022 198.999%2C39.022C192.377%2C39.016 186.024%2C41.642 181.34%2C46.323C176.655%2C51.003 174.023%2C57.354 174.023%2C63.976L174.023%2C63.999C174.023%2C70.623 176.655%2C76.976 181.339%2C81.66C186.023%2C86.343 192.375%2C88.975 198.999%2C88.975L199.001%2C88.975C205.625%2C88.975 211.977%2C86.343 216.661%2C81.66C221.345%2C76.976 223.977%2C70.623 223.977%2C63.999C223.977%2C63.991 223.977%2C63.987 223.977%2C63.987C223.977%2C63.987 223.977%2C63.987 223.977%2C63.986Z' style='fill:rgb(201%2C226%2C255)%3B'/%3E         %3C/g%3E         %3Cpath id='m' d='M285%2C93L281%2C93L281%2C42.284L261.606%2C72.99L258.402%2C73.005L239%2C42.324L239%2C93L235%2C93L235%2C35L239.102%2C35L259.998%2C68.045L280.869%2C35L285%2C35C285%2C54.333 285%2C73.667 285%2C93Z' style='fill:rgb(201%2C226%2C255)%3Bfill-rule:nonzero%3B'/%3E         %3Cg id='a2' transform='matrix(1%2C0%2C0%2C1%2C20.0558%2C32)'%3E             %3Cpath d='M346.8%2C61L342.445%2C61L335.557%2C45L308.865%2C45L310.587%2C41L333.835%2C41L320.017%2C8.899L297.622%2C61L293.268%2C61L318.198%2C3L321.832%2C3L346.8%2C61Z' style='fill:rgb(201%2C226%2C255)%3B'/%3E         %3C/g%3E         %3Cg id='t2' transform='matrix(1%2C0%2C0%2C1%2C259.187%2C0)'%3E             %3Cpath d='M125%2C35L167%2C35L167%2C39.032L148%2C39.032L148%2C93L144%2C93L144%2C39.032L125%2C39.032L125%2C35Z' style='fill:rgb(201%2C226%2C255)%3Bfill-rule:nonzero%3B'/%3E         %3C/g%3E         %3Cg id='o2' transform='matrix(1%2C0%2C0%2C1%2C281.257%2C1.16685e-05)'%3E             %3Cpath d='M228%2C63.986C228%2C56.298 224.946%2C48.926 219.51%2C43.49C214.074%2C38.054 206.702%2C35 199.014%2C35C199.005%2C35 199%2C35 199%2C35C199%2C35 199%2C35 198.999%2C35C191.31%2C34.993 183.934%2C38.043 178.495%2C43.477C173.056%2C48.912 170%2C56.285 170%2C63.974L170%2C64C170%2C71.691 173.055%2C79.068 178.494%2C84.506C183.932%2C89.945 191.309%2C93 199%2C93L199%2C93C206.691%2C93 214.068%2C89.945 219.506%2C84.506C224.945%2C79.068 228%2C71.691 228%2C64C228%2C63.992 228%2C63.987 228%2C63.987C228%2C63.987 228%2C63.987 228%2C63.986ZM223.977%2C63.986C223.977%2C50.198 212.8%2C39.022 199.013%2C39.022C199.004%2C39.022 199%2C39.022 199%2C39.022C199%2C39.022 199%2C39.022 198.999%2C39.022C192.377%2C39.016 186.024%2C41.642 181.34%2C46.323C176.655%2C51.003 174.023%2C57.354 174.023%2C63.976L174.023%2C63.999C174.023%2C70.623 176.655%2C76.976 181.339%2C81.66C186.023%2C86.343 192.375%2C88.975 198.999%2C88.975L199.001%2C88.975C205.625%2C88.975 211.977%2C86.343 216.661%2C81.66C221.345%2C76.976 223.977%2C70.623 223.977%2C63.999C223.977%2C63.991 223.977%2C63.987 223.977%2C63.987C223.977%2C63.987 223.977%2C63.987 223.977%2C63.986Z' style='fill:rgb(201%2C226%2C255)%3B'/%3E         %3C/g%3E         %3Cg id='n' transform='matrix(1%2C0%2C0%2C1%2C92.4061%2C0)'%3E             %3Cpath d='M484.93%2C93L451.002%2C42.108L450.998%2C93L446.998%2C93L447.002%2C35L451.07%2C35L485%2C85.894L485%2C35L489%2C35L489%2C93C487.643%2C93 486.286%2C93 484.93%2C93Z' style='fill:rgb(201%2C226%2C255)%3Bfill-rule:nonzero%3B'/%3E         %3C/g%3E     %3C/g%3E %3C/svg%3E"
},{}],89:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 100 100'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='%232af'     d='       M 92 45       L 92 55       L 78 61       L 74 68       L 76 83       L 66 89       L 54 80       L 46 80       L 34 89       L 24 83       L 26 68       L 22 61       L 8 55       L 8 45       L 22 39       L 26 32       L 24 17       L 34 11       L 46 20       L 54 20       L 66 11       L 76 17       L 74 32       L 78 39       z       M 50 50       m 0 -12       a 12 12 0 0 0 0 24       a 12 12 0 0 0 0 -24       z     '   /%3E %3C/svg%3E"
},{}],90:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 80 80'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='%232af'     d='       M 18 65       L 33 65       L 33 15       L 18 15       z       M 47 65       L 62 65       L 62 15       L 47 15       z     '   /%3E %3C/svg%3E"
},{}],91:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 80 80'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='%232af'     d='       M 15 70       L 65 40       L 15 10       z     '   /%3E %3C/svg%3E"
},{}],92:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 80 80'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='%232af'     d='       M 10 65       L 10 30       L 20 20       L 50 20       L 50 10       L 70 30       L 50 50       L 50 40       L 30 40       L 30 65       z     '   /%3E %3C/svg%3E"
},{}],93:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 80 80'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='%232af'     d='       M 10 10       L 10 70       L 70 70       L 70 20       L 60 10       z       M 20 40       L 60 40       L 60 65       L 20 65       z       M 54 13       L 54 32       L 25 32       L 25 13       z       M 42 15       L 50 15       L 50 30       L 42 30       z     '   /%3E %3C/svg%3E"
},{}],94:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 80 80'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='%232af'     d='       M 10 60       L 10 70       L 30 70       L 30 60       z              M 50 60       L 50 70       L 70 70       L 70 60       z       M 10 55       L 10 40       A 30 30 0 0 1 70 40       L 70 55       L 50 55       L 50 40       A 10 10 0 0 0 30 40       L 30 55       z     '   /%3E %3C/svg%3E"
},{}],95:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 80 80'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='%232af'     d='       M 70 65       L 70 30       L 60 20       L 30 20       L 30 10       L 10 30       L 30 50       L 30 40       L 50 40       L 50 65       z     '   /%3E %3C/svg%3E"
},{}],96:[function(require,module,exports){
module.exports = "data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg'   viewBox='0 0 100 100'   width='256'   height='256'   font-family='Helvetica Neue'   font-weight='300' %3E   %3Cpath     fill='none'     stroke='%23222'     stroke-width='20'     stroke-linecap='round'     stroke-linejoin='round'      d='       M 50 50       m -6 -32       l 12 0       l 30 50       l -8 12       l -56 0       l -8 -12       l 30 -50       z     '   /%3E   %3Cpath     fill='%23f92'     stroke='%23f92'     stroke-width='5'     stroke-linecap='round'     stroke-linejoin='round'      d='       M 50 50       m -6 -32       l 12 0       l 30 50       l -8 12       l -56 0       l -8 -12       l 30 -50       z     '   /%3E   %3Cpath     fill='%23222'     stroke='%23222'     stroke-width='5'     stroke-linecap='round'     stroke-linejoin='round'      d='       M 50 30       m -6 0       l 12 0       l 0 27       l -12 0       z       M 50 66       m -6 0       l 12 0       l 0 8       l -12 0       z     '   /%3E %3C/svg%3E"
},{}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return JSON.parse(JSON.stringify(data));
};

},{}],98:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ass = require('./ass');

var _ass2 = _interopRequireDefault(_ass);

var _compat = require('./compat');

var _compat2 = _interopRequireDefault(_compat);

var _jsonCopy = require('./json-copy');

var _jsonCopy2 = _interopRequireDefault(_jsonCopy);

var _paramGui = require('./param-gui');

var _paramGui2 = _interopRequireDefault(_paramGui);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _fxDefinitions = require('./fx-definitions');

var _fxDefinitions2 = _interopRequireDefault(_fxDefinitions);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _main3 = require('./vue/main.vue');

var _main4 = _interopRequireDefault(_main3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * IT'S AUTOMATON!
 * It's `automaton.js` and `automaton.min.js` version.
 * Since GUI stuff is pretty big for intro heh
 * @extends Automaton
 * @param {Object} [_props]
 * @param {boolean} [_props.loop] Whether let the time loop or not
 * @param {number} [_props.fps] If this is set, the clock will become frame mode
 * @param {boolean} [_props.realtime] If this is true, the clock will become realtime mode
 * @param {DOM} [_props.gui] DOM element where you want to attach the Automaton GUI
 * @param {string|Object} [_props.data] Data of the automaton. Don't worry, I can generate an initial data for you!
 */
var AutomatonWithGUI = function (_Automaton) {
  _inherits(AutomatonWithGUI, _Automaton);

  function AutomatonWithGUI(_props) {
    _classCallCheck(this, AutomatonWithGUI);

    var props = Object.assign({}, _props);
    props.data = (0, _compat2.default)(props.data);

    (0, _ass2.default)(!_props.onseek, 'The handler "onseek" is no longer supported. Use Automaton.on( "seek", ... ) instead.');
    (0, _ass2.default)(!_props.onplay, 'The handler "onplay" is no longer supported. Use Automaton.on( "play", ... ) instead.');
    (0, _ass2.default)(!_props.onpause, 'The handler "onpause" is no longer supported. Use Automaton.on( "pause", ... ) instead.');

    /**
     * History stack.
     * Will be managed from {@link AutomatonWithGUI#pushHistory|pushHistory()}, navigated from {@link AutomatonWithGUI#undo|undo()} and {@link AutomatonWithGUI#redo|redo()}.
     * @type {Object[]}
     * @protected
     */
    var _this = _possibleConstructorReturn(this, (AutomatonWithGUI.__proto__ || Object.getPrototypeOf(AutomatonWithGUI)).call(this, props));

    _this.__history = [];

    /**
     * Current position of history stack.
     * @type {number}
     * @protected
     */
    _this.__historyIndex = 0;

    _fxDefinitions2.default.map(function (fxDef) {
      _this.addFxDefinition.apply(_this, _toConsumableArray(fxDef));
    });

    if (_props.gui) {
      _this.__prepareGUI(_props.gui);
    }

    window.addEventListener('beforeunload', function (event) {
      if (_this.__historyIndex !== 0) {
        var confirmationMessage = 'Automaton: Did you saved your progress?';

        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    });
    return _this;
  }

  /**
   * Prepare GUI.
   * @param {DOM} _target DOM element where you want to attach the Automaton GUI
   * @returns {void} void
   * @protected
   */


  _createClass(AutomatonWithGUI, [{
    key: '__prepareGUI',
    value: function __prepareGUI(_target) {
      var el = document.createElement('div');
      _target.appendChild(el);

      /**
       * Vue instance that manages automaton gui.
       * @type {Vue}
       */
      this.__vue = new _vue2.default({
        el: el,
        data: {
          automaton: this
        },
        render: function render(createElement) {
          return createElement(_main4.default, { props: { automaton: this.automaton } });
        }
      });
    }

    /**
     * Generate default fx params object.
     * @param {string} _id Id of the fx
     * @returns {Object} Default fx params object
     */

  }, {
    key: 'generateDefaultFxParams',
    value: function generateDefaultFxParams(_id) {
      var fxDef = this.__paramFxDefs[_id];
      if (!fxDef) {
        throw new Error('Fx definition called ' + _id + ' is not defined');
      }

      var ret = {};
      for (var key in fxDef.params) {
        ret[key] = fxDef.params[key].default;
      }

      return ret;
    }

    /**
     * Toggle play / pause.
     * @returns {void} void
     */

  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    /**
     * Put some operation into the history stack.
     * Since it should accessible from GUI this function is public, basically `-- DON'T TOUCH IT KIDDO --`
     * @param {string} _desc Description of the operation
     * @param {function} _do Operation
     * @param {function} _undo Operation that undoes the `_do`
     * @param {boolean} [_execute=false] _do will be executed instantly if true
     * @returns {any} any if `_execute` is true, void otherwise
     */

  }, {
    key: 'pushHistory',
    value: function pushHistory(_desc, _do, _undo, _execute) {
      this.__history.splice(this.__historyIndex);
      this.__history.push({ desc: _desc, do: _do, undo: _undo });
      this.__historyIndex++;

      if (_execute || false) {
        return _do();
      }
    }

    /**
     * Undo the operation based on history stack.
     * Can be performed via GUI.
     * @returns {any} Result of _undo
     */

  }, {
    key: 'undo',
    value: function undo() {
      if (this.__historyIndex <= 0) {
        return;
      }
      this.__historyIndex--;
      return this.__history[this.__historyIndex].undo();
    }

    /**
     * Redo the operation based on history stack.
     * Can be performed via GUI.
     * @returns {any} Result of _do
     */

  }, {
    key: 'redo',
    value: function redo() {
      if (this.__history.length <= this.__historyIndex) {
        return;
      }
      this.__historyIndex++;
      return this.__history[this.__historyIndex - 1].do();
    }

    /**
     * Return description of latest operation.
     * If there are no operation before the current state, it will return empty string instead.
     * @returns {string} Description of operation
     */

  }, {
    key: 'getUndoDesc',
    value: function getUndoDesc() {
      return this.__history[this.__historyIndex - 1] ? this.__history[this.__historyIndex - 1].desc : '';
    }

    /**
     * Return description of recently undo-ed operation.
     * If there are no operation after the current state, it will return empty string instead.
     * @returns {string} Description of operation
     */

  }, {
    key: 'getRedoDesc',
    value: function getRedoDesc() {
      return this.__history[this.__historyIndex] ? this.__history[this.__historyIndex].desc : '';
    }

    /**
     * Drop all the history. YABAI.
     */

  }, {
    key: 'dropHistory',
    value: function dropHistory() {
      this.__history.splice(0);
      this.__historyIndex = 0;
    }

    /**
     * Set new length for this automaton instance.
     * **Some nodes / fxs might be automatically removed / changed.**
     * Can be performed via GUI.
     * @param {number} _length New length for the automaton
     * @returns {void} void
     */

  }, {
    key: 'setLength',
    value: function setLength(_length) {
      // if length is invalid then throw error
      if (isNaN(_length)) {
        throw new Error('Automaton.setLength: _length is invalid');
      }

      // if length is not changed then do fast-return
      if (_length === this.length) {
        return;
      }

      // changeLength is a good method
      for (var paramName in this.__params) {
        var param = this.__params[paramName];
        param.changeLength(_length);
      }

      // finally set the length
      this.__length = _length;

      // It's irreversible operation, sorry.
      this.dropHistory();

      // Poke vue
      this.__vue.$emit('changedLength');
    }

    /**
     * Set new resolution for this automaton instance.
     * @param {number} _resolultion New resolution for the automaton lul
     * @returns {void} void
     */

  }, {
    key: 'setResolution',
    value: function setResolution(_resolultion) {
      // lul
      this.__resolution = _resolultion; // lul
      this.precalcAll();
    }

    /**
     * Create a new param.
     * @param {string} _name Name of param
     * @returns {Param} Created param
     */

  }, {
    key: 'createParam',
    value: function createParam(_name, _data) {
      var param = new _paramGui2.default({
        automaton: this,
        data: _data
      });
      _vue2.default.set(this.__params, _name, param);
      return param;
    }

    /**
     * Remove a param.
     * @param {string} _name Name of param
     * @returns {void} void
     */

  }, {
    key: 'removeParam',
    value: function removeParam(_name) {
      _vue2.default.delete(this.__params, _name);
    }

    /**
     * Get a param.
     * @param {string} _name Name of the param
     * @returns {Param} Param object
     */

  }, {
    key: 'getParam',
    value: function getParam(_name) {
      return this.__params[_name] || null;
    }

    /**
     * Return list of name of params. Sorted.
     * @returns {Array} List of name of params
     */

  }, {
    key: 'getParamNames',
    value: function getParamNames() {
      var arr = [];
      for (var name in this.__params) {
        arr.push(name);
      }
      arr = arr.sort();
      return arr;
    }

    /**
     * Return list of id of fx definitions. Sorted.
     * @returns {Array} List of id of fx definitions
     */

  }, {
    key: 'getFxDefinitionIds',
    value: function getFxDefinitionIds() {
      var arr = [];
      for (var id in this.__paramFxDefs) {
        arr.push(id);
      }
      arr = arr.sort();
      return arr;
    }

    /**
     * Return display name of a fx definition.
     * @param {string} _id Id of the fx definition you want to grab
     * @returns {string} Name of the fx definition
     */

  }, {
    key: 'getFxDefinitionName',
    value: function getFxDefinitionName(_id) {
      if (this.__paramFxDefs[_id]) {
        return this.__paramFxDefs[_id].name || _id;
      } else {
        return undefined;
      }
    }

    /**
     * Return description of a fx definition.
     * @param {string} _id Id of the fx definition you want to grab
     * @returns {string} Description of the fx definition
     */

  }, {
    key: 'getFxDefinitionDescription',
    value: function getFxDefinitionDescription(_id) {
      if (this.__paramFxDefs[_id]) {
        return this.__paramFxDefs[_id].description || '';
      } else {
        return undefined;
      }
    }

    /**
     * Return params section of a fx definition.
     * @param {string} _id Id of the fx definition you want to grab
     * @returns {Object} Params section
     */

  }, {
    key: 'getFxDefinitionParams',
    value: function getFxDefinitionParams(_id) {
      if (this.__paramFxDefs[_id]) {
        return (0, _jsonCopy2.default)(this.__paramFxDefs[_id].params || {});
      } else {
        return undefined;
      }
    }

    /**
     * Return count of params.
     * @returns {number} Count of params
     */

  }, {
    key: 'countParams',
    value: function countParams() {
      var sum = 0;
      for (var name in this.__params) {
        sum++;
      }
      return sum;
    }

    /**
     * Assigned to `Automaton.auto` at constructor.
     * @param {string} _name name of the param
     * @returns {number} Current value of the param
     * @protected
     */

  }, {
    key: '__auto',
    value: function __auto(_name) {
      var param = this.__params[_name];
      if (!param) {
        param = this.createParam(_name);
      }
      param.markAsUsed();
      return param.getValue();
    }

    /**
     * Load automaton state data.
     * @param {Object} _data Object contains automaton data.
     * @returns {void} void
     */

  }, {
    key: 'load',
    value: function load(_data) {
      _get(AutomatonWithGUI.prototype.__proto__ || Object.getPrototypeOf(AutomatonWithGUI.prototype), 'load', this).call(this, _data);

      /**
       * GUI settings.
       * Feel free to get / set these values.
       * @type {Object}
       */
      this.guiSettings = _data.guiSettings;
    }

    /**
     * Export current state as JSON.
     * @returns {string} Saved object as JSON
     * @example
     * あとでやる
     * @todo はい
     */

  }, {
    key: 'save',
    value: function save() {
      var ret = {
        v: this.version,
        length: this.length,
        resolution: this.resolution,
        params: {}, // will be filled later
        guiSettings: this.guiSettings
      };

      ret.params = {};
      for (var name in this.__params) {
        var param = this.__params[name];
        ret.params[name] = {
          nodes: param.dumpNodesWithoutId(),
          fxs: param.dumpFxsWithoutId()
        };
      }

      return JSON.stringify(ret);
    }

    /**
     * Poke the vue renderer.
     * @returns {void} void
     */

  }, {
    key: 'pokeRenderer',
    value: function pokeRenderer() {
      if (this.__vue) {
        this.__vue.$emit('poke');
      }
    }
  }]);

  return AutomatonWithGUI;
}(_main2.default);

module.exports = AutomatonWithGUI;
AutomatonWithGUI.default = AutomatonWithGUI;

},{"./ass":67,"./compat":71,"./fx-definitions":73,"./json-copy":97,"./main":99,"./param-gui":100,"./vue/main.vue":105,"vue":65}],99:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

var _clockFrame = require('./clock-frame');

var _clockFrame2 = _interopRequireDefault(_clockFrame);

var _clockRealtime = require('./clock-realtime');

var _clockRealtime2 = _interopRequireDefault(_clockRealtime);

var _param = require('./param');

var _param2 = _interopRequireDefault(_param);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * IT'S AUTOMATON!
 * It's `automaton.nogui.js` version and also base class for {@link AutomatonWithGUI}.
 * @param {Object} _props
 * @param {boolean} [_props.loop] Whether let the time loop or not
 * @param {number} [_props.fps] If this is set, the clock will become frame mode
 * @param {boolean} [_props.realtime] If this is true, the clock will become realtime mode
 * @param {Object} _props.data Data of the automaton. **Required in noGUI mode**
 */
var Automaton = function () {
  function Automaton(_props) {
    var _this = this;

    _classCallCheck(this, Automaton);

    /**
     * Version of the automaton.
     * @type {number}
     * @protected
     */
    this.__version = "2.0.0";

    /**
     * Whether the animation will be looped or not.
     * @type {boolean}
     */
    this.loop = _props.loop || false;

    /**
     * Clock of the automaton.
     * @type {Clock}
     * @protected
     */
    this.__clock = _props.fps ? new _clockFrame2.default(this, _props.fps) : _props.realtime ? new _clockRealtime2.default(this) : new _clock2.default(this);

    /**
     * List of event listeners.
     * @type {Object.<string, function[]>}
     */
    this.__listeners = {};

    /**
     * A list of param fx definitions.
     * @type {Object.<string, Fx>}
     * @protected
     */
    this.__paramFxDefs = {};

    var data = _props.data;
    this.load(data);

    /**
     * **THE MIGHTY `auto()` FUNCTION!! GRAB IT**
     * It creates a new param automatically if there are no param called `_name` (GUI mode only).
     * Otherwise it returns current value of the param called `_name`.
     * @param {string} _name name of the param
     * @returns {number} Current value of the param
     */
    this.auto = function (_name) {
      return _this.__auto(_name);
    };
  }

  /**
   * Version of the automaton.
   * @type {number}
   * @readonly
   */


  _createClass(Automaton, [{
    key: 'createParam',


    /**
     * Create a new param.
     * @param _name Name of the param
     * @param _data Data for the param
     * @returns {void} void
     */
    value: function createParam(_name, _data) {
      this.__params[name] = new _param2.default({
        automaton: this,
        data: _data
      });
    }

    /**
     * Load automaton state data.
     * @param {Object} _data Object contains automaton data.
     * @returns {void} void
     */

  }, {
    key: 'load',
    value: function load(_data) {
      /**
       * Total length of animation in seconds.
       * @type {number}
       * @protected
       */
      this.__length = _data.length;

      /**
       * Resolution = Sampling point per second.
       * @type {number}
       * @protected
       */
      this.__resolution = _data.resolution;

      /**
       * List of Param.
       * @type {Object.<string, Param>}
       * @protected
       */
      this.__params = {};
      for (var _name2 in _data.params) {
        this.createParam(_name2, _data.params[_name2]);
      }
    }

    /**
     * Seek the timeline.
     * Can be performed via GUI.
     * @param {number} _time Time
     * @returns {void} void
     */

  }, {
    key: 'seek',
    value: function seek(_time) {
      this.__clock.setTime(_time);
      this.__emit('seek');
    }

    /**
     * Play the timeline.
     * @returns {void} void
     * @todo SHOULD be performed via GUI.
     */

  }, {
    key: 'play',
    value: function play() {
      this.__clock.play();
      this.__emit('play');
    }

    /**
     * Pause the timeline.
     * @returns {void} void
     * @todo SHOULD be performed via GUI.
     */

  }, {
    key: 'pause',
    value: function pause() {
      this.__clock.pause();
      this.__emit('pause');
    }

    /**
     * Add a fx definition.
     * @param {string} _id Unique id for the Fx definition
     * @param {FxDefinition} _fxDef Fx definition object
     * @returns {void} void
     */

  }, {
    key: 'addFxDefinition',
    value: function addFxDefinition(_id, _fxDef) {
      this.__paramFxDefs[_id] = _fxDef;

      this.precalcAll();
    }

    /**
     * Emit an event.
     * @param {string} _event Event name
     * @param {...any} _arg Arguments passed to listeners
     * @returns {void} void
     * @protected
     */

  }, {
    key: '__emit',
    value: function __emit(_event) {
      for (var _len = arguments.length, _arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        _arg[_key - 1] = arguments[_key];
      }

      if (!this.__listeners[_event]) {
        return;
      }
      this.__listeners[_event].map(function (listener) {
        return listener.apply(undefined, _arg);
      });
    }

    /**
     * Register a listener function.
     * @param {string} _event Event name
     * @param {function} _func Listener function
     * @returns {void} void
     */

  }, {
    key: 'on',
    value: function on(_event, _func) {
      if (!this.__listeners[_event]) {
        this.__listeners[_event] = [];
      }
      this.__listeners[_event].push(_func);
    }

    /**
     * Precalculate all params.
     * @returns {void} void
     */

  }, {
    key: 'precalcAll',
    value: function precalcAll() {
      for (var _name3 in this.__params) {
        this.__params[_name3].precalc();
      }
    }

    /**
     * Update the entire automaton.
     * **You may want to call this in your update loop.**
     * @param {number} [_time] Current time, **Required if the clock mode is manual**
     * @returns {void} void
     */

  }, {
    key: 'update',
    value: function update(_time) {
      // update the clock
      this.__clock.update(_time);

      // if loop is enabled, loop the time
      if (this.loop && (this.time < 0 || this.length < this.time)) {
        this.__clock.setTime(this.time - Math.floor(this.time / this.length) * this.length);
      }

      // grab current value for each param
      for (var _name4 in this.__params) {
        this.__params[_name4].getValue();
      }
    }

    /**
     * Assigned to Automaton.auto at constructor.
     * @param {string} _name name of the param
     * @returns {number} Current value of the param
     * @protected
     */

  }, {
    key: '__auto',
    value: function __auto(_name) {
      return this.params[_name].__currentValue;
    }
  }, {
    key: 'version',
    get: function get() {
      return this.__version;
    }

    /**
     * Current time. Same as `automaton.__clock.time`.
     * @type {number}
     * @readonly
     */

  }, {
    key: 'time',
    get: function get() {
      return this.__clock.time;
    }

    /**
     * Total length of animation in seconds.
     * @type {number}
     * @readonly
     */

  }, {
    key: 'length',
    get: function get() {
      return this.__length;
    }

    /**
     * Resolution = Sampling point per second.
     * @type {number}
     * @readonly
     */

  }, {
    key: 'resolution',
    get: function get() {
      return this.__resolution;
    }

    /**
     * Delta of time between now and previous update call.
     * @type {number}
     * @readonly
     */

  }, {
    key: 'deltaTime',
    get: function get() {
      return this.__clock.deltaTime;
    }

    /**
     * Whether it's playing or not.
     * @type {boolean}
     * @readonly
     */

  }, {
    key: 'isPlaying',
    get: function get() {
      return this.__clock.isPlaying;
    }

    /**
     * Current progress by whole length. Might NOT be [0-1] unless `_props.loop` (see constructor) is true.
     * @type {number}
     * @readonly
     */

  }, {
    key: 'progress',
    get: function get() {
      return this.time / this.length;
    }

    /**
     * Frame per second. If the clock type is not fps, it will return `0` instead.
     * @type {number}
     * @readonly
     */

  }, {
    key: 'fps',
    get: function get() {
      return this.__clock.fps ? this.__clock.fps : 0;
    }

    /**
     * Boolean that represents whether the clock is based on realtime or not.
     * @type {boolean}
     * @readonly
     */

  }, {
    key: 'realtime',
    get: function get() {
      return Boolean(this.__clock.realtime);
    }
  }]);

  return Automaton;
}();

module.exports = Automaton;
Automaton.default = Automaton;

},{"./clock":70,"./clock-frame":68,"./clock-realtime":69,"./param":101}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jsonCopy = require('./json-copy');

var _jsonCopy2 = _interopRequireDefault(_jsonCopy);

var _ass = require('./ass');

var _ass2 = _interopRequireDefault(_ass);

var _genId = require('./gen-id');

var _genId2 = _interopRequireDefault(_genId);

var _hasOverwrap = require('./has-overwrap');

var _hasOverwrap2 = _interopRequireDefault(_hasOverwrap);

var _mainGui = require('./main-gui');

var _mainGui2 = _interopRequireDefault(_mainGui);

var _param = require('./param');

var _param2 = _interopRequireDefault(_param);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It represents a param of Automaton.
 * It's `automaton.js` and `automaton.min.js` version.
 * It has even more pretty APIs yay
 * @param {Object} _props
 * @param {Automaton} _props.automaton Parent automaton
 * @param {Object} [_props.data] Data of the param. Don't worry, I can generate an initial data for you!
 */
var ParamWithGUI = function (_Param) {
  _inherits(ParamWithGUI, _Param);

  function ParamWithGUI(_props) {
    _classCallCheck(this, ParamWithGUI);

    var props = Object.assign({}, _props);
    var len = _props.automaton.length;
    props.data = props.data ? props.data : {
      nodes: [{
        time: 0.0,
        value: 0.0,
        out: { time: ParamWithGUI.DEFAULT_HANDLE_LENGTH, value: 0.0 }
      }, {
        time: len,
        value: 0.0,
        in: { time: -ParamWithGUI.DEFAULT_HANDLE_LENGTH, value: 0.0 }
      }],
      fxs: []
    };

    /**
     * True if the param is used once at least in current session.
     * Can be operated by {@link ParamWithGUI#markAsUsed}.
     * @type {boolean}
     * @protected
     */
    var _this = _possibleConstructorReturn(this, (ParamWithGUI.__proto__ || Object.getPrototypeOf(ParamWithGUI)).call(this, props));

    _this.__isUsed = false;
    return _this;
  }

  /**
   * Load a param data.
   * @param {object} _data Data of param
   * @returns {void} void
   */


  _createClass(ParamWithGUI, [{
    key: 'load',
    value: function load(_data) {
      var data = (0, _jsonCopy2.default)(_data);
      _get(ParamWithGUI.prototype.__proto__ || Object.getPrototypeOf(ParamWithGUI.prototype), 'load', this).call(this, data);

      this.__nodes.forEach(function (node) {
        return node.$id = (0, _genId2.default)();
      });
      this.__fxs.forEach(function (fx) {
        return fx.$id = (0, _genId2.default)();
      });
    }

    /**
     * Precalculate values.
     * @returns {void} void
     */

  }, {
    key: 'precalc',
    value: function precalc() {
      _get(ParamWithGUI.prototype.__proto__ || Object.getPrototypeOf(ParamWithGUI.prototype), 'precalc', this).call(this);
      this.__automaton.pokeRenderer();
    }

    /**
     * Mark this param as used.
     * @returns {void} void
     */

  }, {
    key: 'markAsUsed',
    value: function markAsUsed() {
      this.__isUsed = true;
    }

    /**
     * Return whether this is used param or not.
     * @returns {bool} True if the param is used at least once in current session
     */

  }, {
    key: 'isUsed',
    value: function isUsed() {
      return this.__isUsed;
    }

    /**
     * Sort nodes by time.
     * @returns {void} void
     * @protected
     */

  }, {
    key: '__sortNodes',
    value: function __sortNodes() {
      this.__nodes = this.__nodes.sort(function (a, b) {
        return a.time - b.time;
      });
    }

    /**
     * Search for node that has given id then return index of it.
     * If it couldn't find the node, it will throw an error instead.
     * @param {number} _id Id of node you want to grab
     * @protected
     */

  }, {
    key: '__getNodeIndexById',
    value: function __getNodeIndexById(_id) {
      var index = this.__nodes.findIndex(function (node) {
        return node.$id === _id;
      });
      if (index === -1) {
        throw new Error('Searched for node id: ' + _id + ' but not found');
      }
      return index;
    }

    /**
     * Return how many node the param currently have.
     * @returns {number} Nodes count
     */

  }, {
    key: 'getNumNode',
    value: function getNumNode() {
      return this.__nodes.length;
    }

    /**
     * Dump data of a node.
     * @param {string} _id Id of the node you want to dump
     * @returns {object} Data of the node
     */

  }, {
    key: 'dumpNode',
    value: function dumpNode(_id) {
      var index = this.__getNodeIndexById(_id);
      return (0, _jsonCopy2.default)(this.__nodes[index]);
    }

    /**
     * Dump data of nodes.
     * @returns {object[]} Data of nodes
     */

  }, {
    key: 'dumpNodes',
    value: function dumpNodes() {
      return (0, _jsonCopy2.default)(this.__nodes);
    }

    /**
     * Dump data of nodes, without `$id`.
     * @returns {object[]} Data of nodes
     */

  }, {
    key: 'dumpNodesWithoutId',
    value: function dumpNodesWithoutId() {
      var nodes = this.dumpNodes();
      return nodes.map(function (node) {
        delete node.$id;
        return node;
      });
    }

    /**
     * Create a node.
     * @param {number} _time Time of new node
     * @param {number} _value Value of new node
     * @returns {string} Id of the new node
     */

  }, {
    key: 'createNode',
    value: function createNode(_time, _value) {
      var data = {
        $id: (0, _genId2.default)(),
        time: _time,
        value: _value,
        in: { time: -ParamWithGUI.DEFAULT_HANDLE_LENGTH, value: 0.0 },
        out: { time: ParamWithGUI.DEFAULT_HANDLE_LENGTH, value: 0.0 }
      };
      this.__nodes.push(data);
      this.__sortNodes();

      this.precalc();

      return data.$id;
    }

    /**
     * Create a node from dumped data.
     * @param {object} _obj Dumped node data
     * @returns {string} Id of the new node
     */

  }, {
    key: 'createNodeFromData',
    value: function createNodeFromData(_obj) {
      var data = (0, _jsonCopy2.default)(_obj);
      this.__nodes.push(data);
      this.__sortNodes();

      this.precalc();

      return data.$id;
    }

    /**
     * Remove a node.
     * @param {string} _id Id of the node you want to remove
     * @returns {void} void
     */

  }, {
    key: 'removeNode',
    value: function removeNode(_id) {
      var index = this.__getNodeIndexById(_id);

      this.__nodes.splice(index, 1);

      this.precalc();
    }

    /**
     * Move a node.
     * @param {string} _id Id of the node you want to move
     * @param {number} _time Time
     * @param {number} _value Value
     * @returns {void} void
     */

  }, {
    key: 'moveNode',
    value: function moveNode(_id, _time, _value) {
      var index = this.__getNodeIndexById(_id);

      var node = this.__nodes[index];

      var time = typeof _time === 'number' ? _time : node.time;
      if (index === 0) {
        time = 0;
      } else if (index === this.__nodes.length - 1) {
        time = this.__automaton.length;
      } else {
        time = Math.min(Math.max(time, this.__nodes[index - 1].time), this.__nodes[index + 1].time);
      }
      node.time = time;

      node.value = typeof _value === 'number' ? _value : node.value;

      this.precalc();
    }

    /**
     * Move a handle of a node.
     * @param {string} _id Id of the node you want to operate
     * @param {boolean} _isOut Input handle if false, output handle if true
     * @param {number} _time Time
     * @param {number} _value Value
     * @returns {void} void
     */

  }, {
    key: 'moveHandle',
    value: function moveHandle(_id, _isOut, _time, _value) {
      var index = this.__getNodeIndexById(_id);

      if (index === 0 && !_isOut || index === this.getNumNode() - 1 && _isOut) {
        return;
      }

      var node = this.__nodes[index];
      var handle = _isOut ? node.out : node.in;

      var time = typeof _time === 'number' ? _time : handle.time;
      if (_isOut) {
        time = Math.max(0.0, time);
      } else {
        time = Math.min(0.0, time);
      }
      handle.time = time;

      handle.value = typeof _value === 'number' ? _value : handle.value;

      this.precalc();
    }

    /**
     * Reset a handle of a node.
     * @param {string} _id Id of the node you want to operate
     * @param {boolean} _isOut Input handle if false, output handle if true
     * @returns {void} void
     */

  }, {
    key: 'resetHandle',
    value: function resetHandle(_id, _isOut) {
      var index = this.__getNodeIndexById(_id);

      if (index === 0 && !_isOut || index === this.getNumNode() - 1 && _isOut) {
        return;
      }

      var node = this.__nodes[index];
      var handle = _isOut ? node.out : node.in;

      handle.time = (_isOut ? 1.0 : -1.0) * ParamWithGUI.DEFAULT_HANDLE_LENGTH;
      handle.value = 0.0;

      this.precalc();
    }

    /**
     * Sort fxs by time.
     * @returns {void} void
     * @protected
     */

  }, {
    key: '__sortFxs',
    value: function __sortFxs() {
      this.__fxs = this.__fxs.sort(function (a, b) {
        return a.time - b.time;
      }).sort(function (a, b) {
        return a.row - b.row;
      });
    }

    /**
     * Search for fx that has given id then return index of it.
     * If it couldn't find the fx, it will throw an error instead.
     * @param {number} _id Id of fx you want to grab
     * @protected
     */

  }, {
    key: '__getFxIndexById',
    value: function __getFxIndexById(_id) {
      var index = this.__fxs.findIndex(function (fx) {
        return fx.$id === _id;
      });
      if (index === -1) {
        throw new Error('Searched for fx id: ' + _id + ' but not found');
      }
      return index;
    }

    /**
     * Search for vacance fx row for given time and length.
     * @param {number} _time Beginning time of fx
     * @param {number} _length Length of fx
     * @param {number} [_row=0] If given, rows lower than this value will not be searched.
     * @returns {number} Minimal free fx row
     * @protected
     */

  }, {
    key: '__getFreeRow',
    value: function __getFreeRow(_time, _length, _row) {
      var row = _row || 0;
      for (var iFx = 0; iFx < this.__fxs.length; iFx++) {
        var fx = this.__fxs[iFx];
        if (fx.row < row) {
          continue;
        }
        if (row < fx.row) {
          break;
        }
        if ((0, _hasOverwrap2.default)(_time, _length, fx.time, fx.length)) {
          row++;
        }
      }
      return row;
    }

    /**
     * Dump data of a fx.
     * @param {number} _id Id of a fx you want to dump
     * @returns {object} Data of the fx
     */

  }, {
    key: 'dumpFx',
    value: function dumpFx(_id) {
      var index = this.__getFxIndexById(_id);
      return (0, _jsonCopy2.default)(this.__fxs[index]);
    }

    /**
     * Dump data of fxs.
     * @returns {object[]} Data of fxs
     */

  }, {
    key: 'dumpFxs',
    value: function dumpFxs() {
      return (0, _jsonCopy2.default)(this.__fxs);
    }

    /**
     * Dump data of fxs, without `$id`.
     * @returns {object[]} Data of fxs
     */

  }, {
    key: 'dumpFxsWithoutId',
    value: function dumpFxsWithoutId() {
      var fxs = this.dumpFxs();
      return fxs.map(function (fx) {
        delete fx.$id;
        return fx;
      });
    }

    /**
     * Create a fx.
     * If it couldn't create param, it will return empty string instead.
     * @param {number} _time Beginning time of new fx
     * @param {number} _length Length of new fx
     * @param {string} _def Definition id (kind) of new fx
     * @returns {string} Id of the new fx
     */

  }, {
    key: 'createFx',
    value: function createFx(_time, _length, _def) {
      var row = this.__getFreeRow(_time, _length);
      if (ParamWithGUI.FX_ROW_MAX < row) {
        console.error('Too many fx stacks at here!');
        return '';
      }

      var data = {
        $id: (0, _genId2.default)(),
        time: _time,
        length: _length,
        row: row,
        def: _def,
        params: this.__automaton.generateDefaultFxParams(_def)
      };
      this.__fxs.push(data);
      this.__sortFxs();

      this.precalc();

      return data.$id;
    }

    /**
     * Create a fx from dumped data.
     * If it couldn't create param, it will return empty string instead.
     * @param {object} _obj Dumped fx data
     * @returns {string} Id of the new fx
     */

  }, {
    key: 'createFxFromData',
    value: function createFxFromData(_obj) {
      var row = this.__getFreeRow(_obj.time, _obj.length, _obj.row);
      if (ParamWithGUI.FX_ROW_MAX < row) {
        console.error('Too many fx stacks at here!');
        return '';
      }

      var data = (0, _jsonCopy2.default)(_obj);
      data.row = row;
      this.__fxs.push(data);
      this.__sortFxs();

      this.precalc();

      return data.$id;
    }

    /**
     * Remove a fx.
     * @param {string} _id Id of the fx you want to remove
     * @returns {void} void
     */

  }, {
    key: 'removeFx',
    value: function removeFx(_id) {
      var index = this.__getFxIndexById(_id);

      this.__fxs.splice(index, 1);

      this.precalc();
    }

    /**
     * Move a fx.
     * @param {string} _id Id of the fx you want to move
     * @param {number} _time Beginning time
     * @returns {void} void
     */

  }, {
    key: 'moveFx',
    value: function moveFx(_id, _time) {
      var index = this.__getFxIndexById(_id);

      var fx = this.__fxs[index];

      var sameRow = this.__fxs.filter(function (fxOp) {
        return fxOp.row === fx.row;
      });
      var indexInRow = sameRow.indexOf(fx);
      var prev = sameRow[indexInRow - 1];
      var next = sameRow[indexInRow + 1];

      var left = prev ? prev.time + prev.length : 0.0;
      var right = next ? next.time : this.__automaton.length;
      fx.time = Math.min(Math.max(_time, left), right - fx.length);

      this.precalc();
    }

    /**
     * Change row of a fx.
     * @param {string} _id Id of the fx you want to move
     * @param {number} _row Row
     * @returns {void} void
     */

  }, {
    key: 'changeFxRow',
    value: function changeFxRow(_id, _row) {
      var index = this.__getFxIndexById(_id);

      if (_row < 0 || ParamWithGUI.FX_ROW_MAX < _row) {
        throw new Error('Row number ' + _row + ' is invalid');
      }

      var fx = this.__fxs[index];
      if (fx.row === _row) {
        return;
      }

      var sameRow = this.__fxs.filter(function (fxOp) {
        return fxOp.row === _row;
      });
      var isValid = sameRow.every(function (fxOp) {
        return !(fxOp.time < fx.time && fx.time < fxOp.time + fxOp.length) && !(fxOp.time < fx.time + fx.length && fx.time + fx.length < fxOp.time + fxOp.length) && !(fx.time < fxOp.time && fxOp.time < fx.time + fx.length) && !(fx.time < fxOp.time + fxOp.length && fxOp.time + fxOp.length < fx.time + fx.length);
      });

      if (!isValid) {
        return;
      }

      fx.row = _row;
      this.__sortFxs();

      this.precalc();
    }

    /**
     * Bypass or unbypass a fx.
     * @param {string} _id Id of the fx you want to change
     * @param {boolean} _bypass If true, fx will be bypassed
     * @returns {void} void
     */

  }, {
    key: 'bypassFx',
    value: function bypassFx(_id, _bypass) {
      var index = this.__getFxIndexById(_id);

      var fx = this.__fxs[index];
      _vue2.default.set(fx, 'bypass', !!_bypass);

      this.precalc();
    }

    /**
     * Change a param of a fx.
     * @param {string} _id Id of the fx you want to change
     * @param {string} _name Name of the param you want to change
     * @param {any} _value Your desired value
     * @returns {void} void
     */

  }, {
    key: 'changeFxParam',
    value: function changeFxParam(_id, _name, _value) {
      var index = this.__getFxIndexById(_id);

      var fx = this.__fxs[index];
      var params = this.__automaton.getFxDefinitionParams(fx.def);

      var value = _value;
      if (typeof params[_name].min === 'number') {
        value = Math.max(params[_name].min, value);
      }
      if (typeof params[_name].max === 'number') {
        value = Math.min(params[_name].max, value);
      }
      _vue2.default.set(fx.params, _name, value);

      this.precalc();
    }

    /**
     * Move a fx --force.
     * Best for undo-redo operation. probably.
     * @param {string} _id Id of the fx you want to move
     * @param {number} _time Beginning time
     * @param {number} _row Row
     * @returns {void} void
     */

  }, {
    key: 'forceMoveFx',
    value: function forceMoveFx(_id, _time, _row) {
      var index = this.__getFxIndexById(_id);

      var fx = this.__fxs[index];

      fx.time = _time;
      fx.row = _row;
      this.__sortFxs();

      this.precalc();
    }

    /**
     * Resize a fx.
     * @param {string} _id Index of the fx you want to resize
     * @param {number} _length Length
     * @returns {void} void
     */

  }, {
    key: 'resizeFx',
    value: function resizeFx(_id, _length) {
      var index = this.__getFxIndexById(_id);

      var fx = this.__fxs[index];

      var sameRow = this.__fxs.filter(function (fxOp) {
        return fxOp.row === fx.row;
      });
      var indexInRow = sameRow.indexOf(fx);
      var next = sameRow[indexInRow + 1];

      var right = next ? next.time : this.__automaton.length;

      fx.length = Math.min(Math.max(_length, 0.0), right - fx.time);

      this.precalc();
    }

    /**
     * Resize a fx by left side of the end.
     * It's very GUI dev friendly method. yeah.
     * @param {string} _id Index of the fx you want to resize
     * @param {number} _length Length
     * @returns {void} void
     */

  }, {
    key: 'resizeFxByLeft',
    value: function resizeFxByLeft(_id, _length) {
      var index = this.__getFxIndexById(_id);

      var fx = this.__fxs[index];
      var end = fx.time + fx.length;

      var sameRow = this.__fxs.filter(function (fxOp) {
        return fxOp.row === fx.row;
      });
      var indexInRow = sameRow.indexOf(fx);
      var prev = sameRow[indexInRow - 1];

      var left = prev ? prev.time + prev.length : 0.0;

      fx.length = Math.min(Math.max(_length, 0.0), end - left);
      fx.time = end - fx.length;

      this.precalc();
    }

    /**
     * Call when you need to change automaton length.
     * This is very hardcore method. Should not be called by anywhere except {@link AutomatonWithGUI#setLength}.
     * @param {number} _length Desired length
     * @returns {void} void
     */

  }, {
    key: 'changeLength',
    value: function changeLength(_length) {
      for (var i = this.__nodes.length - 1; 0 <= i; i--) {
        var node = this.__nodes[i];
        if (_length < node.time) {
          this.__nodes.splice(i, 1);
        } else if (node.time === _length) {
          delete node.out;
          break;
        } else {
          var lastNode = this.__nodes[this.__nodes.length - 1];
          if (lastNode) {
            lastNode.out = { time: ParamWithGUI.DEFAULT_HANDLE_LENGTH, value: 0.0 };
          }

          this.__nodes.push({
            time: _length,
            value: 0.0,
            in: { time: -ParamWithGUI.DEFAULT_HANDLE_LENGTH, value: 0.0 }
          });
          break;
        }
      }

      for (var _i = this.__fxs.length - 1; 0 <= _i; _i--) {
        var fx = this.__fxs[_i];
        if (_length < fx.time) {
          this.__fxs.splice(_i, 1);
        } else if (_length < fx.time + fx.length) {
          fx.length = _length - fx.time;
        }
      }

      this.__values = new Float32Array(this.__automaton.resolution * _length + 1);
      this.precalc();
    }
  }]);

  return ParamWithGUI;
}(_param2.default);

/**
 * Handles of a new node will be created in this length.
 * @type {number}
 * @constant
 */
ParamWithGUI.DEFAULT_HANDLE_LENGTH = 0.5;
ParamWithGUI.FX_ROW_MAX = 4;

exports.default = ParamWithGUI;

},{"./ass":67,"./gen-id":84,"./has-overwrap":85,"./json-copy":97,"./main-gui":98,"./param":101,"vue":65}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cubicBezier = require('./cubic-bezier');

var _cubicBezier2 = _interopRequireDefault(_cubicBezier);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * It represents a param of Automaton.
 * It's `automaton.nogui.js` version and also base class for {@link ParamWithGUI}
 * @param {Object} _props
 * @param {Automaton} _props.automaton Parent automaton
 * @param {Object} [_props.data] Data of the param. **Required in noGUI mode**
 */
var Param = function () {
  function Param(_props) {
    _classCallCheck(this, Param);

    /**
     * The parent automaton.
     * @type {Automaton}
     * @protected
     */
    this.__automaton = _props.automaton;

    /**
     * An array of precalculated value.
     * Its length is same as `param.__automaton.resolution * param.__automaton.length + 1`.
     * @type {number[]}
     * @protected
     */
    this.__values = new Float32Array(this.__automaton.resolution * this.__automaton.length + 1);

    this.load(_props.data);

    /**
     * A buffer of last calculated value.
     * @type {number}
     * @protected
     */
    this.__lastValue = 0.0;

    /**
     * Will be used for calculation of `param.__lastValue`.
     * @type {number}
     * @protected
     */
    this.__lastTime = 0.0;
  }

  /**
   * Load a param data.
   * @param {object} _data Data of param
   * @returns {void} void
   */


  _createClass(Param, [{
    key: 'load',
    value: function load(_data) {
      /**
       * List of node.
       * @type {ParamNode[]}
       * @protected
       */
      this.__nodes = _data.nodes;

      /**
       * List of fx.
       * @type {ParamFxStrip[]}
       * @protected
       */
      this.__fxs = _data.fxs;

      this.precalc();
    }

    /**
     * Precalculate value of a sample.
     * @returns {void} void
     */

  }, {
    key: 'precalc',
    value: function precalc() {
      for (var iNode = 0; iNode < this.__nodes.length - 1; iNode++) {
        var node0 = this.__nodes[iNode];
        var node1 = this.__nodes[iNode + 1];
        var i0 = Math.floor(node0.time * this.__automaton.resolution);
        var i1 = Math.floor(node1.time * this.__automaton.resolution);

        this.__values[i0] = node0.value;
        for (var i = i0 + 1; i <= i1; i++) {
          var time = i / this.__automaton.resolution;
          var value = (0, _cubicBezier2.default)(node0, node1, time);
          this.__values[i] = value;
        }
      }

      for (var iFx = 0; iFx < this.__fxs.length; iFx++) {
        var fx = this.__fxs[iFx];
        if (fx.bypass) {
          continue;
        }
        var fxDef = this.__automaton.__paramFxDefs[fx.def];
        if (!fxDef) {
          continue;
        }

        var _i = Math.ceil(this.__automaton.resolution * fx.time);
        var _i2 = Math.floor(this.__automaton.resolution * (fx.time + fx.length));

        var tempValues = new Float32Array(_i2 - _i);
        var tempLength = tempValues.length;

        var context = {
          i0: _i,
          i1: _i2,
          t0: fx.time,
          t1: fx.time + fx.length,
          dt: 1.0 / this.__automaton.resolution,
          resolution: this.__automaton.resolution,
          length: fx.length,
          params: fx.params,
          array: this.__values,
          getValue: this.getValue.bind(this),
          init: true
        };

        for (var _i3 = 0; _i3 < tempLength; _i3++) {
          context.i = _i3 + _i;
          context.t = context.i / this.__automaton.resolution;
          context.v = this.__values[_i3 + _i];
          context.progress = (context.t - fx.time) / fx.length;
          tempValues[_i3] = fxDef.func(context);

          context.init = false;
        }

        this.__values.set(tempValues, _i);
      }
    }

    /**
     * Return the value of specified time point.
     * @param {number} {_time} Time at the point you want to grab the value.
     * If it is not given, use current time of parent automaton instead
     * @returns {number} Result value
     */

  }, {
    key: 'getValue',
    value: function getValue(_time) {
      var time = _time;
      if (typeof time !== 'number') {
        // use parent automaton time instead
        time = this.__automaton.time;
      }

      if (time === this.__lastTime) {
        // use the buffer!
        return this.__lastValue;
      }

      if (this.__automaton.loop) {
        time = time - Math.floor(time / this.__automaton.length) * this.__automaton.length;
      }

      if (time <= 0.0) {
        // left clamp
        return this.__values[0];
      } else if (this.__automaton.length <= time) {
        // right clamp
        return this.__values[this.__values.length - 1];
      } else {
        // fetch two value then do linear interpolation
        var index = time * this.__automaton.resolution;
        var indexi = Math.floor(index);
        var indexf = index % 1.0;

        var v0 = this.__values[indexi];
        var v1 = this.__values[indexi + 1];

        var v = v0 + (v1 - v0) * indexf;

        // store lastValue
        this.__lastTime = time;
        this.__lastValue = v;

        return v;
      }
    }
  }]);

  return Param;
}();

// ------

exports.default = Param;

},{"./cubic-bezier":72,"./main":99}],102:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 54, stdin */\n.blur-layer[data-v-c1fdaa96] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: #00000066; }\n\n/* line 64, stdin */\n.root[data-v-c1fdaa96] {\n  position: absolute;\n  left: calc( 50% - 17em);\n  top: 1em;\n  width: 30em;\n  padding: 1em;\n  overflow: hidden;\n  background: #2c3236;\n  border-radius: 0.5em;\n  color: #c9e2ff;\n  font-size: 0.8em;\n  line-height: 1.2;\n  filter: drop-shadow(0 0 2px #000000); }\n  /* line 80, stdin */\n  .root a[data-v-c1fdaa96] {\n    color: #22aaff;\n    text-decoration: none; }\n    /* line 84, stdin */\n    .root a[data-v-c1fdaa96]:hover {\n      opacity: 0.7; }\n  /* line 87, stdin */\n  .root .logo-bg[data-v-c1fdaa96] {\n    position: absolute;\n    right: -1em;\n    bottom: -1em;\n    width: 14em;\n    opacity: 0.07; }\n  /* line 96, stdin */\n  .root .logo[data-v-c1fdaa96] {\n    width: 20em;\n    margin-bottom: 0.3em; }\n  /* line 101, stdin */\n  .root .version[data-v-c1fdaa96] {\n    display: inline-block;\n    vertical-align: bottom;\n    margin-left: 4px;\n    margin-bottom: 0.3em; }\n  /* line 108, stdin */\n  .root .logo-hr[data-v-c1fdaa96] {\n    width: 100%;\n    height: 1px;\n    margin: 0.5em 0;\n    background: #bad0eb; }\n  /* line 116, stdin */\n  .root .close[data-v-c1fdaa96] {\n    position: absolute;\n    right: 0.5em;\n    top: 0.5em;\n    width: 1em;\n    cursor: pointer; }\n    /* line 124, stdin */\n    .root .close[data-v-c1fdaa96]:hover {\n      opacity: 0.7; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'about',

  props: ['automaton'],

  data: function data() {
    return {};
  },


  methods: {
    blur: function blur() {
      this.$emit('blur');
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blur-layer",on:{"mousedown":_vm.blur}}),_vm._v(" "),_c('div',{staticClass:"root"},[_c('img',{staticClass:"logo-bg",attrs:{"src":require( '../images/automaton-a.svg' )}}),_vm._v(" "),_c('img',{staticClass:"logo",attrs:{"src":require( '../images/automaton.svg' )}}),_vm._v(" "),_c('div',{staticClass:"version"},[_vm._v(_vm._s(_vm.automaton.version))]),_c('br'),_vm._v("\n    Animation engine with Timeline GUI for creative coding\n\n    "),_c('div',{staticClass:"logo-hr"}),_vm._v("\n\n    Author: "),_c('a',{attrs:{"href":"https://github.com/fms-cat/","target":"_blank"}},[_vm._v("@FMS_Cat")]),_c('br'),_vm._v("\n    Repository: "),_c('a',{attrs:{"href":"https://github.com/fms-cat/automaton/","target":"_blank"}},[_vm._v("https://github.com/fms-cat/automaton/")]),_c('br'),_vm._v("\n    Automaton is distributed under permissive "),_c('a',{attrs:{"href":"https://opensource.org/licenses/MIT","target":"_blank"}},[_vm._v("MIT License")]),_vm._v("."),_c('br'),_vm._v("\n    Shoutouts to "),_c('a',{attrs:{"href":"https://www.image-line.com/flstudio/","target":"_blank"}},[_vm._v("Image Line Software")]),_vm._v(" <3\n\n    "),_c('img',{staticClass:"close",attrs:{"src":require( '../images/about-close.svg' )},on:{"mousedown":_vm.blur}})])])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-c1fdaa96"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1fdaa96", __vue__options__)
  } else {
    hotAPI.rerender("data-v-c1fdaa96", __vue__options__)
  }
})()}

},{"../images/about-close.svg":86,"../images/automaton-a.svg":87,"../images/automaton.svg":88,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],103:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 81, stdin */\n.blur-layer[data-v-6f53cdc5] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n\n/* line 89, stdin */\n.root[data-v-6f53cdc5] {\n  position: fixed;\n  white-space: nowrap;\n  padding: 0.4em;\n  font-size: 0.8em;\n  background: rgba(0, 0, 0, 0.5);\n  border: solid 1px #3d4449;\n  color: #bad0eb;\n  border-radius: 0.2em;\n  filter: drop-shadow(0 0 2px #000000); }\n  /* line 102, stdin */\n  .root .command[data-v-6f53cdc5] {\n    padding-left: 0.2em;\n    padding-right: 2em;\n    border-radius: 0.2em;\n    cursor: pointer; }\n    /* line 110, stdin */\n    .root .command[data-v-6f53cdc5]:hover {\n      background: #3d4449;\n      color: #c9e2ff; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'context-menu',

  props: ['active', 'x', 'y', 'commands'],

  data: function data() {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
  },


  methods: {
    blur: function blur() {
      this.$emit('blur');
    },
    moveRoot: function moveRoot() {
      var x = this.x;
      var y = this.y;
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.clientHeight;

      var bLeftSide = w - 240 < x;
      var bUpSide = h - 40 < y;

      this.left = bLeftSide ? null : x;
      this.right = bLeftSide ? w - x : null;
      this.top = bUpSide ? null : y;
      this.bottom = bUpSide ? h - y : null;
    },
    selectCommand: function selectCommand(index) {
      this.commands[index].func();
      this.$emit('blur');
    }
  },

  watch: {
    x: function x() {
      this.moveRoot();
    },
    y: function y() {
      this.moveRoot();
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.active)?_c('div',{staticClass:"blur-layer",on:{"mousedown":_vm.blur}}):_vm._e(),_vm._v(" "),(_vm.active)?_c('div',{staticClass:"root",style:({
      left: typeof _vm.left === 'number' ? (_vm.left + "px") : undefined,
      right: typeof _vm.right === 'number' ? (_vm.right + "px") : undefined,
      top: typeof _vm.top === 'number' ? (_vm.top + "px") : undefined,
      bottom: typeof _vm.bottom === 'number' ? (_vm.bottom + "px") : undefined
    })},_vm._l((_vm.commands),function( command,index){return _c('div',{key:'command'+index,staticClass:"command",on:{"mouseup":function($event){_vm.selectCommand( index )}}},[_vm._v(_vm._s(command.text))])})):_vm._e()])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-6f53cdc5"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f53cdc5", __vue__options__)
  } else {
    hotAPI.rerender("data-v-6f53cdc5", __vue__options__)
  }
})()}

},{"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],104:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 155, stdin */\n.root[data-v-645e0595] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: #3d4449; }\n  /* line 164, stdin */\n  .root .row[data-v-645e0595] {\n    position: absolute;\n    height: calc( 100% - 0.25em);\n    margin: 0.125em; }\n    /* line 169, stdin */\n    .root .row.row-center[data-v-645e0595] {\n      width: calc( 100% - 0.25em);\n      text-align: center; }\n    /* line 173, stdin */\n    .root .row.row-left[data-v-645e0595] {\n      left: 0.125em; }\n    /* line 174, stdin */\n    .root .row.row-right[data-v-645e0595] {\n      right: 0.125em; }\n    /* line 176, stdin */\n    .root .row > *[data-v-645e0595] {\n      display: inline-block;\n      position: relative;\n      vertical-align: bottom;\n      margin: 0 0.125em;\n      height: 100%; }\n    /* line 184, stdin */\n    .root .row .logobox[data-v-645e0595] {\n      color: #c9e2ff;\n      opacity: 0.5;\n      cursor: pointer; }\n      /* line 190, stdin */\n      .root .row .logobox[data-v-645e0595]:hover {\n        opacity: 0.8; }\n      /* line 192, stdin */\n      .root .row .logobox .logo[data-v-645e0595] {\n        display: inline-block;\n        position: relative;\n        height: 60%;\n        top: 20%; }\n    /* line 200, stdin */\n    .root .row .button[data-v-645e0595] {\n      height: 100%;\n      cursor: pointer; }\n      /* line 205, stdin */\n      .root .row .button[data-v-645e0595]:hover {\n        opacity: 0.7; }\n    /* line 208, stdin */\n    .root .row .time[data-v-645e0595] {\n      width: 8em;\n      white-space: nowrap;\n      text-align: right;\n      cursor: pointer; }\n      /* line 216, stdin */\n      .root .row .time *[data-v-645e0595] {\n        pointer-events: none; }\n      /* line 220, stdin */\n      .root .row .time .current[data-v-645e0595] {\n        position: relative;\n        font-size: 0.8em;\n        margin-right: 0;\n        color: #c9e2ff; }\n      /* line 229, stdin */\n      .root .row .time .length[data-v-645e0595] {\n        position: relative;\n        font-size: 0.6em;\n        margin-left: 0;\n        color: #bad0eb; }\n      /* line 237, stdin */\n      .root .row .time .bar[data-v-645e0595] {\n        display: block;\n        position: absolute;\n        bottom: 0.25em;\n        left: 0px;\n        height: 2px;\n        margin: 0; }\n        /* line 245, stdin */\n        .root .row .time .bar.bar-bg[data-v-645e0595] {\n          background: #000000; }\n        /* line 246, stdin */\n        .root .row .time .bar.bar-fg[data-v-645e0595] {\n          background: #c9e2ff; }\n      /* line 250, stdin */\n      .root .row .time:hover .bar-fg[data-v-645e0595] {\n        background: #22aaff; }\n      /* line 254, stdin */\n      .root .row .time.seeking .bar-fg[data-v-645e0595] {\n        background: #22aaff; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {},


  props: ["automaton"],

  data: function data() {
    return {
      saveText: 'Copy current state as JSON',
      seeking: false,
      cantUndoThis: 0
    };
  },


  methods: {
    seek: function seek(event) {
      var _this = this;

      var width = event.target.offsetWidth;
      var xOffset0 = event.offsetX;
      var xClient0 = event.clientX;

      var isPlaying0 = this.automaton.isPlaying;

      if (isPlaying0) {
        this.automaton.pause();
      }
      this.automaton.seek(this.automaton.length * xOffset0 / width);

      this.seeking = true;

      var move = function move(event) {
        var x = xOffset0 + event.clientX - xClient0;
        _this.automaton.seek(_this.automaton.length * x / width);
      };

      var up = function up(event) {
        if (isPlaying0) {
          _this.automaton.play();
        }
        _this.seeking = false;

        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    },
    undo: function undo() {
      if (this.automaton.getUndoDesc()) {
        this.automaton.undo();
        this.cantUndoThis = 0;
      } else {
        this.cantUndoThis++;
        if (10 === this.cantUndoThis) {
          window.open('https://youtu.be/bzY7J0Xle08', '_blank');
          this.cantUndoThis = 0;
        }
      }

      this.$emit('historyMoved');
    },
    redo: function redo() {
      this.automaton.redo();

      this.$emit('historyMoved');
    },
    save: function save() {
      var _this2 = this;

      var el = document.createElement('textarea');
      el.value = this.automaton.save();
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      this.saveText = 'Copied!';
      setTimeout(function () {
        _this2.saveText = 'Copy current state as JSON';
      }, 3000);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"root"},[_c('div',{staticClass:"row row-center"},[_c('div',{staticClass:"logobox",on:{"click":function($event){$event.stopPropagation();_vm.$emit( 'logoClicked' )}}},[_c('img',{staticClass:"logo",attrs:{"src":require( '../images/automaton.svg' )}})])]),_vm._v(" "),_c('div',{staticClass:"row row-left"},[_c('img',{staticClass:"button",attrs:{"src":_vm.automaton.isPlaying ? require( '../images/pause.svg' ) : require( '../images/play.svg' )},on:{"click":function($event){$event.stopPropagation();_vm.automaton.togglePlay()}}}),_vm._v(" "),_c('div',{staticClass:"time",class:{ seeking: _vm.seeking },on:{"mousedown":function($event){$event.stopPropagation();return _vm.seek($event)}}},[_c('span',{staticClass:"current"},[_vm._v(_vm._s(_vm.automaton.time.toFixed( 3 )))]),_vm._v(" "),_c('span',{staticClass:"length"},[_vm._v(" / "+_vm._s(_vm.automaton.length.toFixed( 3 )))]),_vm._v(" "),_c('div',{staticClass:"bar bar-bg",style:({ width: '100%' })}),_vm._v(" "),_c('div',{staticClass:"bar bar-fg",style:({ width: ((_vm.automaton.progress * 100) + "%") })})])]),_vm._v(" "),_c('div',{staticClass:"row row-right"},[_c('img',{staticClass:"button",attrs:{"src":require( '../images/undo.svg' ),"stalker-text":_vm.automaton.getUndoDesc() ? ("Undo: " + (_vm.automaton.getUndoDesc())) : 'Can\'t undo'},on:{"click":function($event){$event.stopPropagation();_vm.undo()}}}),_vm._v(" "),_c('img',{staticClass:"button",attrs:{"src":require( '../images/redo.svg' ),"stalker-text":_vm.automaton.getRedoDesc() ? ("Redo: " + (_vm.automaton.getRedoDesc())) : 'Can\'t redo'},on:{"click":function($event){$event.stopPropagation();_vm.redo()}}}),_vm._v(" "),_c('img',{staticClass:"button",attrs:{"src":require( '../images/snap.svg' ),"stalker-text":"Snap Settings"},on:{"click":function($event){$event.stopPropagation();_vm.$emit( 'configSelected', 'snap' )}}}),_vm._v(" "),_c('img',{staticClass:"button",attrs:{"src":require( '../images/cog.svg' ),"stalker-text":"General Config"},on:{"click":function($event){$event.stopPropagation();_vm.$emit( 'configSelected', 'general' )}}}),_vm._v(" "),_c('img',{staticClass:"button",attrs:{"src":require( '../images/save.svg' ),"stalker-text":_vm.saveText},on:{"click":function($event){$event.stopPropagation();return _vm.save($event)}}})])])])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-645e0595"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-645e0595", __vue__options__)
  } else {
    hotAPI.rerender("data-v-645e0595", __vue__options__)
  }
})()}

},{"../images/automaton.svg":88,"../images/cog.svg":89,"../images/pause.svg":90,"../images/play.svg":91,"../images/redo.svg":92,"../images/save.svg":93,"../images/snap.svg":94,"../images/undo.svg":95,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],105:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("@import url(\"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900\");\n/* line 135, stdin */\n.automaton {\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n  font-size: 16px; }\n/* line 145, stdin */\n.root[data-v-40f1aec1] {\n  user-select: none; }\n  /* line 149, stdin */\n  .root .header[data-v-40f1aec1] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 2em; }\n  /* line 158, stdin */\n  .root .paramlist[data-v-40f1aec1] {\n    position: absolute;\n    left: 0;\n    top: 2em;\n    width: 8em;\n    height: calc( 100% - 2em); }\n  /* line 167, stdin */\n  .root .propmenu[data-v-40f1aec1] {\n    position: absolute;\n    right: 0;\n    top: 2em;\n    width: 12em;\n    height: calc( 100% - 2em); }\n  /* line 175, stdin */\n  .root .timeline[data-v-40f1aec1] {\n    position: absolute;\n    left: 8em;\n    top: 2em;\n    width: calc( 100% - 20em);\n    height: calc( 100% - 2em); }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _about = require('./about.vue');

var _about2 = _interopRequireDefault(_about);

var _header = require('./header.vue');

var _header2 = _interopRequireDefault(_header);

var _paramlist = require('./paramlist.vue');

var _paramlist2 = _interopRequireDefault(_paramlist);

var _propmenu = require('./propmenu.vue');

var _propmenu2 = _interopRequireDefault(_propmenu);

var _timeline = require('./timeline.vue');

var _timeline2 = _interopRequireDefault(_timeline);

var _contextMenu = require('./context-menu.vue');

var _contextMenu2 = _interopRequireDefault(_contextMenu);

var _stalker = require('./stalker.vue');

var _stalker2 = _interopRequireDefault(_stalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    About: _about2.default,
    Header: _header2.default,
    ParamList: _paramlist2.default,
    PropMenu: _propmenu2.default,
    Timeline: _timeline2.default,
    ContextMenu: _contextMenu2.default,
    Stalker: _stalker2.default
  },

  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {},


  props: ['automaton'],

  data: function data() {
    return {
      aboutActive: false,
      selectedParamName: null,
      selectedNodeIds: [],
      selectedFxIds: [],
      config: '',
      contextMenuActive: false,
      contextMenuX: 0,
      contextMenuY: 0,
      contextMenuCommands: []
    };
  },


  methods: {
    selectParam: function selectParam(name) {
      this.selectedParamName = name;
      this.selectNodes([]);
      this.selectFxs([]);
    },
    selectNodes: function selectNodes(arr) {
      this.selectedNodeIds = arr;
      this.config = '';
    },
    selectFxs: function selectFxs(arr) {
      this.selectedFxIds = arr;
      this.config = '';
    },
    onHistoryMoved: function onHistoryMoved() {
      this.selectNodes([]);
      this.selectFxs([]);
    },
    onConfigSelected: function onConfigSelected(config) {
      this.selectNodes([]);
      this.selectFxs([]);
      this.config = config;
    },
    openContextMenu: function openContextMenu(event) {
      this.contextMenuActive = true;
      this.contextMenuX = event.clientX;
      this.contextMenuY = event.clientY;
      this.contextMenuCommands = event.commands;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"root automaton color-theme-dark"},[_c('Header',{staticClass:"header",attrs:{"automaton":_vm.automaton},on:{"historyMoved":_vm.onHistoryMoved,"configSelected":_vm.onConfigSelected,"context":_vm.openContextMenu,"logoClicked":function($event){_vm.aboutActive = true}}}),_vm._v(" "),_c('ParamList',{staticClass:"paramlist",attrs:{"automaton":_vm.automaton,"selectedParamName":_vm.selectedParamName},on:{"selected":function($event){_vm.selectParam( $event )},"context":_vm.openContextMenu}}),_vm._v(" "),_c('PropMenu',{staticClass:"propmenu",attrs:{"automaton":_vm.automaton,"selectedParamName":_vm.selectedParamName,"selectedNodeIds":_vm.selectedNodeIds,"selectedFxIds":_vm.selectedFxIds,"config":_vm.config},on:{"context":_vm.openContextMenu}}),_vm._v(" "),_c('Timeline',{staticClass:"timeline",attrs:{"automaton":_vm.automaton,"selectedParamName":_vm.selectedParamName,"selectedNodeIds":_vm.selectedNodeIds,"selectedFxIds":_vm.selectedFxIds},on:{"nodeSelected":function($event){_vm.selectNodes( $event )},"fxSelected":function($event){_vm.selectFxs( $event )},"context":_vm.openContextMenu}}),_vm._v(" "),(_vm.aboutActive)?_c('About',{staticClass:"about",attrs:{"automaton":_vm.automaton},on:{"blur":function($event){_vm.aboutActive = false}}}):_vm._e(),_vm._v(" "),_c('ContextMenu',{staticClass:"context-menu",attrs:{"active":_vm.contextMenuActive,"x":_vm.contextMenuX,"y":_vm.contextMenuY,"commands":_vm.contextMenuCommands},on:{"blur":function($event){_vm.contextMenuActive = false}}}),_vm._v(" "),_c('Stalker',{staticClass:"stalker"})],1)])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-40f1aec1"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40f1aec1", __vue__options__)
  } else {
    hotAPI.rerender("data-v-40f1aec1", __vue__options__)
  }
})()}

},{"./about.vue":102,"./context-menu.vue":103,"./header.vue":104,"./paramlist.vue":106,"./propmenu.vue":108,"./stalker.vue":110,"./timeline.vue":112,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],106:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 71, stdin */\n.root[data-v-d88e0a5a] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: #202325;\n  color: #c9e2ff; }\n  /* line 81, stdin */\n  .root .param[data-v-d88e0a5a] {\n    position: relative;\n    width: calc( 100% - 4px);\n    height: 1.5em;\n    margin: 2px;\n    background: #2c3236;\n    color: #bad0eb;\n    cursor: pointer; }\n    /* line 92, stdin */\n    .root .param.selected[data-v-d88e0a5a] {\n      background: #3d4449;\n      color: #c9e2ff; }\n    /* line 97, stdin */\n    .root .param .name[data-v-d88e0a5a] {\n      position: absolute;\n      left: 0.2em;\n      top: 0.1em;\n      font-size: 1.1em;\n      user-select: none; }\n    /* line 107, stdin */\n    .root .param .value[data-v-d88e0a5a] {\n      position: absolute;\n      right: 0.2em;\n      bottom: 0.1em;\n      font-size: 0.6em;\n      opacity: 0.7;\n      user-select: none; }\n    /* line 118, stdin */\n    .root .param .warning[data-v-d88e0a5a] {\n      position: absolute;\n      right: 0.1em;\n      bottom: 0.1em;\n      height: calc( 100% - 0.2em); }")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scrollable = require("./scrollable.vue");

var _scrollable2 = _interopRequireDefault(_scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    Scrollable: _scrollable2.default
  },

  props: ["automaton", "selectedParamName"],

  data: function data() {
    return {};
  },


  methods: {
    contextParam: function contextParam(event, name) {
      var _this = this;

      this.$emit('context', {
        clientX: event.clientX,
        clientY: event.clientY,
        commands: [{
          text: 'Select Param',
          func: function func() {
            _this.$emit('selected', name);
          }
        }, {
          text: 'Remove Param',
          func: function func() {
            _this.automaton.removeParam(name);
            _this.$emit('selected', null);
          }
        }]
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Scrollable',{staticClass:"root",attrs:{"bar":"left"}},_vm._l((_vm.automaton.getParamNames()),function(name){return _c('div',{key:'param' + name,staticClass:"param",class:{ selected: name === _vm.selectedParamName },on:{"click":function($event){_vm.$emit( 'selected', name )},"contextmenu":function($event){$event.stopPropagation();$event.preventDefault();_vm.contextParam( $event, name )}}},[_c('div',{staticClass:"name"},[_vm._v(_vm._s(name))]),_vm._v(" "),(_vm.automaton.getParam( name ).isUsed())?_c('div',{staticClass:"value"},[_vm._v(_vm._s(_vm.automaton.auto( name ).toFixed( 3 )))]):_vm._e(),_vm._v(" "),(!_vm.automaton.getParam( name ).isUsed())?_c('img',{staticClass:"warning",attrs:{"src":require( '../images/warning.svg' ),"stalker-text":"This param has not been used yet"}}):_vm._e()])}))],1)}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-d88e0a5a"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d88e0a5a", __vue__options__)
  } else {
    hotAPI.rerender("data-v-d88e0a5a", __vue__options__)
  }
})()}

},{"../images/warning.svg":96,"./scrollable.vue":109,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],107:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 144, stdin */\n.propbox {\n  position: relative;\n  width: 100%;\n  height: 1.25em;\n  margin-bottom: 0.25em; }\n  /* line 150, stdin */\n  .propbox .name {\n    position: absolute;\n    left: 0;\n    top: 0;\n    height: 100%;\n    margin-top: 0.1em; }\n  /* line 159, stdin */\n  .propbox .value {\n    background: #2c3236;\n    cursor: pointer; }\n    /* line 162, stdin */\n    .propbox .value:active:not(.readonly) {\n      background: #0e1011; }\n    /* line 168, stdin */\n    .propbox .value.readonly {\n      cursor: not-allowed; }\n  /* line 173, stdin */\n  .propbox .number {\n    position: absolute;\n    right: 0;\n    top: 0;\n    width: 5em;\n    height: 100%; }\n    /* line 180, stdin */\n    .propbox .number .valueText {\n      width: 100%;\n      margin-top: 0.1em;\n      text-align: center; }\n      /* line 186, stdin */\n      .propbox .number .valueText.readonly {\n        opacity: 0.5; }\n    /* line 191, stdin */\n    .propbox .number .valueInput {\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 100%;\n      border: none;\n      padding: 0;\n      text-align: center;\n      background: #4a545a;\n      color: #c9e2ff; }\n  /* line 206, stdin */\n  .propbox .boolean {\n    position: absolute;\n    right: 1.875em;\n    top: 0;\n    width: 1.25em;\n    height: 100%; }\n    /* line 213, stdin */\n    .propbox .boolean .booleanCheck {\n      position: absolute;\n      left: 20%;\n      top: 20%;\n      width: 60%;\n      height: 60%;\n      background: #22aaff; }\n      /* line 222, stdin */\n      .propbox .boolean .booleanCheck.readonly {\n        background: #687788;\n        opacity: 0.5; }")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require("babel-runtime/core-js/math/log10");

var _log2 = _interopRequireDefault(_log);

var _sign = require("babel-runtime/core-js/math/sign");

var _sign2 = _interopRequireDefault(_sign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mouseEvents = function mouseEvents(move, up) {
  var u = function u(event) {
    if (typeof up === "function") {
      up(event);
    }

    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", u);
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", u);
};

exports.default = {
  name: 'propbox',

  props: ['name', 'value', 'type', 'min', 'max', 'readonly'],

  data: function data() {
    return {
      input: false,
      lastClick: 0
    };
  },


  methods: {
    nMousedown: function nMousedown(event) {
      var _this = this;

      if (this.readonly) {
        return;
      }

      var now = Date.now();
      if (now - this.lastClick < 500) {
        this.input = true;
        this.$refs.valueInput.value = this.value;
        setTimeout(function () {
          _this.$refs.valueInput.focus();
          _this.$refs.valueInput.select();
        }, 10);
      }
      this.lastClick = now;

      var y0 = event.clientY;
      var lastY = y0;
      var v0 = Number(this.value);

      mouseEvents(function (event) {
        var v = Number(_this.value);
        var y = event.clientY;
        var dy = lastY - y;
        lastY = y;

        if (_this.type === 'int') {
          v = v0 - Math.floor((y - y0) / 10.0);
        } else if (event.shiftKey) {
          var dyAbs = Math.abs(dy);
          var dySign = (0, _sign2.default)(dy);
          for (var i = 0; i < dyAbs; i++) {
            var vAbs = Math.abs(v);
            var vSign = (0, _sign2.default)(v + 1E-4 * dySign);
            var order = Math.floor((0, _log2.default)(vAbs + 1E-4 * dySign * vSign)) - 1 - (event.altKey ? 1 : 0);
            v += Math.max(0.001, Math.pow(10.0, order)) * dySign;
          }
        } else {
          v += dy * (event.altKey ? 0.001 : 0.01);
        }

        if (_this.max) {
          v = Math.min(v, parseFloat(_this.max));
        }
        if (_this.min) {
          v = Math.max(v, parseFloat(_this.min));
        }
        v = _this.type === 'int' ? v : Number(v.toFixed(3));
        _this.$emit('changed', v);
      }, function (event) {
        if (v0 === Number(_this.value)) {
          return;
        }
        _this.$emit('finished', [v0, Number(_this.value)]);
      });
    },
    nEnter: function nEnter(event) {
      var v = parseFloat(this.$refs.valueInput.value);
      if (this.type === 'int') {
        v = Math.round(v);
      }

      this.$emit('changed', v);
      this.$emit('finished', [Number(this.value), v]);
      this.input = false;
    },
    nBlur: function nBlur(event) {
      this.input = false;
    },
    bToggle: function bToggle(event) {
      if (this.readonly) {
        return;
      }

      var v = !this.value;
      this.$emit('changed', v);
      this.$emit('finished', [!v, v]);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"propbox"},[_c('div',{staticClass:"name"},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),(_vm.type === 'float' || _vm.type === 'int')?_c('div',{staticClass:"value number",class:{ readonly: _vm.readonly }},[_c('div',{staticClass:"valueText",class:{ readonly: _vm.readonly },on:{"mousedown":_vm.nMousedown}},[_vm._v(_vm._s(_vm.type === 'int' ? _vm.value : _vm.value.toFixed( 3 )))]),_vm._v(" "),_c('input',{directives:[{name:"show",rawName:"v-show",value:(_vm.input),expression:"input"}],ref:"valueInput",staticClass:"valueInput",on:{"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.nEnter($event)},"blur":_vm.nBlur}})]):_vm._e(),_vm._v(" "),(_vm.type === 'boolean')?_c('div',{staticClass:"value boolean",class:{ readonly: _vm.readonly },on:{"click":_vm.bToggle}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.value),expression:"value"}],staticClass:"booleanCheck"})]):_vm._e()])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-de9feda0", __vue__options__)
  } else {
    hotAPI.rerender("data-v-de9feda0", __vue__options__)
  }
})()}

},{"babel-runtime/core-js/math/log10":2,"babel-runtime/core-js/math/sign":3,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],108:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 331, stdin */\n.root[data-v-4491d86c] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: #202325;\n  color: #c9e2ff; }\n  /* line 341, stdin */\n  .root .props[data-v-4491d86c] {\n    padding: 0.75em 1.5em;\n    font-size: 0.75em; }\n    /* line 345, stdin */\n    .root .props .title[data-v-4491d86c] {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      font-size: 1.5em;\n      color: #22aaff; }\n    /* line 354, stdin */\n    .root .props hr[data-v-4491d86c] {\n      border: solid 1px #2c3236; }\n    /* line 358, stdin */\n    .root .props .centering[data-v-4491d86c] {\n      text-align: center; }\n      /* line 361, stdin */\n      .root .props .centering .button-confirm[data-v-4491d86c] {\n        display: inline-block;\n        width: 4em;\n        padding: 0.25em;\n        background: #2c3236;\n        cursor: pointer; }\n        /* line 370, stdin */\n        .root .props .centering .button-confirm[data-v-4491d86c]:hover {\n          background: #0e1011; }\n  /* line 375, stdin */\n  .root .logobox[data-v-4491d86c] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden; }\n    /* line 383, stdin */\n    .root .logobox .logo[data-v-4491d86c] {\n      position: absolute;\n      width: 8em;\n      left: calc( 50% - 4em);\n      top: calc( 50% - 4em);\n      opacity: 0.1; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propbox = require('./propbox.vue');

var _propbox2 = _interopRequireDefault(_propbox);

var _scrollable = require('./scrollable.vue');

var _scrollable2 = _interopRequireDefault(_scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'propmenu',

  props: ['automaton', 'selectedParamName', 'selectedNodeIds', 'selectedFxIds', 'config'],

  components: {
    Propbox: _propbox2.default,
    Scrollable: _scrollable2.default
  },

  data: function data() {
    return {
      generalConfigs: {
        length: 0,
        resolution: 0
      }
    };
  },


  methods: {
    confirmGeneralConfigs: function confirmGeneralConfigs() {
      this.automaton.setLength(this.generalConfigs.length);
      this.automaton.setResolution(this.generalConfigs.resolution);
    }
  },

  computed: {
    selectedParam: function selectedParam() {
      return this.automaton.getParam(this.selectedParamName);
    },
    selectedNodeId: function selectedNodeId() {
      return this.selectedNodeIds.length === 1 ? this.selectedNodeIds[0] : null;
    },
    selectedNode: function selectedNode() {
      return this.selectedNodeIds.length === 1 ? this.selectedParam.dumpNode(this.selectedNodeId) : null;
    },
    selectedFxId: function selectedFxId() {
      return this.selectedFxIds.length === 1 ? this.selectedFxIds[0] : null;
    },
    selectedFx: function selectedFx() {
      return this.selectedFxIds.length === 1 ? this.selectedParam.dumpFx(this.selectedFxId) : null;
    }
  },

  watch: {
    config: function config() {
      if (this.config === 'general') {
        this.generalConfigs.length = this.automaton.length;
        this.generalConfigs.resolution = this.automaton.resolution;
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Scrollable',{staticClass:"root",attrs:{"bar":"right"}},[(_vm.selectedNode)?_c('div',{staticClass:"props"},[_c('div',{staticClass:"title"},[_vm._v("Node")]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"Time","value":_vm.selectedNode.time,"readonly":!( _vm.selectedNode.in && _vm.selectedNode.out )},on:{"changed":function($event){_vm.selectedParam.moveNode( _vm.selectedNodeId, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Change Node Time', function () {
            _vm.selectedParam.moveNode( _vm.selectedNodeId, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.moveNode( _vm.selectedNodeId, $event[ 0 ] );
          } );}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"Value","value":_vm.selectedNode.value},on:{"changed":function($event){_vm.selectedParam.moveNode( _vm.selectedNodeId, undefined, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Change Node Value', function () {
            _vm.selectedParam.moveNode( _vm.selectedNodeId, undefined, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.moveNode( _vm.selectedNodeId, undefined, $event[ 0 ] );
          } );}}}),_vm._v(" "),_c('hr'),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"In Time","value":_vm.selectedNode.in ? _vm.selectedNode.in.time : 0,"readonly":!_vm.selectedNode.in},on:{"changed":function($event){_vm.selectedParam.moveHandle( _vm.selectedNodeId, false, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Change Node Time', function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, false, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, false, $event[ 0 ] );
          } );}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"In Value","value":_vm.selectedNode.in ? _vm.selectedNode.in.value : 0,"readonly":!_vm.selectedNode.in},on:{"changed":function($event){_vm.selectedParam.moveHandle( _vm.selectedNodeId, false, undefined, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Change Node Value', function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, false, undefined, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, false, undefined, $event[ 0 ] );
          } );}}}),_vm._v(" "),_c('hr'),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"Out Time","value":_vm.selectedNode.out ? _vm.selectedNode.out.time : 0,"readonly":!_vm.selectedNode.out},on:{"changed":function($event){_vm.selectedParam.moveHandle( _vm.selectedNodeId, true, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Change Node Time', function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, true, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, true, $event[ 0 ] );
          } );}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"Out Value","value":_vm.selectedNode.out ? _vm.selectedNode.out.value : 0,"readonly":!_vm.selectedNode.out},on:{"changed":function($event){_vm.selectedParam.moveHandle( _vm.selectedNodeId, true, undefined, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Change Node Value', function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, true, undefined, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.moveHandle( _vm.selectedNodeId, true, undefined, $event[ 0 ] );
          } );}}})],1):_vm._e(),_vm._v(" "),(_vm.selectedFx)?_c('div',{staticClass:"props"},[_c('div',{staticClass:"title"},[_vm._v("Fx: "+_vm._s(_vm.automaton.getFxDefinitionName( _vm.selectedFx.def )))]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"Time","value":_vm.selectedFx.time},on:{"changed":function($event){_vm.selectedParam.moveFx( _vm.selectedFxId, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Move Fx', function () {
            _vm.selectedParam.moveFx( _vm.selectedFxId, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.moveFx( _vm.selectedFxId, $event[ 0 ] );
          } );}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"float","name":"Length","value":_vm.selectedFx.length},on:{"changed":function($event){_vm.selectedParam.resizeFx( _vm.selectedFxId, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Move Fx', function () {
            _vm.selectedParam.resizeFx( _vm.selectedFxId, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.resizeFx( _vm.selectedFxId, $event[ 0 ] );
          } );}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"type":"boolean","name":"Bypass","value":_vm.selectedFx.bypass},on:{"finished":function($event){_vm.automaton.pushHistory( 'Toggle Bypass Fx', function () {
            _vm.selectedParam.bypassFx( _vm.selectedFxId, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.bypassFx( _vm.selectedFxId, $event[ 0 ] );
          }, true );}}}),_vm._v(" "),_c('hr'),_vm._v(" "),_vm._l((_vm.automaton.getFxDefinitionParams( _vm.selectedFx.def )),function( param,key){return _c('Propbox',{key:'fxParam-'+key,staticClass:"prop",attrs:{"type":param.type,"name":param.name || key,"value":_vm.selectedFx.params[ key ]},on:{"changed":function($event){_vm.selectedParam.changeFxParam( _vm.selectedFxId, key, $event )},"finished":function($event){_vm.automaton.pushHistory( 'Change Fx Param', function () {
            _vm.selectedParam.changeFxParam( _vm.selectedFxId, key, $event[ 1 ] );
          }, function () {
            _vm.selectedParam.changeFxParam( _vm.selectedFxId, key, $event[ 0 ] );
          } );}}})})],2):_vm._e(),_vm._v(" "),(_vm.config === 'snap')?_c('div',{staticClass:"props"},[_c('div',{staticClass:"title"},[_vm._v("Snap Settings")]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"name":"Enable Snap","type":"boolean","value":_vm.automaton.guiSettings.snapActive},on:{"changed":function($event){_vm.automaton.guiSettings.snapActive = $event}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"name":"Interval (Time)","min":"0.0","type":"float","value":_vm.automaton.guiSettings.snapTime},on:{"changed":function($event){_vm.automaton.guiSettings.snapTime = $event}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"name":"Interval (Value)","min":"0.0","type":"float","value":_vm.automaton.guiSettings.snapValue},on:{"changed":function($event){_vm.automaton.guiSettings.snapValue = $event}}})],1):_vm._e(),_vm._v(" "),(_vm.config === 'general')?_c('div',{staticClass:"props"},[_c('div',{staticClass:"title"},[_vm._v("General Config")]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"name":"Length","type":"float","min":"0","value":_vm.generalConfigs.length},on:{"changed":function($event){_vm.generalConfigs.length = $event}}}),_vm._v(" "),_c('Propbox',{staticClass:"prop",attrs:{"name":"Resolution","type":"int","min":"1","value":_vm.generalConfigs.resolution},on:{"changed":function($event){_vm.generalConfigs.resolution = $event}}}),_vm._v(" "),_c('hr'),_vm._v(" "),_c('div',{staticClass:"centering"},[_vm._v("\n        This cannot be undone!\n        "),_c('div',{staticClass:"button-confirm",on:{"click":_vm.confirmGeneralConfigs}},[_vm._v("Apply")])])],1):_vm._e()]),_vm._v(" "),(!_vm.selectedNode && !_vm.selectedFx && !_vm.config)?_c('div',{staticClass:"logobox"},[_c('img',{staticClass:"logo",attrs:{"src":require( '../images/automaton-a.svg' )}})]):_vm._e()],1)}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-4491d86c"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4491d86c", __vue__options__)
  } else {
    hotAPI.rerender("data-v-4491d86c", __vue__options__)
  }
})()}

},{"../images/automaton-a.svg":87,"./propbox.vue":107,"./scrollable.vue":109,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],109:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 77, stdin */\n.root[data-v-6dab48a2] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  /* line 83, stdin */\n  .root .inside[data-v-6dab48a2] {\n    position: absolute;\n    left: 0;\n    width: 100%; }\n  /* line 89, stdin */\n  .root .bar[data-v-6dab48a2] {\n    position: absolute;\n    width: 4px;\n    background: #22aaff;\n    border-radius: 2px; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['bar'],

  data: function data() {
    return {
      top: 0,
      barOpacity: 0.0
    };
  },


  methods: {
    onWheel: function onWheel(event) {
      event.preventDefault();

      this.top = this.top - event.deltaY;

      var scrollMax = this.$refs.inside.clientHeight - this.$refs.root.clientHeight;
      if (this.top < -scrollMax) {
        var overrun = -scrollMax - this.top;
        this.top = -scrollMax;
      }

      if (0 < this.top) {
        var _overrun = this.top;
        this.top = 0;
      }

      this.barHeight = 100.0 * this.$refs.root.clientHeight / this.$refs.inside.clientHeight;
      this.barTop = -100.0 * this.top / this.$refs.inside.clientHeight;
      this.barOpacity += Math.min(this.barOpacity + 0.1 * Math.abs(event.deltaY), 1.0);
    },
    update: function update() {
      this.barOpacity *= 0.9;
    }
  },

  mounted: function mounted() {
    var _this = this;

    var update = function update() {
      _this.update();
      requestAnimationFrame(update);
    };
    update();
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"root",staticClass:"root",on:{"wheel":function($event){$event.stopPropagation();return _vm.onWheel($event)}}},[_c('div',{ref:"inside",staticClass:"inside",style:({ top: _vm.top + 'px' })},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"bar",style:({
        top: _vm.barTop + '%',
        height: _vm.barHeight + '%',
        left: _vm.bar === 'left' ? 0 : undefined,
        right: _vm.bar === 'right' ? 0 : undefined,
        opacity: _vm.barOpacity
      })})])])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-6dab48a2"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6dab48a2", __vue__options__)
  } else {
    hotAPI.rerender("data-v-6dab48a2", __vue__options__)
  }
})()}

},{"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],110:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 71, stdin */\n.root[data-v-47615034] {\n  position: fixed;\n  pointer-events: none;\n  white-space: nowrap;\n  padding: 0.2em 0.4em;\n  margin: 10px;\n  font-size: 0.8em;\n  background: rgba(0, 0, 0, 0.8);\n  color: #c9e2ff;\n  border-radius: 0.2em; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'stalker',

  data: function data() {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      text: ''
    };
  },


  methods: {
    applyStalkerText: function applyStalkerText(el) {
      var _this = this;

      setTimeout(function () {
        _this.text = el.getAttribute('stalker-text');
      }, 10);
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    window.addEventListener('mousemove', function (event) {
      var x = event.clientX;
      var y = event.clientY;
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.clientHeight;

      var bLeftSide = w - 240 < x;
      var bUpSide = h - 40 < y;

      _this2.left = bLeftSide ? null : x;
      _this2.right = bLeftSide ? w - x : null;
      _this2.top = bUpSide ? null : y;
      _this2.bottom = bUpSide ? h - y : null;

      _this2.applyStalkerText(event.target);
    });

    window.addEventListener('mousedown', function (event) {
      _this2.applyStalkerText(event.target);
    });

    window.addEventListener('mouseup', function (event) {
      _this2.applyStalkerText(event.target);
    });
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.text)?_c('div',{staticClass:"root",style:({
      left: typeof _vm.left === 'number' ? (_vm.left + "px") : undefined,
      right: typeof _vm.right === 'number' ? (_vm.right + "px") : undefined,
      top: typeof _vm.top === 'number' ? (_vm.top + "px") : undefined,
      bottom: typeof _vm.bottom === 'number' ? (_vm.bottom + "px") : undefined
    })},[_vm._v("\n    "+_vm._s(_vm.text)+"\n  ")]):_vm._e()])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-47615034"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47615034", __vue__options__)
  } else {
    hotAPI.rerender("data-v-47615034", __vue__options__)
  }
})()}

},{"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],111:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 125, stdin */\n.blur-layer[data-v-956d0136] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n\n/* line 133, stdin */\n.root[data-v-956d0136] {\n  position: absolute;\n  left: calc( 50% - 10em);\n  top: 1em;\n  width: 20em;\n  height: calc( 100% - 2em);\n  overflow: hidden;\n  background: #0e1011;\n  font-size: 0.8em;\n  filter: drop-shadow(0 0 2px #000000); }\n  /* line 146, stdin */\n  .root .search-box[data-v-956d0136] {\n    position: relative;\n    font-size: 1em;\n    width: calc( 100% - 12px);\n    margin: 2px;\n    padding: 2px 4px;\n    border: none;\n    background: #3d4449;\n    color: #c9e2ff; }\n  /* line 158, stdin */\n  .root .fx-names[data-v-956d0136] {\n    position: relative;\n    width: 100%;\n    height: calc( 100% - 1em - 12px); }\n    /* line 163, stdin */\n    .root .fx-names .fx-name[data-v-956d0136] {\n      position: relative;\n      width: calc( 100% - 12px);\n      margin: 2px;\n      padding: 2px 4px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      background: #202325;\n      cursor: pointer; }\n      /* line 176, stdin */\n      .root .fx-names .fx-name[data-v-956d0136]:hover {\n        background: #2c3236; }\n      /* line 177, stdin */\n      .root .fx-names .fx-name.selected[data-v-956d0136] {\n        background: #2c3236; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _scrollable = require('./scrollable.vue');

var _scrollable2 = _interopRequireDefault(_scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ['automaton', 'active'],

  components: {
    Scrollable: _scrollable2.default
  },

  data: function data() {
    return {
      fxDefs: [],
      searchText: '',
      selectedIndex: 0
    };
  },


  methods: {
    filterDef: function filterDef(id) {
      var queries = this.searchText.split(/\s+/);
      var name = this.automaton.getFxDefinitionName(id);
      return queries.every(function (query) {
        return name.toLowerCase().includes(query.toLowerCase()) || id.toLowerCase().includes(query.toLowerCase());
      });
    },
    select: function select(id) {
      if (id === '') {
        this.blur();return;
      }
      this.$emit('selected', id);
      this.fxDefs.splice(this.fxDefs.indexOf(id), 1);
      this.fxDefs.unshift(id);
      this.blur();
    },
    blur: function blur() {
      this.$emit('blur');
      this.searchText = '';
      this.selectedIndex = 0;
    },
    onSearchBoxKeydown: function onSearchBoxKeydown(event) {
      if (event.which === 13) {
        this.select(this.fxDefsFiltered[this.selectedIndex]);
      } else if (event.which === 27) {
        this.blur();
      } else if (event.which === 38) {
        this.selectedIndex = (this.selectedIndex - 1 + this.fxDefsFiltered.length) % this.fxDefsFiltered.length;
      } else if (event.which === 40) {
        this.selectedIndex = (this.selectedIndex + 1) % this.fxDefsFiltered.length;
      } else {
        this.selectedIndex = 0;
      }
    }
  },

  mounted: function mounted() {
    this.fxDefs = this.automaton.getFxDefinitionIds();
  },


  computed: {
    fxDefsFiltered: function fxDefsFiltered() {
      var _fxDefs,
          _this = this;

      (_fxDefs = this.fxDefs).push.apply(_fxDefs, (0, _toConsumableArray3.default)(this.automaton.getFxDefinitionIds().filter(function (id) {
        return _this.fxDefs.indexOf(id) === -1;
      })));

      var arr = this.fxDefs.filter(function (id) {
        return _this.filterDef(id);
      });
      return arr.length === 0 ? [''] : arr;
    }
  },

  watch: {
    active: function active(v) {
      var _this2 = this;

      if (!v) {
        return;
      }
      setTimeout(function () {
        _this2.$refs.searchBox.focus();
      }, 10);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.active)?_c('div',{staticClass:"blur-layer",on:{"mousedown":_vm.blur}}):_vm._e(),_vm._v(" "),(_vm.active)?_c('div',{staticClass:"root"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchText),expression:"searchText"}],ref:"searchBox",staticClass:"search-box",attrs:{"type":"text","placeholder":"Add a fx..."},domProps:{"value":(_vm.searchText)},on:{"keydown":_vm.onSearchBoxKeydown,"input":function($event){if($event.target.composing){ return; }_vm.searchText=$event.target.value}}}),_vm._v(" "),_c('Scrollable',{staticClass:"fx-names",attrs:{"bar":"right"}},_vm._l((_vm.fxDefsFiltered),function( id,index){return _c('div',{key:id,staticClass:"fx-name",class:{ selected: index === _vm.selectedIndex },attrs:{"stalker-text":_vm.automaton.getFxDefinitionDescription( id ) || '(no description provided)'},on:{"mousedown":function($event){_vm.select( id )}}},[_vm._v("\n        "+_vm._s(id ? _vm.automaton.getFxDefinitionName( id ) : '(No result found)')+"\n      ")])}))],1):_vm._e()])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-956d0136"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-956d0136", __vue__options__)
  } else {
    hotAPI.rerender("data-v-956d0136", __vue__options__)
  }
})()}

},{"./scrollable.vue":109,"babel-runtime/helpers/toConsumableArray":4,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}],112:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("/* line 1018, stdin */\n.root[data-v-3873fd6e] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  color: #c9e2ff; }\n  /* line 1027, stdin */\n  .root .hbar[data-v-3873fd6e] {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    height: 4px;\n    background: #000000; }\n    /* line 1036, stdin */\n    .root .hbar .vision[data-v-3873fd6e] {\n      position: absolute;\n      bottom: 0;\n      height: 100%;\n      border-radius: 2px;\n      background: #22aaff; }\n  /* line 1047, stdin */\n  .root .svg[data-v-3873fd6e] {\n    background: #0e1011;\n    font-size: 10px;\n    pointer-events: none; }\n    /* line 1054, stdin */\n    .root .svg .grid[data-v-3873fd6e] {\n      stroke: #c9e2ff;\n      stroke-width: 1; }\n    /* line 1059, stdin */\n    .root .svg .grid-text[data-v-3873fd6e] {\n      fill: #c9e2ff; }\n    /* line 1063, stdin */\n    .root .svg .graph[data-v-3873fd6e] {\n      fill: none;\n      stroke: #c9e2ff;\n      stroke-width: 2; }\n    /* line 1069, stdin */\n    .root .svg .currentLine[data-v-3873fd6e] {\n      stroke: #22aaff;\n      stroke-width: 2; }\n    /* line 1074, stdin */\n    .root .svg .currentText[data-v-3873fd6e] {\n      fill: #22aaff; }\n    /* line 1078, stdin */\n    .root .svg .currentPoint[data-v-3873fd6e] {\n      fill: #22aaff; }\n    /* line 1084, stdin */\n    .root .svg .node .handle .line[data-v-3873fd6e] {\n      stroke: #22aaff;\n      stroke-width: 1; }\n    /* line 1089, stdin */\n    .root .svg .node .handle .circle[data-v-3873fd6e] {\n      fill: #22aaff;\n      pointer-events: auto;\n      cursor: pointer; }\n    /* line 1097, stdin */\n    .root .svg .node .body[data-v-3873fd6e] {\n      fill: #0e1011;\n      stroke: #22aaff;\n      stroke-width: 2;\n      pointer-events: auto;\n      cursor: pointer; }\n      /* line 1105, stdin */\n      .root .svg .node .body.selected[data-v-3873fd6e] {\n        fill: #22aaff; }\n    /* line 1112, stdin */\n    .root .svg .fx .line[data-v-3873fd6e] {\n      stroke: #0fd895;\n      stroke-width: 1;\n      stroke-dasharray: 4; }\n    /* line 1118, stdin */\n    .root .svg .fx .fill[data-v-3873fd6e] {\n      fill: #0fd895;\n      opacity: 0.1; }\n    /* line 1123, stdin */\n    .root .svg .fx .body[data-v-3873fd6e] {\n      fill: #0e1011;\n      stroke: #0fd895;\n      stroke-width: 2;\n      pointer-events: auto;\n      cursor: pointer; }\n      /* line 1128, stdin */\n      .root .svg .fx .body.bypass[data-v-3873fd6e] {\n        fill: #0e1011;\n        stroke: #687788; }\n      /* line 1133, stdin */\n      .root .svg .fx .body.selected[data-v-3873fd6e] {\n        fill: #0fd895;\n        stroke: #0e1011; }\n        /* line 1137, stdin */\n        .root .svg .fx .body.selected.bypass[data-v-3873fd6e] {\n          fill: #687788;\n          stroke: #0e1011; }\n    /* line 1147, stdin */\n    .root .svg .fx .text[data-v-3873fd6e] {\n      fill: #0fd895; }\n      /* line 1149, stdin */\n      .root .svg .fx .text.bypass[data-v-3873fd6e] {\n        fill: #687788; }\n      /* line 1150, stdin */\n      .root .svg .fx .text.selected[data-v-3873fd6e] {\n        fill: #0e1011; }\n    /* line 1153, stdin */\n    .root .svg .fx .side[data-v-3873fd6e] {\n      fill: rgba(0, 0, 0, 0);\n      pointer-events: auto;\n      cursor: ew-resize; }")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('babel-runtime/core-js/math/log10');

var _log2 = _interopRequireDefault(_log);

var _paramGui = require('../param-gui');

var _paramGui2 = _interopRequireDefault(_paramGui);

var _timelineFxmenu = require('./timeline-fxmenu.vue');

var _timelineFxmenu2 = _interopRequireDefault(_timelineFxmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mouseEvents = function mouseEvents(move, up) {
  var u = function u(event) {
    if (up) {
      up(event);
    }

    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", u);
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", u);
};

exports.default = {
  components: {
    FxMenu: _timelineFxmenu2.default
  },

  props: ["automaton", "selectedParamName", "selectedNodeIds", "selectedFxIds"],

  data: function data() {
    return {
      width: 100,
      height: 100,

      t0: 0.0,
      t1: this.automaton.length,
      v0: -0.25,
      v1: 1.25,

      grid: {
        x: [],
        y: []
      },

      graphPoints: '',

      fxmenuActive: false,
      fxmenuTime: 0
    };
  },


  methods: {
    updateGrid: function updateGrid() {
      this.grid = {
        x: [],
        y: []
      };

      {
        var delta = this.t1 - this.t0;
        var logDelta = (0, _log2.default)(delta);
        var scale = Math.pow(10.0, Math.floor(logDelta) - 1.0);
        var intrv = logDelta - Math.floor(logDelta);
        var num = Math.floor(this.t0 / scale);
        var begin = num * scale;
        var accent10 = num - Math.floor(num / 10) * 10;
        var accent100 = num - Math.floor(num / 100) * 100;

        for (var v = begin; v < this.t1; v += scale) {
          var op = accent100 === 0 ? 0.4 : accent10 === 0 ? 0.4 - intrv * 0.3 : 0.1 - intrv * 0.3;
          if (0.0 < op) {
            this.grid.x.push({
              val: v + 1E-9,
              pos: this.t2x(v),
              op: op
            });
          }
          accent10 = (accent10 + 1) % 10;
          accent100 = (accent100 + 1) % 100;
        }
      }

      {
        var _delta = this.v1 - this.v0;
        var _logDelta = (0, _log2.default)(_delta);
        var _scale = Math.pow(10.0, Math.floor(_logDelta) - 1.0);
        var _intrv = _logDelta - Math.floor(_logDelta);
        var _num = Math.floor(this.v0 / _scale);
        var _begin = _num * _scale;
        var _accent = _num - Math.floor(_num / 10) * 10;
        var _accent2 = _num - Math.floor(_num / 100) * 100;

        for (var _v = _begin; _v < this.v1; _v += _scale) {
          var _op = _accent2 === 0 ? 0.4 : _accent === 0 ? 0.4 - _intrv * 0.3 : 0.1 - _intrv * 0.3;
          if (0.0 < _op) {
            this.grid.y.push({
              val: _v + 1E-9,
              pos: this.v2y(_v),
              op: _op
            });
          }
          _accent = (_accent + 1) % 10;
          _accent2 = (_accent2 + 1) % 100;
        }
      }
    },
    updateGraph: function updateGraph() {
      var param = this.selectedParam;
      if (!param) {
        return;
      }

      var points = '';

      for (var x = 0; x <= this.width; x++) {
        var t = this.x2t(x);
        var v = param.getValue(t);
        var y = this.v2y(v);
        points += x + ' ' + y + ' ';
      }

      this.graphPoints = points;
    },
    x2t: function x2t(x) {
      var u = x / this.width;
      return u * (this.t1 - this.t0) + this.t0;
    },
    t2x: function t2x(t) {
      var u = (t - this.t0) / (this.t1 - this.t0);
      return u * this.width;
    },
    y2v: function y2v(y) {
      var u = 1.0 - y / this.height;
      return u * (this.v1 - this.v0) + this.v0;
    },
    v2y: function v2y(v) {
      var u = 1.0 - (v - this.v0) / (this.v1 - this.v0);
      return u * this.height;
    },
    moveView: function moveView(dx, dy) {
      var dt = this.x2t(0.0) - this.x2t(dx);
      var dv = this.y2v(0.0) - this.y2v(dy);

      dt = Math.min(Math.max(dt, -this.t0), this.automaton.length - this.t1);

      this.t0 += dt;this.t1 += dt;
      this.v0 += dv;this.v1 += dv;

      this.updateGrid();
      this.updateGraph();
    },
    zoomView: function zoomView(ct, cv, dx, dy) {
      var rt = (ct - this.t0) / (this.t1 - this.t0);
      var rv = (cv - this.v0) / (this.v1 - this.v0);

      var dt = this.t1 - this.t0;
      dt *= Math.pow((this.width + 1.0) / this.width, dx * 2.0);
      dt = Math.min(Math.max(dt, 0.01), 1000.0);

      var dv = this.v1 - this.v0;
      dv *= Math.pow((this.width + 1.0) / this.width, dy * 2.0);
      dv = Math.min(Math.max(dv, 0.01), 1000.0);

      this.t0 = ct - rt * dt;
      this.t1 = ct + (1.0 - rt) * dt;
      this.v0 = cv - rv * dv;
      this.v1 = cv + (1.0 - rv) * dv;

      if (this.t0 < 0.0) {
        this.t1 = Math.max(this.t1 - this.t0, this.t1);
      }
      if (this.automaton.length < this.t1) {
        this.t0 += this.automaton.length - this.t1;
      }
      if (this.t0 < 0.0) {
        this.t0 = 0.0;
      }
      if (this.automaton.length < this.t1) {
        this.t1 = this.automaton.length;
      }

      this.updateGrid();
      this.updateGraph();
    },
    createNode: function createNode(t, v) {
      var param = this.selectedParam;

      var id = param.createNode(t, v);
      var data = param.dumpNode(id);

      this.$emit('nodeSelected', [id]);
      this.$emit('fxSelected', []);

      this.automaton.pushHistory('Create Node', function () {
        return param.createNodeFromData(data);
      }, function () {
        return param.removeNode(id);
      });
    },
    removeNode: function removeNode(id) {
      var param = this.selectedParam;

      var node = param.dumpNode(id);
      if (!(node.in && node.out)) {
        return;
      }

      this.automaton.pushHistory('Remove Node', function () {
        return param.removeNode(id);
      }, function () {
        return param.createNodeFromData(node);
      }, true);

      this.$emit('nodeSelected', []);
    },
    removeHandle: function removeHandle(id, isOut) {
      var param = this.selectedParam;
      var node = param.dumpNode(id);

      var t0 = isOut ? node.out.time : node.in.time;
      var v0 = isOut ? node.out.value : node.in.value;

      param.moveHandle(id, isOut, 0.0, 0.0);

      this.automaton.pushHistory('Remove Handle', function () {
        return param.moveHandle(id, isOut, 0.0, 0.0);
      }, function () {
        return param.moveHandle(id, isOut, t0, v0);
      }, true);
    },
    resetHandles: function resetHandles(id) {
      var param = this.selectedParam;
      var node = param.dumpNode(id);

      this.automaton.pushHistory('Reset Handle', function () {
        param.resetHandle(id, false);
        param.resetHandle(id, true);
      }, function () {
        param.moveHandle(id, false, node.in.time, node.in.value);
        param.moveHandle(id, true, node.out.time, node.out.value);
      }, true);
    },
    grabHelper: function grabHelper(event, callback) {
      var _this = this;

      var x0 = event.clientX;
      var y0 = event.clientY;
      var t0 = this.x2t(x0);
      var v0 = this.y2v(y0);

      var move = function move(event) {
        var dt = _this.x2t(event.clientX) - t0;
        var dv = _this.y2v(event.clientY) - v0;

        callback(dt, dv, event);
      };

      var up = function up(event) {
        var dt = _this.x2t(event.clientX) - t0;
        var dv = _this.y2v(event.clientY) - v0;

        callback(dt, dv, event, true);

        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    },
    snapTime: function snapTime(time) {
      if (!this.automaton.guiSettings.snapActive) {
        return time;
      }

      var interval = this.automaton.guiSettings.snapTime;
      var width = 5.0 / this.width * (this.t1 - this.t0);
      var nearest = Math.round(time / interval) * interval;
      return Math.abs(time - nearest) < width ? nearest : time;
    },
    snapValue: function snapValue(value) {
      if (!this.automaton.guiSettings.snapActive) {
        return value;
      }

      var interval = this.automaton.guiSettings.snapValue;
      var width = 5.0 / this.height * (this.v1 - this.v0);
      var nearest = Math.round(value / interval) * interval;
      return Math.abs(value - nearest) < width ? nearest : value;
    },
    grabNode: function grabNode(id, event) {
      var _this2 = this;

      var param = this.selectedParam;

      this.$emit('nodeSelected', [id]);
      this.$emit('fxSelected', []);

      var node = param.dumpNode(id);
      var t0 = node.time;
      var v0 = node.value;

      this.grabHelper(event, function (dt, dv, event, isUp) {
        if (event.shiftKey) {
          dv = 0.0;
        } else if (event.ctrlKey || event.metaKey) {
          dt = 0.0;
        }

        var t = t0 + dt;
        var v = v0 + dv;
        if (!event.altKey) {
          t = _this2.snapTime(t);
          v = _this2.snapValue(v);
        }

        param.moveNode(id, t, v);

        if (isUp) {
          if (t0 === t && v0 === v) {
            return;
          }

          _this2.automaton.pushHistory('Move Node', function () {
            return param.moveNode(id, t, v);
          }, function () {
            return param.moveNode(id, t0, v0);
          });
        }
      });
    },
    grabHandle: function grabHandle(id, isOut, event) {
      var _this3 = this;

      var param = this.selectedParam;
      var node = param.dumpNode(id);
      var handle = isOut ? node.out : node.in;

      var t0 = handle.time;
      var v0 = handle.value;

      var len0 = Math.sqrt(t0 * t0 + v0 * v0);
      var nt0 = t0 / len0;
      var nv0 = v0 / len0;

      var handleOp = isOut ? node.in : node.out;
      var tOp0 = handleOp ? handleOp.time : 0.0;
      var vOp0 = handleOp ? handleOp.value : 0.0;

      this.grabHelper(event, function (dt, dv, event, isUp) {
        var t = t0 + dt;
        var v = v0 + dv;
        var tOp = tOp0;
        var vOp = vOp0;

        if (event.shiftKey) {
          var dot = t * nt0 + v * nv0;
          t = dot * nt0;
          v = dot * nv0;
        } else if (event.ctrlKey || event.metaKey) {
          tOp = -t;
          vOp = -v;
        }

        param.moveHandle(id, isOut, t, v);
        param.moveHandle(id, !isOut, tOp, vOp);

        if (isUp) {
          if (dt === 0 && dv === 0) {
            return;
          }

          _this3.automaton.pushHistory('Move Handle', function () {
            param.moveHandle(id, isOut, t, v);
            param.moveHandle(id, !isOut, tOp, vOp);
          }, function () {
            param.moveHandle(id, isOut, t0, v0);
            param.moveHandle(id, !isOut, tOp0, vOp0);
          });
        }
      });
    },
    openFxMenu: function openFxMenu(time) {
      this.fxmenuActive = true;
      this.fxmenuTime = time;
    },
    createFx: function createFx(event, name) {
      var param = this.selectedParam;

      var t = this.fxmenuTime;
      var l = Math.min(1.0, this.automaton.length - this.fxmenuTime);
      var id = param.createFx(t, l, name);
      var data = param.dumpFx(id);

      if (!id) {
        return;
      }
      this.$emit('nodeSelected', []);
      this.$emit('fxSelected', [id]);

      this.automaton.pushHistory('Create Fx', function () {
        return param.createFxFromData(data);
      }, function () {
        return param.removeFx(id);
      });
    },
    removeFx: function removeFx(id) {
      var param = this.selectedParam;
      var fx = param.dumpFx(id);

      this.automaton.pushHistory('Remove Fx', function () {
        return param.removeFx(id);
      }, function () {
        return param.createFxFromData(fx);
      }, true);

      this.$emit('fxSelected', []);
    },
    grabFxBody: function grabFxBody(id, event) {
      var _this4 = this;

      var param = this.selectedParam;

      this.$emit('nodeSelected', []);
      this.$emit('fxSelected', [id]);

      var fx = param.dumpFx(id);

      var t0 = fx.time;
      var r0 = fx.row;

      var y0 = event.clientY;

      this.grabHelper(event, function (dt, dv, event, isUp) {
        var dy = event.clientY - y0;
        var newRow = Math.min(Math.max(r0 + Math.round(dy / 16.0), 0), _paramGui2.default.FX_ROW_MAX);

        var t = t0 + dt;
        if (!event.altKey) {
          t = _this4.snapTime(t);
        }

        param.moveFx(id, t);
        param.changeFxRow(id, newRow);

        if (isUp) {
          if (t0 === t && r0 === newRow) {
            return;
          }

          _this4.automaton.pushHistory('Move Fx', function () {
            return param.forceMoveFx(id, t, newRow);
          }, function () {
            return param.forceMoveFx(id, t0, r0);
          });
        }
      });
    },
    grabFxLeft: function grabFxLeft(id, event) {
      var _this5 = this;

      var param = this.selectedParam;

      this.$emit('nodeSelected', []);
      this.$emit('fxSelected', [id]);

      var fx = param.dumpFx(id);

      var l0 = fx.length;
      var end0 = fx.time + l0;

      this.grabHelper(event, function (dt, dv, event, isUp) {
        var l = l0 - dt;
        if (!event.altKey) {
          l = _this5.snapTime(l - end0) + end0;
        }

        param.resizeFxByLeft(id, l);

        if (isUp) {
          if (dt === 0 && dv === 0) {
            return;
          }

          _this5.automaton.pushHistory('Resize Fx', function () {
            return param.resizeFxByLeft(id, l);
          }, function () {
            return param.resizeFxByLeft(id, l0);
          });
        }
      });
    },
    grabFxRight: function grabFxRight(id, event) {
      var _this6 = this;

      var param = this.selectedParam;

      this.$emit('nodeSelected', []);
      this.$emit('fxSelected', [id]);

      var fx = param.dumpFx(id);

      var l0 = fx.length;
      var t0 = fx.time;

      this.grabHelper(event, function (dt, dv, event, isUp) {
        var l = l0 + dt;
        if (!event.altKey) {
          l = _this6.snapTime(l + t0) - t0;
        }

        param.resizeFx(id, l);

        if (isUp) {
          _this6.automaton.pushHistory('Resize Fx', function () {
            return param.resizeFx(id, l);
          }, function () {
            return param.resizeFx(id, l0);
          });
        }
      });
    },
    dragBg: function dragBg(event) {
      var _this7 = this;

      var t0 = this.x2t(event.offsetX);
      var v0 = this.y2v(event.offsetY);
      var which = event.which;
      var shiftKey = event.shiftKey;
      var altKey = event.altKey;

      var x0 = event.clientX;
      var y0 = event.clientY;
      var xPrev = x0;
      var yPrev = y0;

      var isPlaying0 = this.automaton.isPlaying;
      if (altKey) {
        this.automaton.seek(t0);
        if (isPlaying0) {
          this.automaton.pause();
        }
      }

      var move = function move(event) {
        var x = event.clientX;
        var y = event.clientY;
        var dx = event.clientX - xPrev;
        var dy = event.clientY - yPrev;

        if (which === 1) {
          if (altKey) {
            _this7.automaton.seek(t0 + _this7.x2t(x - x0));
          }
        } else if (which === 2) {
          if (shiftKey) {
            _this7.zoomView(t0, v0, -dx, dy);
          } else {
            _this7.moveView(dx, dy);
          }
        }

        xPrev = x;
        yPrev = y;
      };

      var up = function up(event) {
        if (altKey && isPlaying0) {
          _this7.automaton.play();
        }

        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    },
    contextBg: function contextBg(event) {
      var _this8 = this;

      if (!this.selectedParam) {
        return;
      }

      var t = this.x2t(event.offsetX);
      var v = this.y2v(event.offsetY);

      this.$emit('context', {
        clientX: event.clientX,
        clientY: event.clientY,
        commands: [{
          text: 'Add Node',
          func: function func() {
            _this8.createNode(t, v);
          }
        }, {
          text: 'Add Fx',
          func: function func() {
            _this8.openFxMenu(t);
          }
        }]
      });
    },
    onWheel: function onWheel(event) {
      var t0 = this.x2t(event.offsetX);
      var v0 = this.y2v(event.offsetY);

      if (event.shiftKey) {
        this.zoomView(t0, v0, -event.deltaY, 0);
      } else if (event.ctrlKey || event.metaKey) {
        this.zoomView(t0, v0, 0, -event.deltaY);
      } else {
        this.moveView(event.deltaX, -event.deltaY);
      }

      this.updateGrid();
      this.updateGraph();
    },
    onResize: function onResize() {
      var _this9 = this;

      var el = this.$refs.root;
      this.width = el.clientWidth;
      this.height = el.clientHeight - 4;

      this.$nextTick(function () {
        _this9.updateGrid();
        _this9.updateGraph();
      });
    }
  },

  computed: {
    selectedParam: function selectedParam() {
      return this.automaton.getParam(this.selectedParamName);
    }
  },

  watch: {
    selectedParamName: function selectedParamName() {
      this.updateGraph();
    }
  },

  mounted: function mounted() {
    var _this10 = this;

    this.$root.$on('changedLength', function () {
      _this10.t0 = 0.0;
      _this10.t1 = _this10.automaton.length;

      _this10.updateGraph();
    });

    this.$root.$on('poke', function () {
      _this10.updateGraph();
    });

    this.$nextTick(function () {
      _this10.onResize();
    });
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"root",staticClass:"root",on:{"wheel":function($event){$event.preventDefault();return _vm.onWheel($event)},"dragstart":function($event){$event.preventDefault();},"mousedown":function($event){$event.preventDefault();$event.stopPropagation();return _vm.dragBg($event)},"dblclick":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.stopPropagation();_vm.createNode( _vm.x2t( $event.offsetX ), _vm.y2v( $event.offsetY ) )},"contextmenu":function($event){$event.stopPropagation();$event.preventDefault();return _vm.contextBg($event)}}},[_c('div',{staticClass:"hbar"},[_c('div',{staticClass:"vision",style:({
          left: ((_vm.t0 / _vm.automaton.length * _vm.width) + "px"),
          width: ((( _vm.t1 - _vm.t0 ) / _vm.automaton.length * _vm.width) + "px")
        })})]),_vm._v(" "),_c('svg',{staticClass:"svg",attrs:{"width":_vm.width,"height":_vm.height,"viewBox":("0 0 " + _vm.width + " " + _vm.height)}},[_vm._l((_vm.grid.x),function( line,index){return _c('line',{key:'grid-x'+index,staticClass:"grid",attrs:{"x1":line.pos,"y1":0,"x2":line.pos,"y2":_vm.height,"opacity":line.op}})}),_vm._v(" "),_vm._l((_vm.grid.y),function( line,index){return _c('line',{key:'grid-y'+index,staticClass:"grid",attrs:{"x1":0,"y1":line.pos,"x2":_vm.width,"y2":line.pos,"opacity":line.op}})}),_vm._v(" "),_vm._l((_vm.grid.x),function( line,index){return _c('text',{key:'grid-text-x'+index,staticClass:"grid-text",attrs:{"x":line.pos + 2,"y":_vm.height - 2,"opacity":line.op}},[_vm._v(_vm._s(line.val.toFixed( 3 )))])}),_vm._v(" "),_vm._l((_vm.grid.y),function( line,index){return _c('text',{key:'grid-text-y'+index,staticClass:"grid-text",attrs:{"x":"2","y":line.pos - 2,"opacity":line.op}},[_vm._v(_vm._s(line.val.toFixed( 3 )))])}),_vm._v(" "),(_vm.selectedParam)?_c('g',[_vm._l((_vm.selectedParam.dumpFxs()),function(fx){return _c('g',{key:fx.$id,staticClass:"fx"},[_c('line',{staticClass:"line",attrs:{"x1":_vm.t2x( fx.time ),"y1":"4","x2":_vm.t2x( fx.time ),"y2":_vm.height}}),_vm._v(" "),_c('line',{staticClass:"line",attrs:{"x1":_vm.t2x( fx.time + fx.length ),"y1":"4","x2":_vm.t2x( fx.time + fx.length ),"y2":_vm.height}}),_vm._v(" "),_c('rect',{staticClass:"fill",attrs:{"x":_vm.t2x( fx.time ),"y":"0","width":_vm.t2x( fx.time + fx.length ) - _vm.t2x( fx.time ),"height":_vm.height}}),_vm._v(" "),_c('g',{attrs:{"transform":'translate(0,' + ( 1 + 16 * fx.row ) + ')'}},[_c('rect',{staticClass:"body",class:{
                selected: _vm.selectedFxIds.some( function ( id ) { return id === fx.$id; } ),
                bypass: fx.bypass
              },attrs:{"x":_vm.t2x( fx.time ),"width":_vm.t2x( fx.time + fx.length ) - _vm.t2x( fx.time ),"height":"16","rx":"5","ry":"5"},on:{"mousedown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.stopPropagation();_vm.grabFxBody( fx.$id, $event )},"dblclick":function($event){$event.stopPropagation();_vm.removeFx( fx.$id )}}}),_vm._v(" "),_c('rect',{staticClass:"side",attrs:{"x":_vm.t2x( fx.time ) - 1,"width":"6","height":"16"},on:{"mousedown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.stopPropagation();_vm.grabFxLeft( fx.$id, $event )}}}),_vm._v(" "),_c('rect',{staticClass:"side",attrs:{"x":_vm.t2x( fx.time + fx.length ) - 5,"width":"6","height":"16"},on:{"mousedown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.stopPropagation();_vm.grabFxRight( fx.$id, $event )}}}),_vm._v(" "),_c('clipPath',{attrs:{"id":'fxclip'+fx.$id}},[_c('rect',{attrs:{"x":_vm.t2x( fx.time ),"width":_vm.t2x( fx.time + fx.length ) - _vm.t2x( fx.time ),"height":"16"}})]),_vm._v(" "),_c('g',{attrs:{"clip-path":'url(#fxclip' + fx.$id + ')'}},[_c('text',{staticClass:"text",class:{
                  selected: _vm.selectedFxIds.some( function ( id ) { return id === fx.$id; } ),
                  bypass: fx.bypass
                },attrs:{"x":_vm.t2x( fx.time ) + 4,"y":"12"}},[_vm._v(_vm._s(_vm.automaton.getFxDefinitionName( fx.def )))])])])])}),_vm._v(" "),(_vm.selectedParam)?_c('polyline',{staticClass:"graph",attrs:{"points":_vm.graphPoints}}):_vm._e(),_vm._v(" "),_c('line',{staticClass:"currentLine",attrs:{"x1":_vm.t2x( _vm.automaton.time ),"y1":"0","x2":_vm.t2x( _vm.automaton.time ),"y2":_vm.height}}),_vm._v(" "),_c('text',{staticClass:"currentText",attrs:{"x":_vm.t2x( _vm.automaton.time ) + 2,"y":_vm.height - 2}},[_vm._v(_vm._s(_vm.automaton.time.toFixed( 3 )))]),_vm._v(" "),(_vm.selectedParam)?_c('g',[_c('line',{staticClass:"currentLine",attrs:{"x1":"0","y1":_vm.v2y( _vm.selectedParam.getValue() ),"x2":_vm.width,"y2":_vm.v2y( _vm.selectedParam.getValue() )}}),_vm._v(" "),_c('text',{staticClass:"currentText",attrs:{"x":"2","y":_vm.v2y( _vm.selectedParam.getValue() ) - 2}},[_vm._v(_vm._s(_vm.selectedParam.getValue().toFixed( 3 )))]),_vm._v(" "),_c('circle',{staticClass:"currentPoint",attrs:{"r":"5","cx":_vm.t2x( _vm.automaton.time ),"cy":_vm.v2y( _vm.selectedParam.getValue() )}})]):_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.selectedParam)?_c('g',_vm._l((_vm.selectedParam.dumpNodes()),function(node){return _c('g',{key:node.$id,staticClass:"node"},[_c('g',{staticClass:"handle"},[(node.in)?_c('line',{staticClass:"line",attrs:{"x1":_vm.t2x( node.time ),"y1":_vm.v2y( node.value ),"x2":_vm.t2x( node.time + node.in.time ),"y2":_vm.v2y( node.value + node.in.value )}}):_vm._e(),_vm._v(" "),(node.in)?_c('circle',{staticClass:"circle",attrs:{"r":"4","transform":'translate(' + _vm.t2x( node.time + node.in.time ) + ',' + _vm.v2y( node.value + node.in.value ) + ')'},on:{"mousedown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.stopPropagation();_vm.grabHandle( node.$id, false, $event )},"dblclick":function($event){$event.stopPropagation();_vm.removeHandle( node.$id, false )}}}):_vm._e(),_vm._v(" "),(node.out)?_c('line',{staticClass:"line",attrs:{"x1":_vm.t2x( node.time ),"y1":_vm.v2y( node.value ),"x2":_vm.t2x( node.time + node.out.time ),"y2":_vm.v2y( node.value + node.out.value )}}):_vm._e(),_vm._v(" "),(node.out)?_c('circle',{staticClass:"circle",attrs:{"r":"4","transform":'translate(' + _vm.t2x( node.time + node.out.time ) + ',' + _vm.v2y( node.value + node.out.value ) + ')'},on:{"mousedown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.stopPropagation();_vm.grabHandle( node.$id, true, $event )},"dblclick":function($event){$event.stopPropagation();_vm.removeHandle( node.$id, true )}}}):_vm._e()]),_vm._v(" "),_c('g',{staticClass:"body",class:{ selected: _vm.selectedNodeIds.some( function ( id ) { return id === node.$id; } ) },on:{"dblclick":function($event){$event.stopPropagation();_vm.removeNode( node.$id )},"mousedown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }if(!$event.shiftKey){ return null; }$event.stopPropagation();_vm.resetHandles( node.$id )},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }$event.stopPropagation();_vm.grabNode( node.$id, $event )}]}},[(_vm.v0 <= node.value && node.value <= _vm.v1)?_c('circle',{staticClass:"circle",attrs:{"transform":'translate(' + _vm.t2x( node.time ) + ',' + _vm.v2y( node.value ) + ')',"r":"5"}}):_vm._e(),_vm._v(" "),(node.value < _vm.v0)?_c('path',{staticClass:"triangle",attrs:{"transform":'translate(' + _vm.t2x( node.time ) + ',' + _vm.height + ')',"d":"M 0 -4 L 5 -12 L -5 -12 z"}}):_vm._e(),_vm._v(" "),(_vm.v1 < node.value)?_c('path',{staticClass:"triangle",attrs:{"transform":'translate(' + _vm.t2x( node.time ) + ',0)',"d":"M 0 4 L -5 12 L 5 12 z"}}):_vm._e()])])})):_vm._e()],2),_vm._v(" "),_c('FxMenu',{attrs:{"automaton":_vm.automaton,"active":_vm.fxmenuActive},on:{"selected":function($event){_vm.createFx( _vm.fxmenuTime, $event )},"blur":function($event){_vm.fxmenuActive = false}}})],1)])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-3873fd6e"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3873fd6e", __vue__options__)
  } else {
    hotAPI.rerender("data-v-3873fd6e", __vue__options__)
  }
})()}

},{"../param-gui":100,"./timeline-fxmenu.vue":111,"babel-runtime/core-js/math/log10":2,"vue":65,"vue-hot-reload-api":64,"vueify/lib/insert-css":66}]},{},[98])(98)
});
