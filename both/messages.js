/**
 * Messages controller
 * @type {Class}
 */
Messages = function(){

	this.box = [];

	this.get = function(){
		return this.box;
	}

	this.set = function(text, type){

		var id = this.box.length + 1;

		this.box[id] = {};

		this.box[id].id = id;
		this.box[id].text = text;
		this.box[id].type = type;
	}

	this.remove = function(id) {
		this.box.splice(id, 1);
	}

}