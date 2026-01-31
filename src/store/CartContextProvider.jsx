import React, { createContext, useReducer, useEffect } from 'react'
import { addItemToCart, removeItemFromCart, clearCart } from '../apis/apiCall';
import axiosInstance from '../apis/axiosInstance';

export const CartContext = createContext({
    items: [],
    setCartItems: ()=>{},
    addItem: () => { },
    removeItem: () => { },
    clearCart: () => { },
    getTotalAmount: () => { },
    getItemCount: () => { }
})
function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { items: action.items };

    default:
      return state;
  }
}


const CartContextProvider = ({ children }) => {

   const [cartState, cartDispatcher] = useReducer(cartReducer, {
        items: []
    });
    useEffect(() => {
        const getCartItems = async()=>{
            try{
                const response = await axiosInstance.get("/cart");
              
                cartDispatcher({ type: 'SET_CART', items: response.data.items });
            }catch(error){
                console.error("Error fetching cart items: ", error);
            }
        }
        getCartItems();
    }, []);


    const setCartItems = (items)=>{
        cartDispatcher({ type: 'SET_CART', items: items });
    }

    const addItem = async (item) => {
        try {
             const updatedItems = await addItemToCart(item);
        cartDispatcher({ type: 'SET_CART', items: updatedItems });
            
        } catch (error) {
             console.error("Error fetching cart items: ", error);
        }
       
    }

    const removeItem = async (productId) => {
        try {
            const updatedItems = await removeItemFromCart(productId);
        cartDispatcher({ type: 'SET_CART', items: updatedItems });
        } catch (error) {
             console.error("Error fetching cart items: ", error);
        }
        
    }

    const clearCartItems = async () => {
        try {
             const updatedItems = await clearCart();
        cartDispatcher({ type: 'SET_CART', items: updatedItems });
            
        } catch (error) {
             console.error("Error fetching cart items: ", error);
        }
       
    }

    const getTotalAmount = () =>
    cartState.items.reduce((sum, item) => sum + item.subtotal, 0);

  const getItemCount = () =>
    cartState.items.reduce((count, item) => count + item.quantity, 0);


    const cartCtxValue = {
        items: cartState.items,
        setCartItems,
        addItem,
        removeItem,
        clearCart : clearCartItems,
        getTotalAmount,
        getItemCount
    }

    return (
        <CartContext.Provider value={cartCtxValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
