Goals = new Mongo.Collection('goals');

if (Meteor.isClient) {
  Template.body.helpers({
    goals: function() {
      return Goals.find();
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
