import { FaStar } from "react-icons/fa"; 
import { useState } from "react";
import SPLienQuan from "../components/SanPhamLienQuan.jsx";
import { FaComment } from "react-icons/fa"; 
export default function DanhGia({sanPhamHienTai}){
    const sao = [1, 2, 3, 4, 5];
    const danhgia= [
        {sao: 5, tile: 95, sodg: 31},
        {sao: 4, tile: 20, sodg: 2},
        {sao: 3, tile: 10, sodg: 1},
        {sao: 2, tile: 0, sodg: 0},
        {sao: 1, tile: 0, sodg: 0},
    ];
    const nguoidanhgia = [
        {mau: "bg-green-600", name: "Nguyễn Nam", bd: "N",  cmt: "Sản phẩm chất lượng tốt"},
        {mau: "bg-red-600", name: "Tran Quang", bd: "T", cmt: "đã mua hàng, chất lượng tốt"},
        {mau: "bg-blue-600", name: "Anh Bảo", bd: "A", cmt: "góp nhanh , dv ổn"},
        {mau: "bg-green-600", name: "Lê Quốc Huy", bd: "L", cmt: "nhân viên nhiệt tình. hỗ trợ tốt"},
    ]
    
    return(
        <div className="p-3 bg-gray-100 rounded-xl flex flex-col gap-5">
            <h1 className="font-medium text-2xl">Đánh giá {sanPhamHienTai.label}</h1>
            {/**khung dánh giá */}
            <div className="bg-white rounded-xl p-10 flex gap-5">
                <div className="flex flex-col gap-2  items-center border-r border-gray-300 justify-center w-full lg:w-[220px] shrink-0 p-5">
                    <h2 className="font-bold text-6xl flex items-center">4.9<span className="text-gray-500 font-semibold text-5xl">/5</span></h2>
                    <div className="flex gap-3 items-center">
                        {sao.map((i, index) => (
                            <FaStar className="text-yellow-400"/>
                        ))}
                    </div>
                    <p className="text-lg"> 33 lượt đánh giá</p>
                    <button className="bg-[#d7000e] h-auto p-3 rounded-lg w-full hover:bg-red-400">
                        <span className="text-white font-medium text-lg">Viết đánh giá</span>
                    </button>
                </div>
                <div className="w-full flex flex-col justify-between ml-3 border-r pr-6 border-gray-300 ml-5">
                    {danhgia.map((item, index) => {
                        const phantram = item.tile;
                        return(
                        <div key={index} className="flex items-center gap-1">
                            <div className="flex items-center gap-1 w-8 shrink-0">
                                <p className="text-lg font-medium">{item.sao}</p>
                                <FaStar className="text-yellow-400"/>
                            </div>
                            
                            <div className="border rounded-lg flex-1 overflow-hidden h-3">
                                <div className="h-full bg-red-600 rounded-full "
                                style ={{width: `${phantram}%`}}></div>
                            </div>
                            <p className="text-gray-400 font-medium text-lg">{item.tile}%</p>
                        </div>
                    )})}
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mt-6"> 
                <h2 className="text-2xl font-medium mb-2">Tất cả đánh giá</h2>
                <div className="flex flex-col">
        {nguoidanhgia.map((item, index) => (
            <div 
                key={index} 
                // Thêm đường kẻ dưới mỗi comment, last:border-0 để comment cuối cùng không bị kẻ
                className="flex items-start justify-between py-5 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0"
            >
   
                <div className="flex items-start gap-4">

                    <div className={`w-11 h-11 shrink-0 ${item.mau} rounded-full flex justify-center items-center shadow-sm`}>
                        <p className="text-lg font-bold text-white uppercase">{item.bd}</p>
                    </div>
                    
                
                    <div className="flex flex-col gap-1.5 mt-0.5">
                        <h3 className="text-[16px] font-semibold text-gray-900">{item.name}</h3>
                        
                        <div className="text-gray-600 text-[15px] flex items-start gap-2 leading-relaxed pr-4">
                          
                            <FaComment className="mt-1 text-gray-400 shrink-0"/>
                            <span>{item.cmt}</span>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 ml-2">
                    <button className="py-1.5 px-4 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg font-medium text-sm transition-colors border border-yellow-200 shadow-sm">
                        Phản hồi
                    </button>
                </div>
            </div>
        ))}
    </div>
            </div>
        </div>
    )
}