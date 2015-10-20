Template.messages.helpers({
	classes: function(){
		var classes;
		var message = Session.get('messages');

		switch (this.type){
			case 'error':
				classes = 'red darken-3';
				break;
			case 'success':
			 	classes = 'light-green darken-1';
			 	break;
			case 'warning':
				classes = 'yellow darken-1';
				break;
			default:
				classes = 'blue darken-1';
		}

		return classes;
	},
	content: function(){
		var message = Session.get('messages');
		return message.content;
	},
	messages: function(){
		return messages.get();
	}
});