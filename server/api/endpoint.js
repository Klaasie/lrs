var xApi = new Restivus({
    apiPath: "xAPI/",
    prettyJson: true
});

xApi.addRoute('statements', {}, {
    post: function() {
        // set vars
        var response, data, user, statement;

        // Set allowed headers
        this.response.setHeader( 'Access-Control-Allow-Origin', '*' );
        this.response.setHeader( 'Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, X-Experience-API-Version, Content-Type, Accept' );
        this.response.setHeader( 'Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS' );

        // Let preflight know we're all set
        if ( this.request.method === "OPTIONS" ) {
            this.response.end( 'Set OPTIONS.' );
        }

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

            //this.response.writeHead(403, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify(response));
            return this.done();
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
                return this.done();
            }

            user = Meteor.users.findOne(secret.userId);
            
        }else{
            // Provide with error since we only support one so far.
            response.message = "Authorization of type " + type + " is not supported";

            this.response.writeHead(200, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify(response));
            return this.done();
        }
        
        // Handling of POST method
        if(requestMethod == "POST" || requestMethod == "PUT"){
            // Create statement object
            statement = new Statement(this.request.body);

            // Validate the statement
            statement.validate();

            // If no pass, provide with error
            if(statement.getStatus() != "passed"){
                // Set response
                response.statusCode = 400;
                response.message = statement.getError();

                // Give response
                this.response.writeHead(response.statusCode, {'Content-Type': 'application/json'});
                this.response.end(JSON.stringify(response));

                return this.done();
            }

            // Create data object to make this easier
            data.user = user;
            data.statement = statement.getStatement();
            data.response = response;

            // All has been validated, save it!
            Meteor.call('saveStatement', data, function(error, result){
                response = result;
            });
        }

        if(this.request.method == "GET") {
            var StatementResult;

            /**
             * this is the authorization header, we probably want something done here..
             * @todo Check if authorization and mbox are equal. if not check rights to see other statements.
             */
            //console.log(this.request.headers.authorization);

            // Getting the agent from the query
            var agent = this.request.query.agent;

            // parsing to object
            agent = JSON.parse(agent);

            /**
             * Retrieving statements
             * @type {Object}
             * @todo Order based on stored
             * @todo Include full query rather than 1 little part
             */
            var statements = Statements.find({ "actor.mbox": agent.mbox }).fetch();
            
            // If more than one statement is 
            if(statements.length > 1){
                // StatementResult is an array
                StatementResult = [];

                // Loop through it and push to array
                _.each(statements, function(statement){
                    StatementResult.push(statement);
                });
            }else if(statements.length == 1){
                // Just one result
                StatementResult = statements;
            }else{
                // No results
                StatementResult = [];
            }

            // set response object
            response.statusCode = 200;
            response.statements = StatementResult;

            // Return response
            this.response.writeHead(response.statusCode, {'Content-Type': 'application/json'});
            this.response.end(JSON.stringify(response));

            return this.done();
        }

        // Write response
        this.response.writeHead(response.statusCode, {'Content-Type': 'application/json'});
        this.response.end(JSON.stringify(response));
        return this.done();
    }
});

xApi.addRoute('xAPI/activities/state', {}, {
    post: function() {

        // Set allowed headers
        this.response.setHeader( 'Access-Control-Allow-Origin', '*' );
        this.response.setHeader( 'Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, X-Experience-API-Version, Content-Type, Accept' );
        this.response.setHeader( 'Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS' );

        // Let preflight know we're all set
        if ( this.request.method === "OPTIONS" ) {
            this.response.end( 'Set OPTIONS.' );
        }

        if( this.request.method == "GET"){
            console.log(this.request.query);
        }
    }
});