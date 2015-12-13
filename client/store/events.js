Template.store.events({
    "click .fixed-action-btn li": function(event){
        event.preventDefault();
        event.stopPropagation();

        if(event.target.id == "uploadUsers"){
            $('#uploadUsersModal').openModal();
        }
    },
    "click .submit-user-csv": function(event){
        event.preventDefault();
        event.stopPropagation();

        input = document.getElementById('userCsv');

        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");               
        }
        else {
            file = input.files[0];
        }

        Papa.parse(file, {
            complete: function(results){
                console.log(results);
            }
        });

    }
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