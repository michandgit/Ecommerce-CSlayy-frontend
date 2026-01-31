import { useNavigate } from "react-router-dom";

const Item = ({itemId, image, title,price }) => {
  const navigate = useNavigate();
  return (
    <div onClick = {()=>navigate(`/product/${itemId}`)} className="group cursor-pointer">
      <div className="overflow-hidden bg-gray-200 rounded-sm aspect-[3/4]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-tight">{title}</h3>
        <h3  className="text-sm font-medium text-gray-700 uppercase tracking-tight">₹{price}</h3>
      </div>
    </div>
  )
}

export default Item;
