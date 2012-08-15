var Database = function() {
    var db = null,
        mongo = require('mongodb'),
        server = new mongo.Server('localhost', 27017, {auto_reconnect: true}),
        dbName = 'wedding';

    return {
        getDatabase: function () {
            db = new mongo.Db(dbName, server);

            return db;
        },

        /**
         * Get a db collection, creating it if it doesnt exist
         * @param  {Function} callback Callback method to run after getting collection
         */
        getCollection: function (callback) {
            db = db || getDatabase();

            db.open(function (err, openDb) {
                if (!err) {
                    openDb.createCollection('guests', function (err, collection) {
                        callback(err, collection);
                    });
                }
            });
        },

        close: function () {
            db.close();
        }
    };
};

module.exports = Database;