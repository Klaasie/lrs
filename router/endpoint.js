Router.map(function() {
    this.route('xAPI', {
        path: '/xAPI',
        where: 'server',
        action: function() {
            // set vars
            var response, data, user, statement;

            // Initialize response object
            response = {};
            response.statusCode = 200;
            response.success = false;
            response.message = "";

            // Initialize data object
            data = {};

            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;

            // Check if authorization is present
            if(typeof this.request.headers.authorization == "undefined"){
                response.message = "No authorization provided";

                this.response.writeHead(403, {'Content-Type': 'application/json'});
                this.response.end(JSON.stringify(response));
                return false;
            }

            // Split auth
            var type = this.request.headers.authorization.split(' ')[0]
            var base64Auth = this.request.headers.authorization.split(' ')[1]

            // Check what type of authentication we're going to look for
            if(type == "Basic"){
                // Since we have no way to use this to actually authenticate the person
                // We have to use a secret key
                var secret = Secrets.findOne({secret: base64Auth});

                if(typeof secret == "undefined"){
                    // User does not exist
                    response.message = "Login failed";
                    
                    this.response.writeHead(401, {'Content-Type': 'application/json'});
                    this.response.end(JSON.stringify(response));
                    return false;
                }

                user = Meteor.users.findOne(secret.userid);
                
            }else{
                // Provide with error since we only support one so far.
                response.message = "Authorization of type " + type + " is not supported";

                this.response.writeHead(200, {'Content-Type': 'application/json'});
                this.response.end(JSON.stringify(response));
                return false;
            }
            
            if(requestMethod == "POST"){
                statement = this.request.body;

                data.user = user;
                data.statement = statement;
                data.response = response;

                Meteor.call('saveStatement', data, function(error, result){
                    response = result;
                });
            }

            // Write response
            this.response.writeHead(response.statusCode, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify(response));
            
        },
        waitOn: function(){
            return Meteor.subscribe('stores');
        }
    });
});