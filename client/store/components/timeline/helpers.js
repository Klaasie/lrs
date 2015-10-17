Template.timeline.helpers({
	statements: function(){
		return Statements.find({}, { sort: { stored: -1 }, limit: 10 });
	},
	sentence: function(){
		/**
		 * @todo  Ideally we'll do this from the statement class.. and have some checks
		 */
		return this.actor.name + ' ' + this.verb.display["en-US"] + ' ' + this.object.definition.description["en-US"];
	}
});