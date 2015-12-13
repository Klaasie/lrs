Template.dashboard.helpers({
    stores: function(){
        return Stores.find({}, { sort: { createdAt: 1 } });
    }
});