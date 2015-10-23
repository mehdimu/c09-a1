// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};


splat.Movies = Backbone.Collection.extend({
    // identify collectionâ€™s model
    model: splat.Movie,

    // save movie models in localStorage under "splat" namespace
    localStorage: new Backbone.LocalStorage('splat')
});


