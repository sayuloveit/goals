if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: [
      { task: 'resolution 1'},
      { task: 'resolution 2'}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
