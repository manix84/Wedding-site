var Base = function() {
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
            return obj;
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