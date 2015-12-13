/**
 * xAPI Statement methods
 */
Meteor.methods({
    saveStatement: function(data){
        // Retrieve store
        var store = Stores.find({
            _id: data.user.profile.activeStore
        }).fetch();
        store = store[0];   

        if(store.length == 0 || typeof store == "undefined"){
            // Not part of any learning record store.
            data.response.statusCode = 200;
            data.response.success = false;
            data.response.message = "You are not part of any learning record store";
        }

        // I think we have all the necessary information

        /**
         * Removing context property for now due to issues with the bookmark
         * @todo  Fix this, apparently mongo doens't like . or $ in object keys as they are reserved.
         */
        // delete data.statement.context;

        // Statements should live on their own, therefore
        // no information is added about LRS or user
        var statementId = Statements.insert(data.statement, function(error, _id){
        });

        // Instead we save statementid connection to the store
        Stores.update(store._id, {
            $push: {
                statements: statementId
            }
        }, function(error, count){
            if(error){
                
            }
        });

        // And at the user
        Meteor.users.update(data.user._id, {
            $push: {
                statements: statementId
            }
        },function(error, count){
            
        });

        data.response.statusCode = 200;
        data.response.success = true;
        data.response.message = "Statement added!";

        return data.response;
    },
    'getStatements': function(){

    },
    'activateStore': function(storeId) {
        var user = Meteor.user();

        Meteor.users.update({_id: user._id}, { $set: { "profile.activeStore": storeId } });
    }
});

/**
 * This should get a different place
 */
Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};