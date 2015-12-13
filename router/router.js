/**
 * Router for index page
 */
FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("index");
    }
});

/**
 * Router for login page
 */
FlowRouter.route('/login', {
    action: function() {
        BlazeLayout.render("login");
    }
});

/**
 * Router for dashboard page
 */
FlowRouter.route('/dashboard', {
    action: function() {
        BlazeLayout.render("application", {content: "dashboard"});
    }
});

/**
 * Router for stores page
 */
FlowRouter.route('/stores', {
    action: function() {
        BlazeLayout.render("application", {content: "stores"});
    }
});

/**
 * Router for store/:id page
 */
FlowRouter.route('/store/:storeId', {
    action: function() {
        BlazeLayout.render("application", {content: "store"});
    }
});

/**
 * Router for 404 page
 */
FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render("application", {content: "notFound"});
    }
};