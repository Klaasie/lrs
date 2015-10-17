/**
 * Saving profile and secret key
 */
Accounts.onCreateUser(function (options, user) {
    // Attaching account to secret
    var secret = Secrets.findOne({
        userId: "empty"
    });

    // Save!
    Secrets.update(secret._id, {
        $set: {userId: user._id}
    })

    // Store profile into user profile
    if (options.profile)
        user.profile = options.profile;
    return user;
});

/**
 * Enabling Cors
 */
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});