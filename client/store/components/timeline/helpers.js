Template.timeline.helpers({
	statements: function(){
		var storeId = FlowRouter.getParam('storeId');
		var store = Stores.findOne(storeId);

		if(store.statements !== undefined){
			return Statements.find({ _id: { $in: store.statements } }, { sort: { stored: -1 }, limit: 10 });	
		}
		
		return [];
	},
	sentence: function(){
		var statement = new Statement(this);

		return statement.getPrettyFormat();
	}
});