
/*
 * GET home page.
 */

exports.index = function (req, res) {
	var guests = require('../guests.json'),
		email = req.query.e || '',
		templateVars = {
			title: 'Wedding'
		};

	var guestModel = require('../models/Guest');
	var guest = guestModel();
	guest.set('email', 'richmiddleditch@gmail.com');

	guest.save();

	var guest2 = guestModel();
	guest2.load('richmiddleditch@gmail.com');
	var email2 = guest2.get('email');

	// Data model
	if (guests[email]) {
		templateVars.guest = guests[email];
	}
	res.render('index', templateVars);
};