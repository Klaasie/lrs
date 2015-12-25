/**
 * Startup scrips
 */
Meteor.startup(function(){
    /**
     * Settings
     */
    AutoForm.setDefaultTemplate("semanticUI");

    /**
     * Setting session variables
     */
    Session.setDefault('messages', false);

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
    },
    authInProcess: function() {
        // If loggging in, show loading page
        if( Meteor.loggingIn() ){
            return Meteor.loggingIn()
        }

        // If not logging in, check if we have a user
        if (! Meteor.userId() ) {
            FlowRouter.go("/login");
        }
    }
});

/**
 * Application template rendered
 */
Template.application.rendered = function(){
}

BlazeLayout.setRoot('body');