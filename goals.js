Goals = new Mongo.Collection('goals');

if (Meteor.isClient) {
  Template.body.helpers({
    goals: function() {
     // find non-completed goals if session variable is true
     if (Session.get('hideCompleted')) {
      return Goals.find({status: {$ne: true}});
     }
     return Goals.find();
    },

    // keep state of checked in hide-complete input in sync
    hideCompleted: function() {
      return Session.get('hideCompleted')
    }
  });

  Template.body.events({
    'submit .new-goal': function(event) {
      var desc = event.target.description.value;

      Goals.insert({
        description: desc,
        createAt: new Date()
      });
      event.target.description.value = '';  // reset value
      return false;                         // prevent page refresh
    },

    'change .hide-completed': function(event) {
      // toggle session variable based on check
      Session.set('hideCompleted', event.target.checked);
    }

  });

  Template.goal.events({
    'click .delete': function() {
      Goals.remove(this._id);
    },

    'click .toggle-check': function() {
      Goals.update(this._id, {$set: {status: !this.status}})
    },
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
