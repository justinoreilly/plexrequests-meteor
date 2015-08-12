Template.manage.helpers({
    Movies: function () {
		  return Movies.find().fetch();
    },
    TV: function () {
        return TV;
    },
    onSuccess: function(formType, result) {
        if (result) {
          console.log("Success");
        }
        console.log("a");
    },
    onError: function(formType, error) {
      console.log("Error -> " + error);
    }
});

//https://github.com/aslagle/reactive-table
Template.manage.helpers({
	   settings: function () {
	        return {
	            rowsPerPage: 10,
	            class: 'table',
	            showFilter: true,
	            fields: [
		            { key: 'createdAt', label: 'Created', sortDirection: 'descending', hidden: true },
				        { key: 'title',  label: 'Title', cellClass: 'Title'},
				        { key: 'released',  label: 'Released', cellClass: 'Released' },
				        { key: 'downloaded', label:'Done', cellClass: 'Done',
                    fn: function (value) {
                        if(value===true){
                            return new Spacebars.SafeString('<i class="fa fa-check-circle enabledSuccess"></i>');
                        }else{
                            return new Spacebars.SafeString('<i class="fa fa-cloud-download"></i>');
                        };
                    }
                },
                { key: "imdb", label: "Info", cellClass: 'Info', sortable: false,
                    fn: function (value) {
                        return new Spacebars.SafeString('<a href="http://www.dereferer.org/?http://www.imdb.com/title/'+value+'" target="_blank" style="text-align:center;"><i class="fa fa-external-link-square"></i></a>');
                    }
                },
                { key: 'user',  label: 'User', cellClass: 'User', },
                { key: "_id", label: 'Edit',
                    fn: function (value) {
                        return new Spacebars.SafeString('<a href="/movies/' + value + '" class="edit">Edit</a>');
                    }
                }
              ]
          };
     }
});

Template.manage.events({
  'click .reactive-table tbody tr': function (event) {
    // set the blog post we'll display details and news for
    if (event.target.className == "edit") {
        Router.go("/movies/"+this._id);
    }
  }
});
