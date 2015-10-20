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
	change: function(event){
		// Remove any existing alert message(s)
		splat.utils.hideNotice();
		// object to hold form-field name:value pairs
		var changeObj = {};
		// Add change value to changeObj; change event is
		// triggered once for each changed field value
		changeObj[event.target.id] = event.target.value;
		// reflect changes back to the model
		this.model.set(changeObj);
		// Run validation rule on changed item
		var check =
		this.model.validateItem(event.target.id);
		// check is tuple <isValid: Boolean, message: String>
		if (check.isValid){
			splat.utils.removeValidationError(event.target.id);
			splat.utils.showNotice("Note: Changes made! Remember to click save!", 'alert-info');
		}
		else{
			splat.utils.addValidationError(event.target.id, check.message);
			splat.utils.showNotice("Note: There are errors in your form, please fix them before proceeding", 'alert-danger');
		}
		//check.isValid ? splat.utils.removeValidationError(event.target.id) : splat.utils.addValidationError(event.target.id, check.message);
		
	},
	test: function(){
		// Run validation rule on changed item
		var list = ['title','released','director','starring','rating','duration','genre','synopsis','trailer'];
		var problem = false;
		for(var k in list) {
			 console.log(list[k]);
			 var check = this.model.validateItem(list[k]);
			 if (check.isValid){
				splat.utils.removeValidationError(list[k]);
			}
			else {
				splat.utils.addValidationError(list[k], check.message);
				problem = true;
				break;
			}
		}
		if (!problem){
			this.save();
		}
		
	},
	events:{
		"click #save":  'test',
		"click #delete": 'destroy',
		"change input": 'change',
		"change textarea": 'change'
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
                trailer: $('#trailer').val(),
                poster: '../img/poster.jpeg'}, {
                        success: function(resp) {
                            splat.app.navigate('#movies/'+resp.id, {replace:true, trigger:true});
                            splat.utils.showNotice("Movie added", 'alert-success');
                        },	error: function(resp) {
				    // display the error response from the server
					splat.utils.showNotice("Movie add failed", 'alert-danger');
					splat.utils.requestFailed(response);
				}
						});
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
		trailer: $('#trailer').val(),
		poster: '../img/poster.jpeg'}, {
                success: function(resp) {
					splat.app.navigate('#movies/'+resp.id, {replace:true, trigger:true});
					splat.utils.showNotice("Movie updated", 'alert-info');
                },
				error: function(resp,error) {
				    // display the error response from the server
					splat.utils.showNotice("Movie update failed", 'alert-danger');
					splat.utils.requestFailed(error);

				}

				});
	}},
	destroy: function(){
		this.model.destroy({
			wait: true,  // don't destroy client model until server responds
			success: function(model, response) {
                        splat.app.navigate('#movies', {replace:true, trigger:true});
					splat.utils.showNotice("Movie deleted", 'alert-danger');
			},
			error: function(model, response) {
				    // display the error response from the server
					splat.utils.requestFailed(response);
			}
		});
	}
});
