window.Widgets = window.Widgets || {}
experiment = window.Widgets.experiment = {}

experiment.Friend = Backbone.Model.extend
  initialize: () ->
    console.log 'Initializing Friend'

experiment.Friends = Backbone.Collection.extend
  model: experiment.Friend
  initialize: (models, options) ->
    console.log 'Initializing Friends'
  
experiment.AddFriendView = Backbone.View.extend
  events:
    "click":  "showPrompt"
  initialize: (options) ->
    console.log 'Initializing AddFriendView'
  showPrompt: () ->
    friend_name = prompt("Who is your friend?");
    @collection.add
      name: friend_name
    return

experiment.AppView = Backbone.View.extend
  initialize: (options) ->
    console.log 'Initializing FriendView'
    _.bindAll @, 'render'
    @collection = new experiment.Friends()
    @collection.bind 'add', @render
    @addView = new experiment.AddFriendView
      el: '#add-friend'
      collection: @collection
    return
  render: (model) ->
    $(@.el).append("<li>" + model.get('name') + "</li>")
