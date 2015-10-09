// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

// note View-name (Home) matches name of template file Home.html
splat.Details = Backbone.View.extend({

    // render the View
    render: function () {
	// set the view element ($el) HTML content using its template
	this.$el.html(this.template());
	return this;    // support method chaining
    },
	events:{
	"click #save":  'save',
	"click #delete": 'destroy',	
	},
	save: function(){
	//idk
	},
	destroy: function(){
		this.model.destroy({
			wait: true,  // don't destroy client model until server responds
			success: function(model, response) {
				// later, we'll navigate to the browse view upon success
					splat.app.navigate('#', {replace:true, trigger:true});
				// notification panel, defined in section 2.6
					splat.utils.showAlert('Success', "Movie deleted", 'alert-success')
			},
			error: function(model, response) {
				// display the error response from the server
					splat.utils.requestFailed(response);
			}
		});
	}
});
