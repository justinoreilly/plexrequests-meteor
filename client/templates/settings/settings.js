    Template.registerHelper('equals', function (a, b) {
      return a === b;
    });

Schemas = {};

Template.registerHelper("Schemas", Schemas);

Schemas.Setting = new SimpleSchema({
 _id: {
    type: String,
    index: 1,
    unique: true
  },
   service: {
    type: String,
    index: 1,
    unique: true
  },
  enabled: {
    type: Boolean,
    label: ' ',
    autoform: {
	      afFieldInput: {
	        type: "boolean-checkbox"
	      }
    }
  },
   port: {
    type: String,
    optional: true,
    label: 'Port',
  },
  host: {
    type: String,
    optional: true,
    label: 'Host'
  },
   api: {
    type: String,
    optional: true,
    label: 'API Key',
  },
  api_key: {
    type: String,
    optional: true,
    label: 'API URL',
  },
  userKey:{
	type: String,
    optional: true,
  },
  qualityProfileId:{
	type: String,
    optional: true,
  },
	rootFolderPath:{
		type: String,
	    optional: true,
	  },
	seasonFolder:{
		type: Boolean,
	    label: 'Enable',
	    autoform: {
		      afFieldInput: {
		        type: "boolean-checkbox",
		      }
	    }
	},
});


/*
Schemas.Setting.labels({
    enabled: ''
});
*/


var Collections = {};

Template.registerHelper("Collections", Collections);

Settings = Collections.Settings = Settings;
Settings.attachSchema(Schemas.Setting);

if (Meteor.isServer) {

  Settings.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
  });

} else if (Meteor.isClient) {

  Template["settings"].helpers({
    settings: function () {
      return Settings.find({}, {sort: {service: 1}});
      //return Settings.find({});
    },
    makeUniqueID: function () {
      return this._id;
    }

  });


}
Template.settings.onRendered(function(){


});

Template.settings.onCreated(function(){

	Meteor.call('checkPlex', function(err, data) {
		var testbtn = $('.test-service[data-test-btn="checkPlex"]');
	       if (err) {
	           console.log(err);
	       } else if (data === true) {
	            testbtn.html('Connected! <i class="fa fa-check-circle"></i>').removeClass('btn-danger').addClass('btn-success');
	           $('.show-plex-form').removeAttr('style');
	           $('.plexAuth').hide();
	       } else if (data === false) {
	           $('.plexAuth').removeAttr('style');
	           testbtn.html('Wrong Auth Key <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
	       }
	});


	Meteor.call('checkCP', function(err, data) {
		var testbtn = $('.test-service[data-test-btn="checkCP"]');
        $(testbtn).html('Testing Service <i class="fa fa-spinner fa-spin fa-lg"></i>');

			if(err){
				console.log(err);
				//if(err.error==500){
			      testbtn.html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');

		    }else if(data==true){
			    testbtn.html('Connected! <i class="fa fa-check-circle"></i>').removeClass('btn-danger').addClass('btn-success');
			}else if(data==200){
				  testbtn.html('Wrong API <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
			}else if(data==false){
			   	  testbtn.html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
			}else{
				testbtn.html('hmmm <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
		    }

  	});


  	Meteor.call('checkSR', function(err, data) {
		var testbtn = $('.test-service[data-test-btn="checkSR"]');
        $(testbtn).html('Testing Service <i class="fa fa-spinner fa-spin fa-lg"></i>');

			if(err){
				console.log(err);
				//if(err.error==500){
			      testbtn.html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');

		    }else if(data==true){
			    testbtn.html('Connected! <i class="fa fa-check-circle"></i>').removeClass('btn-danger').addClass('btn-success');
			}else if(data==200){
				  testbtn.html('Wrong API <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
			}else if(data==false){
			   	  testbtn.html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
			}else{
				testbtn.html('hmmm <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
		    }

  	});


  	  Meteor.call('checkSO', function(err, data){
	  	  var testbtn = $('.test-service[data-test-btn="checkSO"]');
	  	  $(testbtn).html('Testing Service <i class="fa fa-spinner fa-spin fa-lg"></i>');
	    if(err){
				console.log(err);
				//if(err.error==500){
			      testbtn.html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');

		    }else if(data==true){
			    testbtn.html('Connected! <i class="fa fa-check-circle"></i>').removeClass('btn-danger').addClass('btn-success');
			}else if(data==200){
				  testbtn.html('Wrong API <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
			}else if(data==false){
			   	  testbtn.html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
			}else{
				testbtn.html('hmmm <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
		    }
	  });

});


Template.settings.events({
    'submit #searchForm': function () {
        return false;
    },
    'click #plexsignin': function (event) {
        $('#plex-error').hide();
        $('#plexsignin').html('<i class="fa fa-cog fa-spin  fa-fw"></i>  Signing In');
        plexUsername = document.getElementById("plex-username").value;
        plexPassword = document.getElementById("plex-password").value;

        Meteor.call('PlexLogin', plexUsername, plexPassword,  function (err, data) {
            if (err) {
                //Basic handling, assuming incorrect details, will expand if needed
                $('#plex-error').show();
                $('#plexsignin').html('<i class="fa fa-user fa-fw"></i> Sign In');
            } else if (data) {
                $('a.show-plex-form').show();
                $('.plexAuth').hide();
                $('.test-service[data-test-btn="checkPlex"]').html('Connected! <i class="fa fa-check-circle"></i>').removeClass('btn-danger').addClass('btn-success');
                Session.setPersistent('plexauthuser', true);
                Session.setPersistent('plexuser', plexUsername);
            }
        });
        return false;
    },
     'click .show-plex-form': function (event) {
                $(".plexAuth").toggle();
                var btntext = $(event.target);
                  if(btntext.text() == "Get new Auth Key"){
			          btntext.text("Cancel");
			      } else {
			        btntext.text("Get new Auth Key");
			      }
                //event.preventDefault();
                //$(event.target).hide();
                return false;
     },
    'click .test-service': function (event) {
        var serviceCall = $(event.target).data( "test-btn" );
        $(event.target).html('Testing Service <i class="fa fa-spinner fa-spin fa-lg"></i>').removeClass('btn-danger').removeClass('btn-success');

        Meteor.call(serviceCall, function(err, data) {
	        console.log(err);
	        console.log(data);
			if(err){
				//if(err.error==500){
			      $(event.target).html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');

		    }else if(data==true){
			    $(event.target).html('Connected! <i class="fa fa-check-circle"></i>').removeClass('btn-danger').addClass('btn-success');
			}else if(data==200){
				  $(event.target).html('Wrong API <i class="fa fa-exclamation-triangle"></i>').addClass('btn-danger');
			}else if(data==false && serviceCall=='checkPlex'){
			   	  $(event.target).html('Wrong Auth Key <i class="fa fa-exclamation-triangle"></i> ').addClass('btn-danger');
			}else if(data==false){
			   	  $(event.target).html('Wrong Host or Port <i class="fa fa-exclamation-triangle"></i> ').addClass('btn-danger');
			}else{
				$(event.target).html('hmmm <i class="fa fa-exclamation-triangle"></i> ').addClass('btn-danger');
		    }

        });
        return false;
    }

});