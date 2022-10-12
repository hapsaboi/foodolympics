const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { auth } = require('../../middleware/auth');

// User Model
const Users = require('../../models/User');

//@routes PUT api/user/editProfile
//@desc update user
//@response - status: true or false | error
router.patch('/edit_profile', auth, async (req, res) => {
	try {
		const user = await Users.findByIdAndUpdate(req.body._id, req.body);

		if (!user) { res.status(400).send({ status: false, error: 'Problem with the update query' }) };

		//add change to system
		res.status(200).send({ status: true, message: "Profile Updated" });

	} catch (err) {
		res.json({ msg: err });
	}
});

//@routes POST api/users/register
//@desc Register new user
//@access public
router.post('/add_user', async (req, res) => {
	const { password, email } = req.body;
	//Simple Validation
	if (!email || !password) {
		res.status(400).send({ msg: 'Please enter all fields' });
	} else {
		try {
			user = await Users.findOne({ email });

			//if user already exist
			if (user) return res.status(400).send({ msg: 'User Already Exist' });

			//creating new user
			const newUser = new Users({ email, password });

			//Create salt and hash
			const salt = await bcrypt.genSalt(10);

			newUser.password = await bcrypt.hash(req.body.password, salt);

			try {
				newUser.save();
				return res
					.status(200)
					.send({ msg: 'Account created successfuly!' });
			} catch (error) {
				console.log(error)
				return res.status(500).send({ msg: 'Account Not Created!' });
			}
		} catch (err) {
			console.log(err)
			res.status(500).json({ msg: err });
		}
	}


});

router.get('/show_all_users', auth, async (req, res) => {
	let u;

	u = await Users.find().select('-password');

	try {
		if (!u) { res.status(400).send({ status: false, error: 'Problem with the query' }) };
		res.status(200).send({ status: true, data: u });

	} catch (err) {
		res.status(400).json({ msg: err });
	}
});


//@routes GET api/user/loggedIn
//@desc Check if a user is loggedIn
router.get('/loggedIn', async (req, res) => {
	try {
		const token = req.headers.authorization;
		//check for token
		if (!token) {
			res.status(200).send(false);
		} else {
			jwt.verify(token, process.env.jwtSecret, function (err) {
				if (err) { res.status(200).send({ status: false }); }
				else { res.status(200).send(true) };
			})

		}
		//verify token

	} catch (e) {
		res.status(501).send(e);
	}
});


//@routes GET api/users/logout
//@desc Logout a user
router.get('/logout', async (req, res) => {
	res
		.cookie('token', '',
			{
				httpOnly: true,
				expires: new Date(0)
			})
		.send();
});




module.exports = router;