/**
 * Statement controller
 * @param {Object} statement Statement object
 * @type {Class}
 */
Statement = function(statement){
	/**
	 * var status
	 */
	this.status = "passed";

	/**
	 * var errors
	 */
	this.error;

	/**
	 * var statement
	 */
	this.statement = unicodeToDots(statement);

	/**
	 * Get errors
	 * @return {String} Error description
	 */
	this.getError = function(){
		return this.error;
	}

	/**
	 * Get status
	 * @return {String} Status description
	 */
	this.getStatus = function(){
		return this.status;
	}

	/**
	 * Get statement
	 * @return {Object} The full statement
	 */
	this.getStatement = function(){
		return this.statement;
	}

	/**
	 * Validate the statement
	 * @return {Boolean} true or false depending on validation checks
	 */
	this.validate = function(){
		// Check if statement is the object it's supposed to be
		if( (typeof this.statement != "object") ){
			this.status = "failed";
			this.error = "Statement not of type object";
			return false;
		}

		// Check if id is present or add it
		if( !this.validateId()){
			return false;
		}

		// Validate Actor
		if( !this.validateActor() ){
			return false;
		}

		// Validate Verb
		if( !this.validateVerb() ){
			return false;
		}

		// Validate Object
		if( !this.validateObject() ){
			return false;
		}

		// Validat context
		if( !this.validateContext() ){
			return false;
		}

		// Validate time
		if( !this.validateTime() ){
			return false;
		}

		// Return the result
		return true;
	}

	/**
	 * Validate id key
	 * @return {Boolean} True or false
	 */
	this.validateId = function(){
		if( !("id" in this.statement) ){
			this.statement.id = this.createUuid();
		}

		return true;
	}

	/**
	 * Validate the actor object within the statement
	 * For more details, check:
	 * https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#actor
	 * @return {Boolean} True or false depending on validation checks
	 */
	this.validateActor = function(){
		var self = this;

		// Check if actor exists
		if( !("actor" in this.statement) ){
			this.status = "failed";
			this.error = "No actor found.";
			return false;
		}

		// Check if objectType exists
		if( !("objectType" in this.statement.actor) ){
			this.status = "failed";
			this.error = "No objectType found.";
			return false;
		}

		// Check if the object type is Agent or Group
		var actorType = _.find(["Agent", "Group"], function(type){
			return type == self.statement.actor.objectType;
		});

		// If neither, present error
		if(typeof actorType == "undefined"){
			this.status = "failed";
			this.error = "No valid objectType found.";
			return false;
		}

		// Validate the correct type
		if(actorType == "Agent"){
			if(this.validateAgent(this.statement.actor)){
				// validate email
				// @TODO don't do this twice..
				if( ("mbox" in this.statement.actor) ){
					this.statement.actor.mbox = this.validateEmailString(this.statement.actor.mbox);
				}

				if( ("account" in this.statement.actor) ){
					if( !this.validateAccount(this.statement.actor.account) ){
						return false;
					}
				}

				return true;
			}

			return false;
		}else{
			return this.validateGroup();
		}

	}

	/**
	 * Validate if actor has correct IFI
	 * @param  {Abject} actor actor information
	 * @return {Boolean}       true / false
	 */
	this.validateAgent = function(actor) {

		// Check if one of the Inverse Functional Identifiers are in place
		var actorType = _.find(["mbox", "mbox_sha1sum", "openid", "account"], function(type){
			return (type in actor);
		});

		if(typeof actorType == "undefined"){
			this.status = "failed";
			this.error = "No valid inverse functional identifier found for actor object";
			return false;
		}

		// If all have passed
		return true;
	}

	/**
	 * Validate group and member object
	 * @return {Boolean} true / false
	 */
	this.validateGroup = function(){
		var self = this;

		// Check if member key exists
		if( !("member" in this.statement.actor) ){
			this.status = "failed";
			this.error = "No member array found.";
			return false;
		}

		// Check if members array actually contains something
		if( this.statement.actor.member.length == 0){
			this.status = "failed";
			this.error = "Member array empty.";
			return false;
		}

		// Loop through members and check if they have a valid agent
		_.each(this.statement.actor.member, function(value, key){
			self.validateAgent(value);

			// Check if one of the Inverse Functional Identifiers are in place
			// @TODO don't do this twice..
			if( ("mbox" in value) ){
				self.statement.actor.member[key].mbox = self.validateEmailString(value.mbox);
			}

			if( ("account" in value) ){
				self.validateAccount(value.account);
			}
		});

		// Make sure everything is still cool
		if(this.status != "passed"){
			return false;
		}

	}

	/**
	 * Validate account type object
	 * @param  {Object} account Account info
	 * @return {Boolean}         true / false
	 */
	this.validateAccount = function(account) {
		// Check if homePage exists
		if( !("homePage" in account) ){
			this.status = "failed";
			this.error = "No homePage found in account object.";
			return false;
		}

		// Check if name exists
		if( !("name" in account) ){
			this.status = "failed";
			this.error = "No name found in account object.";
			return false;
		}

		return true;
	}

	/**
	 * Validate verb object
	 * @return {Boolean} true if validation checks out
	 */
	this.validateVerb = function() {
		// Check if verb exists
		if( !("verb" in this.statement) ){
			this.status = "failed";
			this.error = "No verb found.";
			return false;
		}

		// Check if verb id exists
		if( !("id" in this.statement.verb) ){
			this.status = "failed";
			this.error = "No verb id found.";
			return false;
		}

		return true;
	}

	/**
	 * Validate object 
	 * @return {Boolean} True if it checks out
	 */
	this.validateObject = function() {
		// Check if object exists
		if( !("object" in this.statement) ){
			this.status = "failed";
			this.error = "No object found.";
			return false;
		}

		// Check if object id exists
		if( !("id" in this.statement.object) ){
			this.status = "failed";
			this.error = "No object id found.";
			return false;
		}

		return true;
	}

	this.validateContext = function(){
		return true;
	}

	/**
	 * Checks timestamp and adds one if needed
	 * @return {Boolean} true / false
	 */
	this.validateTime = function() {
		// Current date
		var date = new Date();

		// Adding timestamp of inserting in this database.
		this.statement.stored = date.toISOString();

		// If the statement doesn't present a timestamp itself, add one.
		if(typeof this.statement.timestamp == "undefined"){
			this.statement.timestamp = date.toISOString();
		}

		return true;
	}

	/**
	 * Validates the email conform xAPI
	 * @param  {String} email string containing email address
	 * @return {String}       String containing email address potentionally modified
	 */
	this.validateEmailString = function(email) {
		if(email.indexOf("mailto:") == -1){
			email = "mailto:" + email;
		}

		return email;
	}

	/**
	 * Generate a UUID for the statement
	 * @return {String} The UUID
	 */
	this.createUuid = function() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	/**
	 * Returns a pretty version of the statement if possible
	 * @return {String} Sentence of the statement
	 */
	this.getPrettyFormat = function(){
		var actor, verb, object, sentence;

		if(typeof this.statement.actor.name !== "undefined"){
			actor = this.statement.actor.name;
		}else{
			actor = this.statement.actor.mbox;
		}

		// Lets assume for now if display is set that there is a en-US version
		if(typeof this.statement.verb.display !== "undefined"){
			verb = this.statement.verb.display["en-US"];
		}else{
			verb = this.statement.verb.id;
		}

		if(typeof this.statement.object.definition !== "undefined"){
			if(typeof this.statement.object.definition.description !== "undefined"){
				object = this.statement.object.definition.description["en-US"];
			}else if(typeof this.statement.object.definition.name !== "undefined"){
				object = this.statement.object.definition.name["en-US"];
			}
		}else{
			object = this.statement.object.id;
		}

		sentence = actor + ' ' + verb + ' ' + object;

		return sentence;
	}

	// Needs a different place
	function unicodeToDots(statement){
		// Retrieve paths to replace 
		var pathsToReplace = unicodeKeys(statement.context);

		// Loop through paths to replace
		// Key = path
		// Value = path to the path
		for(var key in pathsToReplace){
			// Replace all dots for unicode
			var pattern = new RegExp('\\u002e', 'g')

			var newKey = key.replace(/\\u002e/g, '.');

			// Retrieve path to it
			var oldPath = pathsToReplace[key];

			// save new path name
			statement.context[oldPath][newKey] = statement.context[oldPath][key];

			// Delete old path name
			delete statement.context[oldPath][key];
		}

		// Return true
		return statement; // always for now
	}

	function unicodeKeys(object){
		path = '';
		paths = [];

		_.each(object, findUnicode);

		return paths;
	}

	function findUnicode(value, key) {
		var savepath = path;

		path = path ? (path + "." + key) : key;

	    // ...do what you like with `key` and `value`
		if(typeof key === "string" && key.indexOf('\\u002e') !== -1){
			paths[key] = savepath;
		}
	 
	    if (typeof value === "object") {
	        // Recurse into children
	        _.each(value, findUnicode);
	    }

	    path = savepath;
	}

}