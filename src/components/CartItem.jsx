import React, {useContext} from 'react'
import { CartContext } from '../store/CartContextProvider';

const CartItem = ({item, image, name, price, quantity}) => {
  const {addItem, removeItem} = useContext(CartContext);

  function handleAddItem(){
    addItem(item.product);
  }

  function handleRemoveItem(){
    removeItem(item.product._id);
  }
  return (
    <div className='grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center border-b-2 py-4'>
       <div className='flex gap-4 items-center justify-center '>
        <img className='w-12 h-12 object-cover' src={image} alt={name} />
        <p className='font-medium'>{name}</p>
       </div>
       <div className='text-center'>{price}</div>
        <div className='text-center flex items-center justify-center gap-3'>
          <button onClick={handleAddItem} className='w-8 h-8 flex items-center justify-center 
               border border-gray-400 rounded 
               hover:bg-gray-100 text-lg font-semibold cursor-pointer'>+</button>

          {quantity}
          <button onClick={handleRemoveItem} className='w-8 h-8 flex items-center justify-center 
               border border-gray-400 rounded 
               hover:bg-gray-100 text-lg font-semibold cursor-pointer'>-</button>
          </div>  
        <div className='text-center'>₹ {price * quantity}</div>
    </div>
  )
}

export default CartItem
