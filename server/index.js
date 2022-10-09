const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:3000", "https://zinger-wallet.netlify.app"],
		credentials: true
	})
);

//db connection
const connection = require('./db');
const Ticket = require('./models/Ticket');
//Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/ticket', require('./routes/api/ticket'));
app.use('/api/auth', require('./routes/api/auth'));


const PORT = process.env.PORT || process.env.LocalPort;

const server = app.listen(PORT, () => console.log(`Server started at port ${PORT}`));


process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});
io.on("connection", (socket) => {
	console.log("connected: " + socket.id)
	socket.emit("connection", "messup");

	app.use('/api/ticket1/update_ticket', async (req, res) => {
		socket.emit("msg", "success");
		const { ticket_ref, status, reference, amount } = req.body;
		console.log(req.body)
		if (!ticket_ref || !status || !reference || !amount) {
			return res.status(400).send({ msg: 'some fields not present', status: false });
		}
		else {

			try {
				let found = await Ticket.findOne({ ticket_ref });

				//if ticket found
				if (!found) return res.status(400).send({ status: false, msg: 'Error finding ticket' });
				else {
					found.status = status;
					found.payment_details = { ...found.payment_details, reference, paid_amount: amount };
					found.save();
				}

				socket.to(found.socket_id).emit("msg", "success");
				return res
					.status(200)
					.send({ status: true, msg: "Payment received successfully" });

			} catch (err) {
				console.log(err);
				res.status(500).json({ msg: err, status: false });
			}
		}


	});
});
