/*jshint sub:true, forin: false, asi: true */
!function (win, doc) {
  var head = doc.getElementsByTagName('head')[0],
      list = {}, ids = {}, delay = {}, scripts = {},
      s = 'string', f = false, push = 'push', complete = /^c|loade/,
      domContentLoaded = 'DOMContentLoaded', readyState = 'readyState',
      addEventListener = 'addEventListener', onreadystatechange = 'onreadystatechange',
      faux = doc.createElement('script'),
      preloadExplicit = typeof faux.preload == 'boolean',
      preloadReal = preloadExplicit || (faux[readyState] && faux[readyState] == 'uninitialized'),
      async = !preloadReal && faux.async === true

  if (!doc[readyState] && doc[addEventListener]) {
    doc[addEventListener](domContentLoaded, function fn() {
      doc.removeEventListener(domContentLoaded, fn, f);
      doc[readyState] = 'complete';
    }, f);
    doc[readyState] = 'loading';
  }

  function timeout(fn) {
    setTimeout(fn, 0)
  }

  function every(ar, fn, i) {
    for (i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
    return 1;
  }

  function each(ar, fn) {
    every(ar, function (el) { return !fn(el) })
  }

  function $script(paths, idOrDone, optDone) {
    paths = paths[push] ? paths : [paths]
    var idOrDoneIsDone = idOrDone && idOrDone.call,
        workingPaths = paths.slice(0), loadedPaths = {},
        done = idOrDoneIsDone ? idOrDone : optDone,
        id = idOrDoneIsDone ? paths.join('') : idOrDone,
        queue = paths.length

    function loopFn(item) {
      return item.call ? item() : list[item]
    }

    function callback() {
      if (!--queue) {
        list[id] = 1
        done && done()
        for (var dset in delay) {
          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
        }
      }
    }

    timeout(function () {
      each(paths, function (path, p) {
        p = $script.path ? $script.path + path + '.js' : path
        if (scripts[path]) {
          ids[id] = id || f
          return callback()
        }
        scripts[path] = 1
        ids[id] = id || f
        !$script.order ? create(p, callback) : preload(p, function (el) {
          if (async) return callback()
          loadedPaths[p] = el || 1
          if (el) {
            if (workingPaths[0] == p) {
              head.insertBefore(el, head.firstChild)
              timeout(function () {
                callback()
                workingPaths.shift()
                while (loadedPaths[workingPaths[0]]) {
                  head.insertBefore(loadedPaths[workingPaths[0]], head.firstChild)
                  timeout(callback)
                  workingPaths.shift()
                }
              })
            }
            return
          }
          workingPaths[0] == p && create(p, callback)
          workingPaths.shift()
          while (loadedPaths[workingPaths[0]]) {
            create(workingPaths[0], callback)
            workingPaths.shift()
          }
        })
      })
    })
    return $script
  }

  function create(path, fn, type) {
    var el = doc.createElement('script'), loaded = f
    el.type = type || 'text/javascript'
    el.async = !$script.order
    el.onload = el[onreadystatechange] = function () {
      if ((el[readyState] && !(complete.test(el[readyState]))) || loaded) return
      el.onload = el[onreadystatechange] = null
      loaded = 1
      fn && fn()
    }
    el.src = path
    head.insertBefore(el, head.firstChild)
  }

  function bind(fn) {
    var a = Array.prototype.slice.call(arguments, 1)
    return function () {
      fn.apply(null, a)
    }
  }

  function preload(path, fn, el) {
    if (preloadReal) {
      el = doc.createElement('script')
      el.type = 'text/javascript'
      if (preloadExplicit) {
        el.preload = true
        el.onpreload = bind(fn, el)
      } else {
        el[onreadystatechange] = function () {
          if (complete.test(el[readyState])) {
            fn(el)
            el[onreadystatechange] = null
          }
        }
      }
      el.src = path // setting .src begins the preload
    } else if (async) {
      create(path, fn)
    } else {
      create(path, fn, 'text/cache-script')
    }
  }

  $script.get = create
  $script.order = true

  $script.ready = function (deps, ready, req) {
    deps = deps[push] ? deps : [deps]
    var missing = []
    !each(deps, function (dep) {
      list[dep] || missing[push](dep)
    }) && every(deps, function (dep) {
      return list[dep]
    }) ? ready() : !function (key) {
      delay[key] = delay[key] || []
      delay[key][push](ready)
      req && req(missing)
    }(deps.join('|'))
    return $script
  };

  $script.styles = function(url) {
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
  };

  var old = win.$script;
  $script.noConflict = function () {
    win.$script = old;
    return this;
  };

  typeof module !== 'undefined' && module.exports && (module.exports = $script)

  win['$script'] = $script

}(this, document);
(function() {
  /*jshint shadow: true*/  var Loader;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.console = window.console || {};
  window.console.log = function() {};
  Loader = (function() {
    function Loader() {}
    Loader.prototype.libs = {
      styles: '//creampie.dev:8081/site/dist/styles-0.1.6.css',
      json: '//cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js',
      es5shim: '//cdnjs.cloudflare.com/ajax/libs/es5-shim/1.2.4/es5-shim.min.js',
      jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js',
      underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.1.6/underscore-min.js',
      backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.5.1/backbone-min.js',
      experiment: '//creampie.dev:8081/site/dist/experiment-0.1.6.js'
    };
    Loader.prototype.start = function(config) {
      var deps, onWidget;
      onWidget = __bind(function() {
        window.jQuery(__bind(function() {
          window.app = new Widgets[config.widget].AppView({
            el: config.selector
          });
        }, this));
      }, this);
      deps = [];
      $script.styles(this.libs.styles);
      if (!window.JSON) {
        $script(this.libs.json, 'json');
        deps.push('json');
      }
      if (!Array.prototype.map || !Object.keys) {
        $script(this.libs.es5shim, 'es5shim');
        deps.push('es5shim');
      }
      if (!window._) {
        $script(this.libs.underscore, 'underscore');
        deps.push('underscore');
      }
      if (!window.jQuery) {
        $script(this.libs.jquery, 'jquery');
        deps.push('jquery');
      }
      if (!window.Backbone) {
        $script(this.libs.backbone, 'backbone');
        deps.push('backbone');
      }
      $script(this.libs[config.widget], 'widget');
      deps.push('widget');
      $script.ready(deps, onWidget);
    };
    return Loader;
  })();
  window.Loader = window.Loader || new Loader();
}).call(this);
