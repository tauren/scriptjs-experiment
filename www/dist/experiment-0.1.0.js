(function() {
  var experiment;
  window.Widgets = window.Widgets || {};
  experiment = window.Widgets.experiment = {};
  experiment.Friend = Backbone.Model.extend({
    initialize: function() {
      return console.log('Initializing Friend');
    }
  });
  experiment.Friends = Backbone.Collection.extend({
    model: experiment.Friend,
    initialize: function(models, options) {
      return console.log('Initializing Friends');
    }
  });
  experiment.AddFriendView = Backbone.View.extend({
    events: {
      "click": "showPrompt"
    },
    initialize: function(options) {
      return console.log('Initializing AddFriendView');
    },
    showPrompt: function() {
      var friend_name;
      friend_name = prompt("Who is your friend?");
      this.collection.add({
        name: friend_name
      });
    }
  });
  experiment.AppView = Backbone.View.extend({
    initialize: function(options) {
      console.log('Initializing FriendView');
      _.bindAll(this, 'render');
      this.collection = new experiment.Friends();
      this.collection.bind('add', this.render);
      this.addView = new experiment.AddFriendView({
        el: '#add-friend',
        collection: this.collection
      });
    },
    render: function(model) {
      return $(this.el).append("<li>" + model.get('name') + "</li>");
    }
  });
}).call(this);
