var Guest = function () {
	var properties = {
		id: null,
		firstname: '',
		lastname: '',
		email: '',
		fb: '',
		twitter: '',
		rsvp: false
	},
		methods = {
		/**
		 * Uppercase first letter of a string
		 * @param  {String} string
		 * @return {String}
		 */
		uppercase: function (string) {
			return string.replace(/^([a-z])/, function ($1) { return $1.toUpperCase(); });
		}
	};

	return {
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
		},

		/**
		 * Magic getter, will execute get{Property} function if exists. Otherwise returns
		 * property.
		 *
		 * @param  {String} property Property to get
		 * @return {Mixed}
		 */
		get: function (property) {
			var ucProperty = methods.uppercase(property);

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
			var ucProperty = methods.uppercase(property);

			if (this['set' + ucProperty]) {
				return this['set' + ucProperty](value);
			} else if (property in properties) {
				return properties[property] = value;
			}

			return false;
		}
	};
};

module.exports = Guest;