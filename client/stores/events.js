Template.stores.events({
    "click #openModal": function(event){
        event.preventDefault()
        $('#addStore').openModal();
    },
    "click .collection-item": function(event){
        event.preventDefault();
        FlowRouter.go('/store/' + this._id);
    },
    "click .editStore": function(event){
        event.preventDefault();
        event.stopPropagation(); // Prevent going to the store
    },
    "click #activate": function(event){
        event.preventDefault();
        event.stopPropagation(); // Prevent going to the store

        Meteor.call('activateStore', this._id);
        Materialize.toast('Store activated!', 4000);
    },
    "click .storesActivate": function(event){
        event.preventDefault();
        event.stopPropagation(); // Prevent going to the store

        Meteor.call('activateStore', this._id);
        Materialize.toast('Store activated!', 4000);
    },
    "click .storesEdit": function(event){
        event.preventDefault();
        event.stopPropagation(); // Prevent going to the store

        Session.set('stores.doc', this);

        $('#updateStore').openModal();
    },
    "click .storesRemove": function(event){
        event.preventDefault();
        event.stopPropagation(); // Prevent going to the store

        //Meteor.call('activateStore', this._id);
    }
});

Template.stores.onCreated(function() {
    var self = this;

    // Subscriptions
    self.autorun(function(){
        var user = Meteor.user();
        return self.subscribe('stores', user);
    });

    // Enable dropdown
    setTimeout(function(){
        $('.editStore').dropdown({
            constrainwidth: false,
            beloworigin: true,
            alignment: "right",
            closeOnClick: true
        });
    }, 1000);
});