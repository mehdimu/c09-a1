// catch simple errors
"use strict";

// declare splat-app namespace if it doesn't already exist
var splat =  splat || {};

splat.Movie = Backbone.Model.extend({
	defaults: {
		title: "",
		released: null,
		director: "",
		starring: [],
		rating: "",
		duration: null,
		genre: [],
		synopsis: "",
		freshtTotal: 0.0,
		freshVotes: 0.0,
		trailer: null,
		poster: "",
		dated: new Date()
	},
	//this.validators *ali*
	validators:{	
		title: function(value) {
			// if a validator is defined on this key
			// test it, else defaults to valid
			/*return (this.validators.title[value]) ?
			this.validators.title[value](this.get(value))
			: {isValid: true};*/
			 if (!this.validators.title)
				return 'Please fill title field.';
		},

		director: function(value) {
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.director[value]) ?
			this.validators.director[value](this.get(value))
			: {isValid: true};
		},
		released: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.released[value]) ?
			this.validators.released[value](this.get(value))
			: {isValid: true};
		},
		starring: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.starring[value]) ?
			this.validators.starring[value](this.get(value))
			: {isValid: true};
		},
		rating: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.rating[value]) ?
			this.validators.rating[value](this.get(value))
			: {isValid: true};
		},
		duration: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.duration[value]) ?
			this.validators.duration[value](this.get(value))
			: {isValid: true};
		},
		genre: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.genre[value]) ?
			this.validators.genre[value](this.get(value))
			: {isValid: true};
		},
		synopsis: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.synopsis[value]) ?
			this.validators.synopsis[value](this.get(value))
			: {isValid: true};
		},
		freshtTotal: function(value){
		// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.freshtTotal[value]) ?
			this.validators.freshtTotal[value](this.get(value))
			: {isValid: true};
		},
		freshVotes: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.freshVotes[value]) ?
			this.validators.freshVotes[value](this.get(value))
			: {isValid: true};
		},
		poster: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.poster[value]) ?
			this.validators.poster[value](this.get(value))
			: {isValid: true};
		},
		
		dated: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			return (this.validators.dated[value]) ?
			this.validators.dated[value](this.get(value))
			: {isValid: true};
		}
	},
	
	idAttribute: "_id"

})