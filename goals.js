Goals = new Mongo.Collection('goals');

if (Meteor.isClient) {
  Template.body.helpers({
    goals: function() {
      return Goals.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
