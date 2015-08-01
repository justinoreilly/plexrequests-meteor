Template.manage.helpers({
    Movies: function () {
		  return Movies;
    },
    TV: function () {
        return TV;
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
                { label: 'Delete', 
                    fn: function () {
                        return new Spacebars.SafeString('<a href="#" class="delete">X</a>');
                    }
                }
              ]
          };
     }
});

Template.manage.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var request = this;
    // checks if the actual clicked element has the class `delete`
    if (event.target.className == "delete") {
        if (confirm("Confirm you want to delete " + request.title)) {
            console.log(request._id);
        }
    }
  }
});