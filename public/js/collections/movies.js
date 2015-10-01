// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};


splat.Movies = Backbone.Collection.extend({
	
	model: splat.Movie,
	localStorage: new Backbone.LocalStorage('splat')
});

var MoviesColl = new splat.Movies;

window.c = MoviesColl;