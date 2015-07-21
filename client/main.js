currentSearch = new Mongo.Collection("currentsearch");

Meteor.subscribe('movies');
Meteor.subscribe('tv');
Meteor.subscribe('settings');
Meteor.subscribe('version');
Meteor.subscribe('weeklylimit');

Session.set('searchType', '');

Router.configure({
   layoutTemplate: 'index'
});

Router.map(function () {
  this.route('home', {
    path: '/',
  });
   if (Meteor.userId()) {
	  this.route('settings');
	  this.route('about');
	  //this.route('couchpotato');
	  //this.route('plex');
	  //this.route('sickrage');
	  //this.route('sonarr');
	  this.route('NotFound');

  }
});

/*
Router.route('/settings', {
    name: 'settings'
});
*/

Template.body.helpers({
    url: function () {
    return Meteor.absoluteUrl();
    }
});