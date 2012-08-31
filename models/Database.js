var Database = function() {
    var properties = {
            server: 'localhost',
            port: 27017,
            name: 'wedding',
            collections: {
                Guest: 'guests'
            }
        },
        db = null,
        mongo = require('mongodb'),
        server = new mongo.Server(properties.server, properties.port, {auto_reconnect: true});

    return {
        /**
         * Get a new database instance
         * @return {Object} A MongoDB instance
         */
        getDatabase: function () {
            var db = new mongo.Db(properties.name, server);

            return db;
        },

        /**
         * Get a db collection, creating it if it doesnt exist
         * @param  {Function} callback Callback method to run after getting collection
         */
        getCollection: function (collection, callback) {
            db = db || getDatabase();

            db.open(function (err, openDb) {
                if (!err) {
                    openDb.createCollection(properties.collections[collection], function (err, coll) {
                        callback(err, coll);
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