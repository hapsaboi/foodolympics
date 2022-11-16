const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
	{
		email: { type: String, required: true },
		name: { type: String },

		quantity: {
			type: Number, required: true
		},
		price: {
			type: String, required: true
		},
		type: { type: String, required: true },
		date_booked: {
			type: Date,
			default: new Date()
		},
		date_used: {
			type: Date,
		},
		ticket_ref: {
			type: String, required: true
		},
		payment_detail: {
			type: {}
		},
		socket_id: {
			type: String, required: true
		},
		status: { type: String, default: "created" },
	}
);


module.exports = mongoose.model('Tickets', TicketSchema);
