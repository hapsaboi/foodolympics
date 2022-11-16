const express = require('express');
const router = express.Router();
const Ticket = require('../../models/Ticket');
// const AES = require("crypto-js/aes");
const { auth } = require("../../middleware/auth");
const axios = require("axios");

async function getAccount(headers, data_sent) {
	let res_data = await axios.post('https://zingerad.zingerwallet.com/api/v1/generate-payment-link/', data_sent,
		{ headers: headers })
		.then(async function (response) {
			// console.log(response);
			return response.data;
		}).catch(function (error) {
			console.log(error)
			// handle error
			return res.status(400).json({ msg: "Error generating payment details, please try again.", status: false });
		});
	console.log(res_data);
	return res_data;

}

router.post('/create_ticket/:socket_id', async (req, res) => {
	let { socket_id } = req.params;
	const { ticket, user, quantity } = req.body;
	delete ticket.status;
	let data = { ...user, quantity, ...ticket, socket_id }
	if (!data.email || !data.quantity || !data.price || !data.type) {
		return res.status(400).json({ msg: "Please ensure email is valid.", status: false });
	}
	const crypto = require("crypto");
	let id = "ZI" + (crypto.randomBytes(3).toString("hex")).toUpperCase();
	let status = false;
	counter = 0;
	while (!status) {
		if (counter <= 5) {
			found = await Ticket.findOne({ ticket_ref: id });
			if (found) {
				id = "ZI" + (crypto.randomBytes(3).toString("hex")).toUpperCase();
				counter++;
			} else {
				status = !status;
			}

		} else {
			return res.status(500).json({ msg: "Could not process request, please try again.", status: false });
		}
	}
	data.ticket_ref = id;
	data.total = data.price * data.quantity;
	// var bytes = AES.decrypt(data, process.env.aesEncryption);
	// var decrypted = bytes.toString(CryptoJS.enc.Utf8);
	console.log(id);
	newTicket = new Ticket(data);

	if (ticket.price == "Free") {

		newTicket.save();
		let email = {
			name: "Foodlympics by Foodexpo",
			ticket_ref: id,
			email: data.email
		};
		await axios.post('https://zingerad.zingerwallet.com/api/v1/send-ticket-email/', email);
		return res.status(200).send({ msg: "Ticket Created Successfully.", status: true, data: newTicket });

	} else {
		try {
			let count = 0;
			let headers = { 'Authorization': `Bearer ${process.env.SK_LIVE}` }
			let data_sent = { ref_num: id, amount: data.total };
			let res_data = await getAccount(headers, data_sent);;
			let result = false;

			if (res_data.account_number) {
				if (res_data.account_number.length == 10) {
					result = true;
				} else {
					result = false;
				}
			} else {
				result = false;
			}
			console.log(result, count);
			while (!result && count < 3) {
				console.log("why", res_data.account_number);
				res_data = await getAccount(headers, data_sent);
				if (res_data.account_number) {
					if (res_data.account_number == 10) {
						result = true;
					} else {
						result = false;
					}
				} else {
					result = false;
				}
				count++;
			}


			if (res_data.response_code === "00") {
				newTicket.payment_details = { account_no: res_data.account_number, account_name: res_data.account_name, amount: res_data.amount, bank_name: "Providus Bank" }
				newTicket.save();

				return res
					.status(200)
					.send({ status: true, data: { ticket: newTicket, payment_details: newTicket.payment_details } });
			} else {
				return res.status(400).json({ msg: "Error generating payment details, please try again.", status: false });
			};
		} catch (err) {
			// console.log(err);
			return res.status(500).json({ msg: "Server Error, Plese Contact Support.", status: false });
		}
	}


});

