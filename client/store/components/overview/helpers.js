Template.storeOverview.helpers({
    statementsCount: function(){
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        if(typeof store.statements !== "undefined"){
            return store.statements.length;
        } else {
            return 0;
        }
    },
    statementsLastWeek: function(){
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        // Get one week ago
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        // Query amount
        if(typeof store.statements !== "undefined"){
            return Statements.find({ _id: { $in: store.statements } , stored: {$gt: oneWeekAgo.toISOString()} }).count();
        }else{
            return 0;
        }

        // Return it
        return statementsCount;
    },
    weeklyStatementCount: function(){
        /**
         * @todo Limit the amount of weeks displaying, but not sure how many weeks just yet.
         */
        
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        var statements = Statements.find({ _id: { $in: store.statements } }).fetch();

        var groupedStatements = _.groupBy(_.pluck(statements, 'stored'), function(stored){
            var date = new Date(stored);

            return date.getWeekNumber();
        });


        var values = []
        var previousKey = 0;
        _.each(groupedStatements, function(value, key){

            // To get the correct time line, check if there are week numbers missing
            if(previousKey && (key - previousKey) >= 2){
                // Adding up to previous key
                previousKey++;
                // For each key missing, add 0 value
                for (n = previousKey; n < key; n++ ){
                    values.push(0);
                }
            }

            // Set the previous key
            previousKey = key;

            // Check if weeknumber is NaN, for now lets ignore these
            if(!isNaN(key))
                values.push(value.length);
        });

        // Return them values
        return values;
    },
    usersCount: function() {
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        return store.users.length;
    },
    activeUsers: function() {
        // Get one week ago
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        // Query amount
        var statementIds = Statements.find({stored: {$gt: oneWeekAgo.toISOString()}}).map(function(item){ return item._id; });


        if(statementIds.length > 0){
            return Meteor.users.find({statements: {$in: statementIds}}).count();
        }else{
            return 0;
        }
    },
    weeklyUsersCount: function(){
        /**
         * @todo Limit the amount of weeks displaying, but not sure how many weeks just yet.
         */
        
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        var statements = Statements.find({ _id: { $in: store.statements } }).fetch();

        var groupedStatements = _.groupBy(statements, function(statement){

            var date = new Date(statement.stored);

            return date.getWeekNumber();
        });


        var values = []
        var previousKey = 0;
        _.each(groupedStatements, function(value, key){

            // To get the correct time line, check if there are week numbers missing
            if(previousKey && (key - previousKey) >= 2){
                // Adding up to previous key
                previousKey++;
                // For each key missing, add 0 value
                for (n = previousKey; n < key; n++ ){
                    values.push(0);
                }
            }

            // Set the previous key
            previousKey = key;

            // Group the array by unique users based on mbox.
            var users = _.groupBy(value, function(statement){
                return statement.actor.mbox;
            });

            // Check if weeknumber is NaN, for now lets ignore these
            if(!isNaN(key))
                values.push(Object.keys(users).length);
        });

        // Return them values
        return values;
    },
    activityCount: function() {
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        if(typeof store.statements !== "undefined"){
            // Retrieve statements
            var statements = Statements.find({ _id: { $in: store.statements } }).fetch();

            // Group them by object.id (the unique identifier)
            var grouped = _.countBy(statements, function(statement){
                return statement.object.id;
            })

            // Return count
            return Object.keys(grouped).length;
        }

        return 0;
    },
    activeActivities: function() {
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        if(typeof store.statements !== "undefined"){
            // Get one week ago
            var oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            // Retrieve statements
            if(typeof store.statements !== undefined){
                var statements = Statements.find({ _id: { $in: store.statements }, stored: {$gt: oneWeekAgo.toISOString()} }).fetch();

                // Group them by object.id (the unique identifier)
                var grouped = _.countBy(statements, function(statement){
                    return statement.object.id;
                })

                // Return count
                return Object.keys(grouped).length;
            }
        }

        return 0;
    },
    weeklyActivityCount: function(){
        /**
         * @todo Limit the amount of weeks displaying, but not sure how many weeks just yet.
         */
        
        var storeId = FlowRouter.getParam('storeId');
        var store = Stores.findOne(storeId);

        var statements = Statements.find({ _id: { $in: store.statements } }).fetch();

        var groupedStatements = _.groupBy(statements, function(statement){

            var date = new Date(statement.stored);

            return date.getWeekNumber();
        });


        var values = []
        var previousKey = 0;
        _.each(groupedStatements, function(value, key){

            // To get the correct time line, check if there are week numbers missing
            if(previousKey && (key - previousKey) >= 2){
                // Adding up to previous key
                previousKey++;
                // For each key missing, add 0 value
                for (n = previousKey; n < key; n++ ){
                    values.push(0);
                }
            }

            // Set the previous key
            previousKey = key;

            // Group the array by unique users based on mbox.
            var users = _.groupBy(value, function(statement){
                return statement.object.id;
            });

            // Check if weeknumber is NaN, for now lets ignore these
            if(!isNaN(key))
                values.push(Object.keys(users).length);
        });

        // Return them values
        return values;
    },
    lineOptions: function() {
        return {
            width: "180px",
            height: "180px",
            lineColor: "#FFF",
            fillColor: false
        }
    }
});