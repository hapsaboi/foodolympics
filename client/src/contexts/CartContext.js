import React, { useState, createContext, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartContextProvider(props) {
    const [notificationStatus, setNotificationStatus] = useState(false)
    const [notificationDetails, setNotificationDetails] = useState({msg:"",type:""});

	const [cart, setCart] = useState([]);

	function addToCart (cartObject) {
        var variationArray =[];
        if(cartObject.variation){
            variationArray = cartObject.variation.split(" - ");
        }
                
        let cartItem = {
            product_id:cartObject._id || cartObject.product_id,
            product_name:cartObject.product_name,
            quantity:cartObject.quantity || 1,
            variation:variationArray[0] || cartObject.product_name,
            price: cartObject.price || variationArray[1].replace("₦", "")
        };
       
        const found = (cart.findIndex(x => x.product_id===cartItem.product_id));
        
        //checking if item already exist in cart
        if(found>-1){
            let newCart = [...cart]; 
            newCart[found].quantity = cartItem.quantity;
            newCart[found].price = cartItem.price;
            setCart(newCart);
            setNotificationDetails({msg:"Product Quantity Updated", type:"success"});
            setNotificationStatus(true);

        }else{
            setCart([...cart,cartItem]);
            setNotificationDetails({msg:"Product Added to Cart Successfully", type:"success"});
            setNotificationStatus(true);
        }
    }

	const handleRemoveItem = (id) => {
		setCart(cart.filter(item =>  !(id === item.product_id)));
        setNotificationDetails({msg:"Product Removed Successfully", type:"success"});
        setNotificationStatus(true);
	};

	return <CartContext.Provider value={{ cart, setCart, handleRemoveItem,addToCart,notificationStatus,notificationDetails,setNotificationStatus,setNotificationDetails}}>{props.children}</CartContext.Provider>;
}

export default CartContextProvider;
