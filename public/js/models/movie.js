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

	validateItem: function(key) {
		return (this.validators[key]) ?
			this.validators[key](this.get(key))
			: {isValid: true};
	},
	//this.validators *ali*
	validators:{
		title: function(value) {
			// if a validator is defined on this key
			// test it, else defaults to valid
			/*return (this.validators.title[value]) ?
			this.validators.title[value](this.get(value))
			: {isValid: true};*/
			var titleRegex = /^[a-zA-Z0-9 \,\.\?\-\'\*]+$/;
			return (value &&
				titleRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only 1 or more letters-digits-spaces allowed"};
		},

		director: function(value) {
			// if a validator is defined on this key
			// test it, else defaults to valid
			var directorRegex = /^[a-zA-Z0-9 \,\.\?\-\'\*]+$/;
			return (value &&
				directorRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only 1 or more letters-digits-spaces allowed"};
		},
		released: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			//range: [1910, 2016]
			var releasedRegex = /^(19[1-9]\d|200\d|201[0-6])$/
			return (value &&
				releasedRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only dates between 1910-2016 allowed"}
		},
		starring: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			//starring and genre must consist of one-or-more 
			//comma-separated sequences of whitespace-separated words, 
			//each such word which may optionally include special characters: "-", "'".
			//help on csv part
			var starringRegex = /^\"([^"]+)\",\s*\"([^"]+)\"$/;
			return (value &&
				starringRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only white space seperated words are allowed"}
		},
		rating: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			 //G, PG, PG-13, R, NC-17, NR
			 //help on pg-13 and nc-17
			var ratingRegex = /^G|PG|R|NR|PG-13|NC-17$/
			return (value &&
				ratingRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only G, PG, PG-13, R, NC-17, NR are allowed"}
		},
		duration: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			var durationRegex = /^([0-9]|[0-9][0-9]|[0-9][0-9][0-9])$/
			return (value &&
				durationRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only 0-999 allowed"}
		},
		genre: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			//starring and genre must consist of one-or-more 
			//comma-separated sequences of whitespace-separated words, 
			//each such word which may optionally include special characters: "-", "'".
			//help on csv part
			var starringRegex = /^\"([^"]+)\",\s*\"([^"]+)\"$/;
			return (value &&
				starringRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only white space seperated words are allowed"}
		},
		synopsis: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			var synopsisRegex = /^\w$/
			return( value &&
				synopsisRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only white space seperated words are allowed"}
		},
		freshTotal: function(value){
		// if a validator is defined on this key
			// test it, else defaults to valid
			/*var freshRegex = /^\+?0|[1-9][0-9]*$/
			return (value &&
			freshRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only non-negative integers"}*/
		},
		freshVotes: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			/*supposed to leave it for now
			var freshRegex = /^\+?0|[1-9][0-9]*$/
			return (value &&
			freshRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only non-negative integers"}*/
		},
		trailer: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			//empty string or a properly-formatted URL (e.g. http://www.example.com)
			console.log(value);
			if (value === "")
				{
					return{isValid: true};
				}
			else{
				var trailerRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/
				return( value &&
					trailerRegex.test(value)) ?
					{isValid: true}
					: {isValid: false, message: "Only properly formatted urls allowed"}
			}
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