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
		"change #selectImage": 'selectImage',
		"change input": 'change',
		"change textarea": 'change',
		"drop #detailsImage": 'dropHandler',
		"dragover #detailsImage": 'dragoverHandler'
	},
	selectImage: function(event) {
		// set object attribute for image uploader
		this.pictureFile = event.target.files[0];
		// if the file type is image, read it
		if ( true//check if this.pictureFile is image...
			) {
			this.imageRead(this.pictureFile,
			this.pictureFile.type);
		}
		// else display error notification
	},
	imageRead: function(pictureFile, type) {
		var self = this;
		var reader = new FileReader();
		// callback for when read operation is finished
		reader.onload = function(event) {
		var targetImgElt = $('#detailsImage')[0];
		// reader.result is image data in base64 format
		targetImgElt.src = reader.result;
		self.model.set('poster', reader.result);
		};
		reader.readAsDataURL(pictureFile);
		// read image file
	},
	dragoverHandler: function(event) {
		// don't let parent element catch event
		event.stopPropagation();
		// prevent default to enable drop event
		event.preventDefault();
		// jQuery event doesn’t have dataTransfer
		// field - so use originalEvent
		event.originalEvent.dataTransfer.dropEffect = 'copy';
	},
	dropHandler: function (event) {
		console.log("here2");
		event.stopPropagation(); event.preventDefault();
		var ev = event.originalEvent;
		// set object attribute for use by uploadPicture
		this.pictureFile = ev.dataTransfer.files[0];
		// only process image files
		if ( true
		// check that file is image type...
		) {
		// Read image file and display in img tag
		this.imageRead(this.pictureFile,
		this.pictureFile.type);
		}
		// else display notification error
	},
	resize: function(sourceImg, type, quality) {
		var type = type || "image/jpeg"; // default MIME image type
		var quality = quality || "0.95"; // tradeoff quality vs size
		var image = new Image(), MAX_HEIGHT = 300, MAX_WIDTH = 450;
		image.src = sourceImg;
		image.height = image.height // ADD CODE to scale height
		image.width = image.width // ADD CODE to scale height
		var canvas = document.createElement("canvas");
		canvas.width = image.width; // scale canvas to match image
		canvas.height = image.height;
		var ctx = canvas.getContext("2d"); // get 2D renderig context
		ctx.drawImage(image,0,0, image.width, image.height); // render
		return canvas.toDataURL(type, quality);
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
                poster: $('#detailsImage')[0].src}, {
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
		trailer: $('#trailer').val()}, {
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
