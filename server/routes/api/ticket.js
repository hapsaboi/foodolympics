const express = require('express');
const router = express.Router();
const Ticket = require('../../models/Ticket');
const axios = require('axios');
// const AES = require("crypto-js/aes");
const { auth } = require("../../middleware/auth")

router.post('/create_ticket/:socket_id', async (req, res) => {
	let { socket_id } = req.params;
	const { ticket, user, quantity } = req.body;
	delete ticket.status;
	let data = { ...user, quantity, ...ticket, socket_id }
	if (!data.email || !data.quantity || !data.price || !data.type) {
		return res.status(500).json({ msg: "Please ensure email and phone number are valid.", status: false });
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


	try {

		newTicket = new Ticket(data);
		let headers = { 'Authorization': `Bearer ${process.env.SK_LIVE}` }
		console.log(headers)
		let data_sent = { ref_num: id, amount: data.total };
		await axios.post('https://zingerad.zingerwallet.com/api/v1/generate-payment-link/', data_sent,
			{ headers: headers })
			.then(function (response) {
				console.log(response)
				let res_data = response.data;
				if (res_data.response_code === "00") {
					newTicket.payment_details = { account_no: res_data.account_number, account_name: res_data.account_name, amount: res_data.amount, bank_name: "Providus Bank" }
					newTicket.save();
					return res
						.status(200)
						.send({ status: true, data: { ticket: newTicket, payment_details: newTicket.payment_details } });
				} else {
					return res.status(400).json({ msg: "Error generating payment details, please try again.", status: false });
				};
			}).catch(function (error) {
				console.log(error)
				// handle error
				return res.status(400).json({ msg: "Error generating payment details, please try again.", status: false });
			});


	} catch (err) {
		// console.log(err);
		return res.status(500).json({ msg: "Server Error, Plese Contact Support.", status: false });
	}


});

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
		if (tickets.status !== "success") { return res.status(200).send({ status: false, msg: 'Invalid, ticket status is: ' + tickets.status }) }
		return res.status(200).send({ status: true, data: tickets });

	} catch (err) {
		res.status(400).json({ msg: err, status: false });
	}

});
router.get('/show_tickets', async (req, res) => {
	try {
		let tickets = await Ticket.find();
		if (!tickets) { res.status(400).send({ status: false, error: 'Problem with the query or no ticket found' }) };
		res.status(200).send({ status: true, data: tickets });

	} catch (err) {
		res.status(400).json({ msg: err, status: false });
	}
});



module.exports = router;