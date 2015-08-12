Template.home.events({
    'click #selMovie': function (event) {
        $('#searchForm').show();
	   		$('#search').focus().val('');
	      $('#requests-block').show();
	      $('#resultsList').hide();
	      $('#requests').hide();
        $('#showRequests').show();
        $('#hideRequests').hide();
	      $('#selTV').removeClass('btn-primary');
	      $(event.target).addClass('btn-primary');
        Session.set("searchType", "movie");
    },
    'click #selTV': function (event) {
        $('#searchForm').show();
	      $('#search').focus().val('');
	      $('#requests-block').show();
	      $('#resultsList').hide();
	      $('#requests').hide();
	      $('#showRequests').show();
			  $('#hideRequests').hide();
	      $('#selMovie').removeClass('btn-primary');
	      $(event.target).addClass('btn-primary');
        Session.set("searchType", "tv");
    },
    'click #showRequests': function (event) {
        $('#requests').toggle();
			  $('#showRequests').hide();
			  $('#hideRequests').show();
	      $('html, body').animate({
            scrollTop: $('#hideRequests').offset().top
        }, 500);
    },
    'click #hideRequests': function (event) {
        $('#requests').toggle();
			  $('#showRequests').show();
			  $('#hideRequests').hide();
	      $('html, body').animate({
				    scrollTop: $('#picktype').offset().top
        }, 500);
    }
});

Template.home.onCreated(function(){
    Meteor.call('userCount', function (err, data) {
        if (err) {
            console.log(err);
            $('.firstRun').show();
        } else if (data == 0) {
            $('.firstRun').show();
        }
    });
});