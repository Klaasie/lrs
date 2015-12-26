Template.store.events({
});


Template.store.onCreated(function() {
    var self = this;

    self.autorun(function(){
        var storeId = FlowRouter.getParam('storeId');
        self.subscribe('store', storeId); 
        self.subscribe('users');
        self.subscribe('statements', storeId);
    });
});