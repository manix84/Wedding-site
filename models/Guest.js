var Guest = function () {
	var properties = {
		id: null,
		firstname: '',
		lastname: '',
		email: ''
	},
		methods = {
		uppercase: function (string) {
			return string.replace(/^([a-z])/, function ($1) { return $1.toUpperCase(); });
		}
	};

	return {
		setEmail: function (email) {
			if (/^[\w!#$%&'*+\-\/=?\^_`{|}~.]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/i.test(email)) {
				return properties.email = email;
			}

			return false;
		},

		get: function (property) {
			var ucProperty = methods.uppercase(property);
			if (this['get' + ucProperty]) {
				return this['get' + ucProperty]();
			} else if (property in properties) {
				return properties[property];
			}
			return null;
		},

		set: function (property, value) {
			var ucProperty = methods.uppercase(property);
			if (this['set' + ucProperty]) {
				return this['set' + ucProperty](value);
			} else if (property in properties) {
				return properties[property] = value;
			}
			return null;
		}
	};
};

module.exports = Guest;