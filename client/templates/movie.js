Template.movie.helpers({
  movieDoc: function(){
    return Movies.findOne(this._id);
  },
  formId: function(){
    return "update_" + this.id;
  },
  onError: function () {
    return function (error) { alert("An error occurred!"); console.log(error); };
  },
  onSuccess: function () {
    return function (result) { console.log("Removed!"); Router.go("/manage");};
  },
  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.title + '"?')) {
        this.remove();
      }
    };
  }
});

AutoForm.addHooks(null,{
  onSuccess: function(formType, result) {
      if (result) {
        console.log("Success");
        alert("Updated");
      }
  },
  onError: function(formType, error) {
    console.log("Error -> " + error);
    alert("An error occured please try again.");
  }
});
