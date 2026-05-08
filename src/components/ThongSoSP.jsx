
export default function ThongSo({ specs }){
    const thongso = specs || [
        {label: "Tình trạng", vl:"Đang cập nhật..."}
    ];

    return(
        <div className="flex flex-col gap-4 mt-7">
            <h2 className="font-medium text-lg">Thông số kỹ thuật</h2>
            <div className="w-full border border-gray-300 overflow-hidden rounded-xl">
                {thongso.map((item, index) => (
                    <div key={index} className="flex">
                        <div className="w-1/3 w-[45%]">
                            <p className=" w-full h-full border border-gray-300 p-1 bg-gray-200 
                            text-[15px] flex items-center leading-snug">{item.label}</p>
                        </div>
                    <div className="flex-1 flex items-center">
                        <p className="w-full border border-gray-300 p-1 text-[14px]">{item.vl}</p>
                    </div>
                    
                </div>
                ))}
            </div>
        </div>
    )
}