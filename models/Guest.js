var Guest = function () {
	if (!this instanceof Guest) {
		return new Guest();
	}

	/**
	 * Private properties
	 * @type {Object}
	 */
	var Base = require('Base')(),
		Database = require('Database')(),
		properties = {
			firstname: '',
			lastname: '',
			email: '',
			fb: '',
			twitter: '',
			rsvp: false
		},
	/**
	 * Private methods
	 * @type {Object}
	 */
		methods = {};

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
		 * Validates email address and assigns it to the guest
		 * @param {String} email
		 */
		setEmail: function (email) {
			if (/^[\w!#$%&'*+\-\/=?\^_`{|}~.]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/i.test(email)) {
				return properties.email = email;
			}

			return false;
		},

		/**
		 * Ensures @ symbol is present in twitter handle and assigns it to the guest
		 * @param {String} handle
		 */
		setTwitter: function (handle) {
			if (handle[0] !== '@') {
				handle = '@' + handle;
			}

			return properties.twitter = handle;
		},

		/**
		 * Cast state to a boolean
		 * @param {Boolean} state Will be cast to a boolean
		 */
		setRsvp: function (state) {
			return properties.rsvp = !!state;
		}
	});
};

module.exports = Guest;