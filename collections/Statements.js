Statements = new Mongo.Collection("statements");

// Before insert, get rid of all dots in keys
Statements.before.insert(function (userId, doc) {
    var statement = dotsToUnicode(doc);

    doc = statement;

});

/**
 * Necessary functions, needs different placement.
 */

function dotsToUnicode(statement) {
    // Retrieve paths to replace 
    var pathsToReplace = dotKeys(statement.context);

    // Loop through paths to replace
    // Key = path
    // Value = path to the path
    for(var key in pathsToReplace){
        // Replace all dots for unicode
        var newKey = key.replace(/\./g, '\\u002e');

        // Retrieve path to it
        var oldPath = pathsToReplace[key];

        // save new path name
        statement.context[oldPath][newKey] = statement.context[oldPath][key];

        // Delete old path name
        delete statement.context[oldPath][key];
    }

    // Return true
    return statement; // always for now
}

function dotKeys(object){
    path = '';
    paths = [];

    _.each(object, findDots);

    return paths;
}

function findDots(value, key) {
    var savepath = path;

    path = path ? (path + "." + key) : key;

    // ...do what you like with `key` and `value`
    if(typeof key === "string" && key.indexOf('.') !== -1){
        paths[key] = savepath;
    }
 
    if (typeof value === "object") {
        // Recurse into children
        _.each(value, findDots);
    }

    path = savepath;
}