import Items from "./Items";

const Latestfits = ()=>{
    return (
       <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold uppercase tracking-widest">Latest Fits</h2>
                <div className="h-1 w-20 bg-black mx-auto mt-2"></div> 
                <p className="text-gray-500 mt-4">Handpicked styles just for you.</p>
            </div>
            <Items />
        </div>
    )
}

export default Latestfits;