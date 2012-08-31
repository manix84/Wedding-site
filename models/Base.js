var Base = function() {
    var Database = require('Database')();

    return {
        /**
         * Extend passed in object with the properties of this. Does not overwrite existing properties
         * @param  {Object} obj Object to extend
         * @return {Object}     Extended object
         */
        extend: function(obj) {
            var key;
            for (key in this) {
                if (this.hasOwnProperty(key) && !obj.hasOwnProperty(key)) {
                    obj[key] = this[key];
                }
            }
            obj.className(obj.constructor.toString());

            return obj;
        },

        /**
         * [className description]
         * @param  {[type]} c [description]
         * @return {[type]}   [description]
         */
        className: function (c) {
            this.className = c.substr(9, c.indexOf('(') -  9);
        },

        /**
         * Save an object into the database
         * @param  {Function} callback Function to call on save
         */
        _save: function (id, callback) {
            Database.getCollection(this.className, function (err, collection) {
                collection.update(id, {$set: properties}, {upsert: true}, function (err, result) {
                    Database.close();
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                });
            });
        },

        /**
         * Load an from the database
         * @param  {String}   id       Email address of the guest to load
         * @param  {Function} callback Function to execute after load
         */
        _load: function (id, callback) {
            Database.getCollection(this.className, function (err, collection) {
                collection.findOne(id, function (err, item) {
                    var key;
                    if (!err) {
                        for (key in item) {
                            if (properties.hasOwnProperty(key)) {
                                properties[key] = item[key];
                            }
                        }
                    }
                    Database.close();
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                });
            });
        },

        /**
         * Magic getter, will execute get{Property} function if exists. Otherwise returns
         * property.
         *
         * @param  {String} property Property to get
         * @return {Mixed}
         */
        get: function (property) {
            var ucProperty = this._uppercase(property);

            if (this['get' + ucProperty]) {
                return this['get' + ucProperty]();
            } else if (property in properties) {
                return properties[property];
            }

            return null;
        },

        /**
         * Magic setter, will execute set{Property} if exists.
         *
         * @param {String} property Property to set
         * @param {Mixed} value
         * @return {Boolean} true on successful set, false on failure
         */
        set: function (property, value) {
            var ucProperty = this._uppercase(property);

            if (this['set' + ucProperty]) {
                return this['set' + ucProperty](value);
            } else if (property in properties) {
                return properties[property] = value;
            }

            return false;
        },

        /**
         * Uppercase first letter of a string
         * @param  {String} string
         * @return {String}
         */
        _uppercase: function (string) {
            return (string && typeof string === "string") ? string[0].toUpperCase() + string.substr(1) : string;
        }
    };
};

module.exports = Base;