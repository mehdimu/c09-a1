// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

// note View-name (Home) matches name of template file Home.html
splat.Details = Backbone.View.extend({

    // render the View
    render: function () {
        // set the view element ($el) HTML content using its template
        this.$el.html(this.template(this.model.attributes));
        return this;    // support method chaining
    },
	events:{
		"click #save":  'save',
		"click #delete": 'destroy',	
	},
	save: function() {
        if (this.model.isNew()) {
            this.collection.create(
                {title: $('#title').val(),
                released: $('#released').val(),
                director: $('#director').val(),
                starring: [$('#starring').val()],
                rating: $('#rating').val(),
                duration: $('#duration').val(),
                genre: [$('#genre').val()],
                synopsis: $('#synopsis').val(),
                freshtTotal: 0.0,
                freshVotes: 0.0,
                trailer: '../img/dizzy.webm',
                poster: '../img/poster.jpeg'}, {
                        success: function(resp) {
                            splat.app.navigate('#movies/'+resp.id, {replace:true, trigger:true});
                            splat.utils.showNotice('Success', "Movie added", 'alert-success');
                        }});
            }
        else {
        this.model.save(
//	wait: true,  // don't destroy client model until server responds
//        this.collection.create(
            {title: $('#title').val(),
		released: $('#released').val(),
		director: $('#director').val(),
		starring: [$('#starring').val()],
		rating: $('#rating').val(),
		duration: $('#duration').val(),
		genre: [$('#genre').val()],
		synopsis: $('#synopsis').val(),
		freshtTotal: 0.0,
		freshVotes: 0.0,
		trailer: '../img/dizzy.webm',
		poster: '../img/poster.jpeg'}, {
                success: function(resp) {
					splat.app.navigate('#movies/'+resp.id, {replace:true, trigger:true});
					splat.utils.showNotice('Success', "Movie added", 'alert-success');
                }});
	}},
	destroy: function(){
		this.model.destroy({
			wait: true,  // don't destroy client model until server responds
			success: function(model, response) {
                    //setTimeout(function() {
                        // later, we'll navigate to the browse view upon success
                        splat.app.navigate('#movies', {replace:true, trigger:true});
                        // notification panel, defined in section 2.6
                    //}, 3000);
					splat.utils.showNotice('Success', "Movie deleted", 'alert-danger');
			},
			error: function(model, response) {
				    // display the error response from the server
					splat.utils.requestFailed(response);
			}
		});
	}
});
