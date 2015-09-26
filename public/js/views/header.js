// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

// note View-name (Header) matches name of template file Header.html
splat.Header = Backbone.View.extend({

    // render the View
    render: function () {
	// set the view element ($el) HTML content using its template
	this.$el.html(this.template());
	return this;    // support method chaining
    }

});

function selectMenuItem(menuItem) {
	menuItem.addClass('active').siblings().removeClass("active");
}

