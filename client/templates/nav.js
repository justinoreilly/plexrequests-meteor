
/*
Template.navItems.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
 });
*/
/*Customize login dropdown text*/
 accountsUIBootstrap3.map('en', {
  loginButtonsLoggedOutDropdown: {
    signIn: "SignIn",
    up: "Admin"
  }
})

 Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-settings': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('settings');
    },
    'click #login-buttons-about': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('about');
    }
    ,
    'click #login-buttons-project-site': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        window.open("http://plexrequests.8bits.ca/", '_blank');
    }
});
