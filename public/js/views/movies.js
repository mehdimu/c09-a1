// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

// note View-name (About) matches name of template file About.html
splat.MovieView = Backbone.View.extend({
    initialize: function() {
        this.movieThumbLoad = $.get('tpl/MovieThumb.html');
    },
    
    moviesTemplate: _.template([
                            "<% movies.each(function(movie) { %>",
                                "<%= movieTemplate(movie.toJSON()) %>",
                            "<% }); %>",
                        ].join('')),
    // render the View
    render: function () {
		this.movieThumbLoad.done(function(markup) {
			this.template = _.template(markup);
			// Now "markup" contains the response to the $.get() request.
			// Turn this markup into a function using Underscore's
			// template() // function.
			// Finally apply the moviesTemplate shown below to your
			// movies collection and the template function you just created.
        })
			var someMarkup = this.moviesTemplate({
							movies: this.collection,
							movieTemplate: this.template});
			this.$el.append(someMarkup);
			console.log(this.movieThumbLoad);
			return this;
}});
