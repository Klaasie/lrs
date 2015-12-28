Template.topmenu.events({
    "click .view-ui": function(){
        $('.ui.sidebar').sidebar('toggle');
    },
    "click #uploadUsersModal": function() {
        $('#uploadUsers.ui.modal').modal({
            onApprove : function() {
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
                
                return true;
            }
        }).modal('show');     
    }
});

Template.topmenu.onRendered(function(){
    setTimeout(function() {
        $('.ui.dropdown').dropdown();
    }, 1000);
});