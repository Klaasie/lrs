Template.sidemenu.helpers({
    userId: function(){
        return Meteor.userId();
    },
    fullname: function(){
        if(Meteor.user()){
            return Meteor.user().fullName();
        }
    }
})