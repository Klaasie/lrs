/**
 * Startup scrips
 */
Meteor.startup(function(){
	// Set session variables
	Session.setDefault('messages', false);
	Session.setDefault('storeId', false);

	messages = new Messages();
	messages.set('Test content', 'success');
	messages.set('Test content 2', 'error');

	console.log(messages);
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