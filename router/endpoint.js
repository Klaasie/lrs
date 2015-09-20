Router.map(function() {
    this.route('endpoint', {
        path: '/endpoint/statement',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var requestData = this.request.body;
            // Could be, e.g. application/xml, etc.
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end('<html><body>Your request was a ' + requestMethod + '</body></html>');
        }
    });
});