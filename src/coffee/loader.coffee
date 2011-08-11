###jshint shadow: true###

window.console = window.console || {}
window.console.log = ->

class Loader
  libs:
    styles: '//creampie.dev:8081/site/dist/styles-0.1.6.css'
    json: '//cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js'
    es5shim: '//cdnjs.cloudflare.com/ajax/libs/es5-shim/1.2.4/es5-shim.min.js'
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js'
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.1.6/underscore-min.js'
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.5.1/backbone-min.js'
    # Add widgets libraries here
    experiment: '//creampie.dev:8081/site/dist/experiment-0.1.6.js'
  start: (config) -> 
    onWidget = =>
      # Start the widget specified in config
      window.jQuery =>
        window.app = new Widgets[config.widget].AppView 
          el: config.selector
        return
      return

    deps = []

    # Async load styles
    $script.styles @libs.styles

    if not window.JSON
      # Async load json2
      $script @libs.json, 'json'
      deps.push 'json'
    if not Array::map or not Object.keys
      # Async load es5shim
      $script @libs.es5shim, 'es5shim'
      deps.push 'es5shim'
    if not window._
      # Async load underscore
      $script @libs.underscore, 'underscore'
      deps.push 'underscore'
    if not window.jQuery
      # Async load jquery
      $script @libs.jquery, 'jquery'
      deps.push 'jquery'
    if not window.Backbone
      # Async load backbone
      $script @libs.backbone, 'backbone'
      deps.push 'backbone'

    # Async load widget
    $script @libs[config.widget], 'widget'
    deps.push 'widget'

    # Everything has finished loading
    $script.ready deps, onWidget

    return

window.Loader = window.Loader || new Loader()
