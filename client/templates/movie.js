Template.movie.helpers({
  movieDoc: function(){
    return Movies.findOne(this._id);
  },
  formId: function(){
    return "update_" + this.id;
  }
});

AutoForm.addHooks(null,{
  onSuccess: function(formType, result) {
      if (result) {
        console.log("Success");
      }
  },
  onError: function(formType, error) {
    console.log("Error -> " + error);
  }
});
