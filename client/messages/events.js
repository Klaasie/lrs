Template.messages.events({
	"click #closeMsg": function(event){
		event.preventDefault();

		$(event.currentTarget).parent().css('opacity', 0);

		$(event.currentTarget).parent().one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			$(this).remove();
		});

		messages.remove(this.id);
	}
});