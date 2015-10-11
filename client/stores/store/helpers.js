Template.store.helpers({
	statements: function(){
		return Statements.find({}, { sort: { stored: -1 }, limit: 10 });
	}
})