export const BackEnd = process.env.REACT_APP_BackEndHost;
export const business = {
	name: "African Fashion & Arts Award",
	date: "19-20th November, 2022",
	title: 'African Fashion & Arts Vendors Festival',
	time: "10:00AM",
	venue: "Department of Art & Culture, Pavilion Centre Opposite Radio House, Central Area Abuja.",
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
