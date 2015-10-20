/**
 * Startup scrips
 */
Meteor.startup(function(){
	/**
	 * Setting session variables
	 */
	Session.setDefault('messages', false);
	Session.setDefault('storeId', false);

	/**
	 * Setting variables
	 */
	messages = new Messages();
});

/**
 * Application template helpers
 */
Template.application.helpers({
	message: function(){
		if(Session.get('messages')){
			return true;
		}
	}	 
})

/**
 * Application template rendered
 */
Template.application.rendered = function(){
}