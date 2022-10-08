export const BackEnd = process.env.REACT_APP_BackEndHostLocal;
export const forms = {
	addForm: `${BackEnd}/api/form/add_form`,
	//---------------------------------------------------------------------------------------------------

	showForms: `${BackEnd}/api/form/show_form`,
	//---------------------------------------------------------------------------------------------------

};
export const menu = {
	//take in a body with data
	//data :  
	addMenu: `${BackEnd}/api/menu/add_menu`,
	//---------------------------------------------------------------------------------------------------

	showMenus: `${BackEnd}/api/menu/show_menus`,
	//---------------------------------------------------------------------------------------------------

	editMenu: `${BackEnd}/api/menu/edit_menu`,
	//---------------------------------------------------------------------------------------------------	
};

export const record = {
	addRecord: `${BackEnd}/api/record/add_record`,
	//---------------------------------------------------------------------------------------------------

	showRecord: `${BackEnd}/api/record/show_record`,
	showRecords: `${BackEnd}/api/record/show_records`,
	//---------------------------------------------------------------------------------------------------

};

export const logo = {
	addLogo: `${BackEnd}/api/file/add_logo`,
	//---------------------------------------------------------------------------------------------------

};

export const ngo = {
	//data : 
	// {
	// 	"store":"Hanis Store"
	// }
	editProfile: `${BackEnd}/api/ngo/edit_ngo`,

	showNgos: `${BackEnd}/api/ngo/show_ngos`,
	showSearch: `${BackEnd}/api/ngo/show_search`
};

export const categories = ["WOMEN EMPOWERMENT", "CHILD AND YOUTH EMPOWERMENT", "EDUCATION", "WELFARE", "FOOD AND HYGIENE", "HEATLH", "RECYCLING", "GENERIC(UNSPECIFIED)"];
export const menu_category = ["Main", "Side", "Dessert", "Drinks"];

// export const states = [
// 	"Abia",
// 	"Adamawa",
// 	"Akwa Ibom",
// 	"Anambra",
// 	"Bauchi",
// 	"Bayelsa",
// 	"Benue",
// 	"Borno",
// 	"Cross River",
// 	"Delta",
// 	"Ebonyi",
// 	"Edo",
// 	"Ekiti",
// 	"Enugu",
// 	"FCT - Abuja",
// 	"Gombe",
// 	"Imo",
// 	"Jigawa",
// 	"Kaduna",
// 	"Kano",
// 	"Katsina",
// 	"Kebbi",
// 	"Kogi",
// 	"Kwara",
// 	"Lagos",
// 	"Nasarawa",
// 	"Niger",
// 	"Ogun",
// 	"Ondo",
// 	"Osun",
// 	"Oyo",
// 	"Plateau",
// 	"Rivers",
// 	"Sokoto",
// 	"Taraba",
// 	"Yobe",
// 	"Zamfara"
// ];





export const order = {
	//take in a body with data
	//data :  
	addOrder: `${BackEnd}/api/order/add_order`,
	//---------------------------------------------------------------------------------------------------

	showOrders: `${BackEnd}/api/order/show_orders`,
	//---------------------------------------------------------------------------------------------------

	showAllOrders: `${BackEnd}/api/order/show_all_orders`,
	//---------------------------------------------------------------------------------------------------

};


export const user = {
	editProfile: `${BackEnd}/api/user/edit_profile`,
	showAllUsers: `${BackEnd}/api/user/show_all_users`
};
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
