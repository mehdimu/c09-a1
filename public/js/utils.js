// catch simple errors
"use strict";

// declare splat-app namespace, if it doesn't already exist
var splat = splat || {};

splat.utils = {

    // Asynchronously load templates located in separate .html files using
    // jQuery "deferred" mechanism, an implementation of Promises.  Note we
    // depend on template file names matching corresponding View file names,
    // e.g. Home.html and home.js which defines Backbone View "Home".
    /*
     * @param {[String]} views:  filenames of templates to be loaded
     * @param {function} callback:  callback function invoked when file is loaded
     */
    loadTemplates: function(views, callback) {

	// Array of deferred actions to keep track of template load status
        var deferreds = [];

	// Process each template-file in views array
        /*
         * @param {[integer]} index:  position of view template within views array
         * @param {[String]} view:  root name (w/o .html) of view template file
         */
        $.each(views, function(index, view) {
	    // If an associated Backbone view is defined, set its template function
            if (splat[view]) {

		// Push task of retrieving template file into deferred array.
		// Task performs "get" request to load the template, then passes
		// resulting template data to anonymous function to process it.
	        /*
	         * @param {String} data:  HTML from template file as String
	         */
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
	    	    // Set template function on associated Backbone view.
                    splat[view].prototype.template = _.template(data);
                }));

	    // No Backbone view file is defined; cannot set template function.
            } else {
                console.log(view + " not found");
            }
        });

	// When all deferred template-loads have completed,
	// invoke callback function.
        $.when.apply(null, deferreds).done(callback);
    },
	showNotice: function(msg, className){
        // use jQuery to address input field by its
		// selector attribute
        var el = $('.Success');
        el.show();
        el.text(msg);
        el.addClass(className);
		el.fadeOut(5000, function(){
			el.removeClass(className);
		});
	},
	hideNotice: function(){
        // use jQuery to address input field by its
		// selector attribute
		var el = $('.Success');
        el.stop();
    },
	addValidationError: function(field, message) {
		// use jQuery to address input field by its
		// name attribute
		var formgroup = $('#'+field).parent();
		formgroup.addClass('has-error');
		$('.help-block', formgroup).html(message);
	},
	removeValidationError: function (field) {
		// similar to above
		// use jQuery to address input field by its
		// name attribute
		var formgroup = $('#'+field).parent();
		formgroup.removeClass('has-error');
		$('.help-block', formgroup).html('');

	}

};
