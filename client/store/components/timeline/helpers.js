Template.timeline.helpers({
	statements: function(){

		if(this.statements !== undefined){
			return Statements.find({ _id: { $in: this.statements } }, { sort: { stored: -1 }, limit: 10 });	
		}
		
		return [];
	},
	sentence: function(){
		var statement = new Statement(this);

		return statement.getPrettyFormat();
	}
});