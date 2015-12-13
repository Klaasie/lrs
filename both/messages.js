/**
 * Messages controller
 * @type {Class}
 */
Messages = function(){

    /**
     * Box to contain all messages
     * @type {Array}
     */
    this.box = [];

    /**
     * Retrieve all messages
     * @return {Array} Array of objects
     */
    this.get = function(){
        return this.box;
    }

    /**
     * Set a message
     * @param {String} text Contains message text
     * @param {String} type Contains message type
     */
    this.set = function(text, type){

        var id = this.box.length + 1;

        this.box[id] = {};

        this.box[id].id = id;
        this.box[id].text = text;
        this.box[id].type = type;
    }

    /**
     * Remove message from box
     * @param  {Integer} id Id of message to remove
     */
    this.remove = function(id) {
        this.box.splice(id, 1);
    }

}