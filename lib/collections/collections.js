Movies = new Mongo.Collection("movies");
TV = new Mongo.Collection("tv");
Settings = new Mongo.Collection("settings");
Version = new Mongo.Collection("version");

Movies.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Movie Title",
    max: 200
  },
  id: {
    type: String,
    label: "TheMovieDB ID"
  },
  imdb: {
    type: String,
    label: "IMDB ID",
    min: 0
  },
  released: {
    type: Date,
    label: "Release Date",
    optional: true
  },
  user: {
    type: String,
    label: "Requesting User"
  },
  downloaded: {
    type: Boolean,
    label: "Downloaded"
  },
  createdAt: {
    type: String,
    label: "Date Requested"
  }

}));
