// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

// note View-name (About) matches name of template file About.html
splat.MovieView = Backbone.View.extend({
    initialize: function() {
        
        
    },
    
    moviesTemplate: _.template([
                            "<% movies.each(function(movie) { %>",
                                "<%= movieTemplate(movie.toJSON()) %>",
                            "<% }); %>",
                        ].join('')),
    // render the View
    render: function () {
            this.template = _.template(splat.markup);
			var someMarkup = this.moviesTemplate({
							movies: this.collection,
							movieTemplate: this.template
			});
			this.$el.html(someMarkup);
			return this;
}});
