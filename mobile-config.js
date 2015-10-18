App.info({
  id: 'frl.klaas.lrs',
  name: 'lrs',
  description: 'Klaas Poortinga LRS',
  author: 'Klaas Poortinga',
  email: 'lrs@klaas.frl',
  website: 'http://klaas.frl'
});

// Set up external locations the app needs access to.
App.accessRule("*", {external: false});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
App.setPreference("orientation", "portrait");