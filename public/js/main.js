// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

// Define Backbone router
splat.AppRouter = Backbone.Router.extend({

    // Map "URL paths" to "router functions"
    routes: {
        "": "home",
        "default": "home",
		"about": "about",
		"movies":"movies", /*Im not sure*/
		"movies/add": "moviesadd",
		"movies/:id":"movies"
    },

    // When an instance of an AppRouter is declared, create a Header view
    initialize: function() {
        // instantiate a Header view
        this.headerView = new splat.Header();
        // insert the rendered Header view element into the document DOM
        $('.header').html(this.headerView.render().el);
        this.movies = new splat.Movies();
        this.movies.fetch();
//        console.log(this.movies);
    },

    home: function() {
        // If the Home view doesn't exist, instantiate one
        if (!this.homeView) {
            this.homeView = new splat.Home();
        };
        // insert the rendered Home view element into the document DOM
        $('#content').html(this.homeView.render().el);
        selectMenuItem($('.home-menu'));
		
    },
	about: function() {
        // If the About view doesn't exist, instantiate one
        if (!this.aboutView) {
            this.aboutView = new splat.About();
        };
        // insert the rendered Home view element into the document DOM
        $('#content').html(this.aboutView.render().el);
        selectMenuItem($('.about-menu'));
    },
    movies: function(id) {
        if (id) {
            this.movieModel = this.movies.get(id);
            if (!this.detailsView) {
                this.detailsView = new splat.Details({collection: this.movies, model: this.movieModel});
            }
            $('#content').html(this.detailsView.render().el);
        }
        else {
            if (!this.moviesView) {
                this.moviesView = new splat.MoviesView({collection:this.movies});
            }
            console.log(this.moviesView);
            $('#content').html(this.moviesView.render());
        }
//        if (id) {
//            alert(id);
//            if (!this.detailsView) {
//                this.detailsView = new splat.Details({collection: this.movies});
//            };
//            $('#content').html(this.detailsView.render(this.movies).el);
//            $('#title').attr("placeholder","balh");
//            // insert the rendered Home view element into the document DOM
//        }
//        else { 
//            if (!this.moviesView) {
//                this.moviesView = new splat.MovieThumb();
//            };
//            $('#content').html(this.moviesView.render().el);
//            selectMenuItem($('.browse-menu')); 
//        }
    },
    moviesadd: function() {
        this.movie = new splat.Movie();
        if (!this.detailsView) {
            this.detailsView = new splat.Details({collection: this.movies, model: this.movie});
        };
        // insert the rendered Home view element into the document DOM
        $('#content').html(this.detailsView.render().el);
		selectMenuItem($('.add-menu')); 
    }


});

// Load HTML templates for Home, Header, About views, and when
// template loading is complete, instantiate a Backbone router
// with history.
splat.utils.loadTemplates(['Home', 'Header', 'About', 'Details'], function() {
    splat.app = new splat.AppRouter();
    Backbone.history.start();
});
