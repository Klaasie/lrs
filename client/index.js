/**
 * Startup scrips
 */
Meteor.startup(function(){
	Session.setDefault('messages', false);
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