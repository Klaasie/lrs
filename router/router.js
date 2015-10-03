/**
 * Router onbefore action
 */
Router.onBeforeAction(function() {
	// Not logging in, proceed to login page.
	if (! Meteor.userId() ) {
		Router.go('login');
		this.next();
	}

	// Reset messages on default.
	Session.set('messages', false);

	this.next();
},{
	except: ['login', 'index', 'xAPI']
});

/**
 * Router onafter action
 */
Router.onAfterAction(function() {
	// Do something?
},{
	except: ['login', 'xAPI']
});

/**
 * Loading indicator
 */
Router.configure({
  loadingTemplate: 'loading'
});

/**
 * Rendering login page
 */
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

/**
 * Rendering homepage
 */
Router.route('/', {
	name: 'index',
	onBeforeAction: function(){
		if(Meteor.userId()){
			Router.go('/dashboard');
			this.next();
		}
		this.next();
	},
	action: function(){
		this.render('index');
	}
});

/**
 * Rendering dashboard
 */
Router.route('/dashboard', {
	action: function(){
		this.layout('application')
		this.render('dashboard');	
	},
	waitOn: function(){
		return [Meteor.subscribe('stores'), Meteor.subscribe('users')];
	}
});

/**
 * Rendering stores
 */
Router.route('/stores', {
	action: function(){
		this.layout('application');
		this.render('stores');
	},
	waitOn: function(){
		return Meteor.subscribe('stores');
	}
});

/**
 * Rendering store with id
 */
Router.route('/stores/:_id', {
	action: function(){
		var store =  Stores.findOne({_id: this.params._id});

		this.layout('application');
		this.render('store', {data: store});
	},
	waitOn: function(){
		return [Meteor.subscribe('stores'), Meteor.subscribe('users'), Meteor.subscribe('statements', this.params._id)];
	}
});