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
			var titleRegex = /^(((([a-zA-Z0-9]+)([\s\,\.\?\-\'\*]*))+)|(([\s\,\.\?\-\'\*]*)([a-zA-Z0-9]+)([\s\,\.\?\-\'\*]*))+)$/;
			return (value &&
				titleRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only 1 or more letters-digits-spaces allowed"};
		},

		director: function(value) {
			var directorRegex = /^(((([a-zA-Z0-9]+)([\s\,\.\?\-\'\*]*))+)|(([\s\,\.\?\-\'\*]*)([a-zA-Z0-9]+)([\s\,\.\?\-\'\*]*))+)$/;
			return (value &&
				directorRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only 1 or more letters-digits-spaces allowed"};
		},
		released: function(value){
			var releasedRegex = /^(19[1-9]\d|200\d|201[0-6])$/
			return (value &&
				releasedRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only dates between 1910-2016 allowed"}
		},
		starring: function(value){
			var starRegex = /^(?:[a-zA-Z0-9-,.'"\s]*(?:\s*[a-zA-Z0-9-,.'"\s]*)*)\s*(?:,\s*(?:[a-zA-Z0-9-,.'"\s]*(?:\s*[a-zA-Z0-9-,.'"\s]*)*))*$/
			return (value &&
				starRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only white space seperated words are allowed"}
		
		},
		rating: function(value){
			 //G, PG, PG-13, R, NC-17, NR
			if (value === "PG-13" || value === "NC-17" || value === "PG" || value === "G" || value==="R" ||value==="NR"){
			 	return{isValid:true}
			 }
			else{
				return{isValid:false,message: "Only G, PG, PG-13, R, NC-17, NR are allowed"}
			}
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
			var genreRegex = /^(?:[a-zA-Z0-9-,.'"\s]*(?:\s*[a-zA-Z0-9-,.'"\s]*)*)\s*(?:,\s*(?:[a-zA-Z0-9-,.'"\s]*(?:\s*[a-zA-Z0-9-,.'"\s]*)*))*$/
			return (value &&
				genreRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Only white space seperated words are allowed"}
		},
		synopsis: function(value){
			var synopsisRegex = /^(\w.|.\w|.)+$/
			return (value &&
				synopsisRegex.test(value)) ?
				{isValid: true}
				: {isValid: false, message: "Please write something"}
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
			if (value === "")
				{
					return{isValid: true};
				}
			else{
				var trailerRegex = /^(https|http)?:\/\/(www\.)?(\w|(\.\w))+(\/|\w)*(\/|\#)?(\w|\.)+(\/)?$/
				return( value &&
					trailerRegex.test(value)) ?
					{isValid: true}
					: {isValid: false, message: "Only properly formatted urls allowed"}
			}
		},

		dated: function(value){
			// if a validator is defined on this key
			// test it, else defaults to valid
			/*return (this.validators.dated[value]) ?
			this.validators.dated[value](this.get(value))
			: {isValid: true};*/
		}
	},

	idAttribute: "_id"

})