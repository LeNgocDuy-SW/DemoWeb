import { FaSearch , FaShoppingCart, FaUser} from "react-icons/fa";
import {useState} from "react";
import { Link } from "react-router-dom";

export default function Navbar({cartCount =0}){
    const tabs =["Collections", "New Arrivals", "Sale"];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    return(
        
        <nav className="
        sticky top-0 z-50
        bg-blue-100 backdrop-blur-md shadow-sm
        flex justify-between items-center px-8 py-4">
            <Link to="/" className="text-2xl font-black">
                LUXE
            </Link>
            <div className="flex gap-6 font-semibold">
                {tabs.map((tab, index)=>(
                    <span key={index} onClick={()=> setActiveTab(tab)}
                    className = {`cursor-pointer pb-1 text-lg font-semibold transition-all duration-300
                        ${activeTab ===tab
                            ?"text-black-600 border-b-2 border-black-600"
                            : "text-gray-500 border-b-2 border-transparent hover:text-gray-900"
                        }`}>{tab}</span>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <input placeholder="Search..." className=" w-full h-1 bg-white rounded-sm p-4"/>
                <Link to="/cart" id ="cart-icon" className="relative hover:scale-110 trannsition cursor-pointer">
                    <span className="text-xl font-bold ">🛒</span>
                    {cartCount > 0 && (
                        <span className ="absolute -top-1 -right-2
                        bg-red-500 text-white text-[10px] font-bold
                        w-5 h-5 flex items-center justify-center rounded-full
                        shadow-sm animate-bounce">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <FaUser className="text-xl text-gray-500 hover:scale-110 trannsition cursor-pointer"></FaUser>
            </div>
            
        </nav>
    )
}