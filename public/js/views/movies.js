// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

// note View-name (About) matches name of template file About.html
splat.MovieThumb = Backbone.View.extend({
	
    initialize: function() {
        this.movieThumbLoad = $.get('tpl/MovieThumb.html');
    },
    // render the View
    render: function () {
		this.movieThumbLoad.done(function(markup) {
		//idk
		// Now "markup" contains the response to the $.get() request.
		// Turn this markup into a function using Underscore's
		// template() // function.
		// Finally apply the moviesTemplate shown below to your
		// movies collection and the template function you just created.
		this.$el.html(this.template());
		return this;    // support method chaining
    }

});
