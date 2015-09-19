// Application routes
// Default route for non-logged in users
Router.onBeforeAction(function() {
	if (! Meteor.userId() ) {
		// Not logging in, proceed to login page.
		Router.go('login');
		this.next();
	}

	this.next();
},{
	except: ['login']
});

Router.onAfterAction(function() {

},{
	except: ['login']
});

Router.route('/login', {
	onBeforeAction: function(){

		if( Meteor.userId() ){
			Router.go('/');
			this.next();
		}

		this.next();
	},
	action: function(){
		this.layout('login')
	}
});

Router.route('/', {
	action: function(){
		this.layout('application')
		this.render('dashboard');	
	}
});