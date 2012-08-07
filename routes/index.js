
/*
 * GET home page.
 */

exports.index = function (req, res) {
	var guests = require('../guests.json'),
		email = req.query.e || '',
		templateVars = {
			title: 'Wedding'
		};

	// Data model
	if (guests[email]) {
		templateVars.guest = guests[email];
	}
	res.render('index', templateVars);
};