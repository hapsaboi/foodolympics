export const BackEnd = process.env.REACT_APP_BackEndHost;
export const business = {
	name: "Dots Island & Godiyas Kitchen",
	date: "27th November, 2022",
	title: 'MEATILICIOUS',
	time: "12 Noon",
	venue: "Tobix Garden Ahamdu Bello way opp. Alibert furniture.",
}
export const authenticate = {
	//takes in token as http cookie
	//data : [verifyToken]
	verifyAcct: `${BackEnd}/api/user/verifyAccount/`,

	//takes in password + token as http cookie
	//data : [verifyToken]
	passwordReset: `${BackEnd}/api/user/passwordReset/`,

	//takes http cookie token and checks if a user is logged in
	//data : requires token to be set - user login
	loggedIn: `${BackEnd}/api/user/loggedIn`,

	//sends a reset link to specified user email
	//data : email
	forgotPassword: `${BackEnd}/api/user/forgotPassword`,

	//destroys cookie
	logout: `${BackEnd}/api/user/logout`,

	//destroys cookie
	addUser: `${BackEnd}/api/user/add_user`,

	//give logged in user data
	getUserData: `${BackEnd}/api/auth/user`,

	//---------
	userAuth: `${BackEnd}/api/auth`
};


export const ticket = {

	createTicket: `${BackEnd}/api/ticket/create_ticket`,
	//---------------------------------------------------------------------------------------------------	
	updateTicketStatus: `${BackEnd}/api/ticket/update_status`,
	//---------------------------------------------------------------------------------------------------	
	showTickets: `${BackEnd}/api/ticket/show_tickets`,
	//---------------------------------------------------------------------------------------------------	
	showUserTickets: `${BackEnd}/api/ticket/show_user_ticket`,
	//---------------------------------------------------------------------------------------------------	
	showStats: `${BackEnd}/api/ticket/show_stats`,
	//---------------------------------------------------------------------------------------------------	
	showValue: `${BackEnd}/api/ticket/show_value`,
	//---------------------------------------------------------------------------------------------------	
};