// router.post('/create_ticket', async (req, res) => {
// 	const { ticket, user, quantity } = req.body;
// 	try {
// 		delete ticket.status;
// 		let data = { ...user, quantity, ...ticket }
// 		if (ticket.price == "Free") {
// 			data.status = "success"
// 		} else {
// 			data.status = "created"
// 		}
// 		if (!data.email || !data.quantity || !data.type) {
// 			return res.status(400).json({ msg: "Please ensure email is valid.", status: false });
// 		}
// 		const crypto = require("crypto");
// 		let id = "ZI" + (crypto.randomBytes(3).toString("hex")).toUpperCase();
// 		let status = false;
// 		counter = 0;
// 		while (!status) {
// 			if (counter <= 5) {
// 				found = await Ticket.findOne({ ticket_ref: id });
// 				if (found) {
// 					id = "ZI" + (crypto.randomBytes(3).toString("hex")).toUpperCase();
// 					counter++;
// 				} else {
// 					status = !status;
// 				}

// 			} else {
// 				return res.status(500).json({ msg: "Could not process request, please try again.", status: false });
// 			}
// 		}
// 		data.ticket_ref = id;



// 		newTicket = new Ticket(data);
// 		newTicket.save();
// 		if (ticket.price == "Free") {
// 			let email = {
// 				name: "Foodlympics by Foodexpo",
// 				ticket_ref: id,
// 				email: data.email
// 			};

// 			await axios.post('https://zingerad.zingerwallet.com/api/v1/send-ticket-email/', email);
// 		}


// 		return res.status(200).send({ msg: "Ticket Created Successfully.", status: true, data: newTicket });



// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ msg: "Server Error, Plese Contact Support.", status: false });
// 	}


// });

router.patch('/update_status/:ticket_ref', [auth], async (req, res) => {
	const { ticket_ref } = req.params;
	const { status } = req.body;
	//Simple Validation
	if (!status) {
		res.status(400).send({ msg: 'Please enter all fields', status: false });
	} else {

		try {
			found = await Ticket.findOne({ ticket_ref });

			//if user already exist
			if (!found) return res.status(400).send({ status: false, msg: 'Error finding ticket' });
			else {
				found.status = status;
				found.save();
			}


			return res
				.status(200)
				.send({ status: true, msg: "Ticket updated successfully" });

		} catch (err) {
			console.log(err);
			res.status(500).json({ msg: "Server error, could not update ticket.", status: false });
		}
	}


});


//@routes GET api/order/
//@desc Get all 
//@response - status: true or false | data | error
router.get('/show_user_ticket/:id', async (req, res) => {
	let id = req.params.id;
	try {
		let tickets = await Ticket.findOne({ ticket_ref: id });
		if (!tickets) { return res.status(200).send({ status: false, msg: 'No ticket found' }) };
		if (tickets.status !== "success" && tickets.status !== "created") { return res.status(200).send({ status: false, msg: 'Invalid, ticket status is: ' + tickets.status }) }
		return res.status(200).send({ status: true, data: tickets });

	} catch (err) {
		res.status(400).json({ msg: err, status: false });
	}

});
router.get('/show_tickets', async (req, res) => {
	try {
		let tickets = await Ticket.find().limit(100);
		if (!tickets) { res.status(400).send({ status: false, error: 'Problem with the query or no ticket found' }) };
		res.status(200).send({ status: true, data: tickets });

	} catch (err) {
		res.status(400).json({ msg: err, status: false });
	}
});

router.get('/show_value', async (req, res) => {
	let units = await Ticket.aggregate([
		{ $match: { status: { $in: ["used", "success"] } } },
		{
			$group:
				{ _id: null, sum: { $sum: "$quantity" } }
		}]);
	res.status(200).send({ status: true, data: units });
});
router.get('/show_stats', async (req, res) => {
	try {
		let created = await Ticket.find({ status: "created" }).countDocuments();
		let success = await Ticket.find({ status: "success" }).countDocuments();
		let reversed = await Ticket.find({ status: "reversed" }).countDocuments();
		let used = await Ticket.find({ status: "used" }).countDocuments();
		let units = await Ticket.aggregate([
			{ $match: { status: { $in: ["used", "success"] } } },
			{
				$group:
					{ _id: null, sum: { $sum: "$quantity" } }
			}]);
		console.log({ created, success, reversed, units })
		res.status(200).send({ status: true, data: { created, success: success + used, reversed, units, used } });

	} catch (err) {
		console.log(err)
		res.status(400).json({ msg: err, status: false });
	}
});



module.exports = router;	