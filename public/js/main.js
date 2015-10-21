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
		"movies":"browse",
		"movies/add": "moviesadd",
		"movies/:id":"moviedit"
    },

    // When an instance of an AppRouter is declared, create a Header view
    initialize: function() {
        // instantiate a Header view
        this.headerView = new splat.Header();
        // insert the rendered Header view element into the document DOM
        $('.header').html(this.headerView.render().el);
        this.movies = new splat.Movies();
        this.movies.fetch();
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
    browse: function() {
        if (!this.moviesView) {
            this.moviesView = new splat.MovieView({collection:this.movies});
        }
        $('#content').html(this.moviesView.render().el);
		selectMenuItem($('.browse-menu'));
    },
    moviedit: function(id) {
        this.movieModel = this.movies.get(id);
        this.detailsView = new splat.Details({collection: this.movies, model: this.movieModel});
        $('#content').html(this.detailsView.render().el);
        selectMenuItem($('.add-menu'));
    },
    moviesadd: function() {
        this.movie = new splat.Movie();
        this.detailsView = new splat.Details({collection: this.movies, model: this.movie});
        // insert the rendered Home view element into the document DOM
        $('#content').html(this.detailsView.render().el);
		selectMenuItem($('.add-menu'));
    }
});

// Load HTML templates for Home, Header, About views, and when
// template loading is complete, instantiate a Backbone router
// with history.
splat.movieThumbLoad = $.get('tpl/MovieThumb.html');
splat.movieThumbLoad.done(function(markup) {
            splat.markup = markup;
        });
splat.utils.loadTemplates(['Home', 'Header', 'About', 'Details'], function() {
    splat.app = new splat.AppRouter();
    Backbone.history.start();
});
