var Accommodation = function () {
    if (!this instanceof Accommodation) {
        return new Accommodation();
    }

    /**
     * Private properties
     * @type {Object}
     */
    var Base = require('Base')(),
        properties = {
            name: '',
            address: '',
            email: '',
            tel: '',
            url: '',
            info: ''
        };

    return Base.extend({
        /**
         * Save an object into the database
         * @param  {Function} callback Function to call on save
         */
        save: function (callback) {
            this._save({email: properties.email}, callback);
        },

        /**
         * Load an from the database
         * @param  {String}   id       Email address of the guest to load
         * @param  {Function} callback Function to execute after load
         */
        load: function (id, callback) {
            this._load({email: id}, callback);
        },

        /**
         * Validates email address and assigns it
         * @param {String} email
         */
        setEmail: function (email) {
            if (/^[\w!#$%&'*+\-\/=?\^_`{|}~.]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/i.test(email)) {
                return properties.email = email;
            }

            return false;
        },

        /**
         * Validates URL and assigns it
         * @param {String} url
         */
        setURL: function (url) {
            if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)) {
                return properties.url = url;
            }

            return false;
        }
    });
};

module.exports = Accommodation;