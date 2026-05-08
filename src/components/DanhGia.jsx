import { FaStar, FaComment, FaTimes } from "react-icons/fa"; 
import { useState } from "react";
import toast from "react-hot-toast";

export default function DanhGia({sanPhamHienTai}){
    const sao = [1, 2, 3, 4, 5];
    const [nguoidanhgia, setNguoidanhgia] = useState([
        {mau: "bg-green-600", name: "Nguyễn Nam", bd: "N",  cmt: "Sản phẩm chất lượng tốt", sao: 5, replies: []},
        {mau: "bg-red-600", name: "Tran Quang", bd: "T", cmt: "đã mua hàng, chất lượng tốt", sao: 4, replies: []},
        {mau: "bg-blue-600", name: "Anh Bảo", bd: "A", cmt: "góp nhanh , dv ổn", sao: 5, replies: []},
        {mau: "bg-green-600", name: "Lê Quốc Huy", bd: "L", cmt: "nhân viên nhiệt tình. hỗ trợ tốt", sao: 5, replies: []},
    ]);

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");
    
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");

    const handleReplySubmit = (index) => {
        if(!replyText.trim()) return;
        
        const newReviews = [...nguoidanhgia];
        if (!newReviews[index].replies) {
            newReviews[index].replies = [];
        }
        
        newReviews[index].replies.push({
            name: "Bạn (Quản trị viên)",
            text: replyText
        });
        
        setNguoidanhgia(newReviews);
        setReplyingTo(null);
        setReplyText("");
        toast.success("Đã phản hồi đánh giá!");
    };

    // --- Tính toán Đánh giá động ---
    const totalReviews = nguoidanhgia.length;
    const averageRating = totalReviews === 0 ? 0 : (nguoidanhgia.reduce((acc, curr) => acc + curr.sao, 0) / totalReviews).toFixed(1);
    
    // Tạo mảng tỷ lệ sao (5->1)
    const danhgiaStats = [5, 4, 3, 2, 1].map(starCount => {
        const count = nguoidanhgia.filter(review => review.sao === starCount).length;
        const tile = totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);
        return { sao: starCount, tile, sodg: count };
    });

    const handleSubmitReview = () => {
        if(!newComment.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá!");
            return;
        }
        
        const newReview = {
            mau: "bg-blue-500",
            name: "Bạn (Vừa đăng)",
            bd: "B",
            cmt: newComment,
            sao: newRating
        };
        
        setNguoidanhgia([newReview, ...nguoidanhgia]);
        setShowReviewForm(false);
        setNewComment("");
        setNewRating(5);
        toast.success("Đã gửi đánh giá thành công!");
    };
    
    return(
        <div className="p-3 bg-gray-100 rounded-xl flex flex-col gap-5">
            <h1 className="font-medium text-2xl">Đánh giá {sanPhamHienTai.label}</h1>
            {/**khung dánh giá */}
            <div className="bg-white rounded-xl p-10 flex gap-5">
                <div className="flex flex-col gap-2  items-center border-r border-gray-300 justify-center w-full lg:w-[220px] shrink-0 p-5">
                    <h2 className="font-bold text-6xl flex items-center">{averageRating}<span className="text-gray-500 font-semibold text-5xl">/5</span></h2>
                    <div className="flex gap-3 items-center">
                        {sao.map((i, index) => (
                            <FaStar key={index} className={i <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                    </div>
                    <p className="text-lg"> {totalReviews} lượt đánh giá</p>
                    <button onClick={() => setShowReviewForm(true)} className="bg-[#d7000e] h-auto p-3 rounded-lg w-full hover:bg-red-400">
                        <span className="text-white font-medium text-lg">Viết đánh giá</span>
                    </button>
                </div>
                <div className="w-full flex flex-col justify-between ml-3 border-r pr-6 border-gray-300 ml-5">
                    {danhgiaStats.map((item, index) => {
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
                className="flex flex-col py-5 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0"
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">

                    <div className={`w-11 h-11 shrink-0 ${item.mau} rounded-full flex justify-center items-center shadow-sm`}>
                        <p className="text-lg font-bold text-white uppercase">{item.bd}</p>
                    </div>
                    
                
                    <div className="flex flex-col gap-1.5 mt-0.5">
                        <h3 className="text-[16px] font-semibold text-gray-900">{item.name}</h3>
                        
                        <div className="flex text-yellow-400 text-sm mb-1">
                            {[...Array(item.sao)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <div className="text-gray-600 text-[15px] flex items-start gap-2 leading-relaxed pr-4">
                          
                            <FaComment className="mt-1 text-gray-400 shrink-0"/>
                            <span>{item.cmt}</span>
                        </div>
                    </div>
                    </div>

                    <div className="shrink-0 ml-2">
                        <button 
                            onClick={() => { setReplyingTo(index); setReplyText(""); }}
                            className="py-1.5 px-4 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg font-medium text-sm transition-colors border border-yellow-200 shadow-sm"
                        >
                            Phản hồi
                        </button>
                    </div>
                </div>

                {/* Danh sách các phản hồi */}
                {item.replies && item.replies.length > 0 && (
                    <div className="ml-14 mt-4 pl-4 border-l-2 border-gray-200 flex flex-col gap-3">
                        {item.replies.map((reply, rIdx) => (
                            <div key={rIdx} className="bg-gray-50 p-3 rounded-lg">
                                <span className="font-semibold text-sm text-gray-800">{reply.name}: </span>
                                <span className="text-sm text-gray-600">{reply.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Khung nhập phản hồi */}
                {replyingTo === index && (
                    <div className="ml-14 mt-3 flex items-start gap-2">
                        <input 
                            type="text" 
                            autoFocus
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit(index)}
                            placeholder="Nhập phản hồi của bạn..."
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                        <button 
                            onClick={() => handleReplySubmit(index)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                        >Gửi</button>
                        <button 
                            onClick={() => { setReplyingTo(null); setReplyText(""); }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300"
                        >Hủy</button>
                    </div>
                )}
            </div>
        ))}
    </div>
            </div>

            {/* Modal Viết Đánh Giá */}
            {showReviewForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
                        <button 
                            onClick={() => setShowReviewForm(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                        >
                            <FaTimes size={24}/>
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Đánh giá sản phẩm</h2>
                        
                        <div className="mb-6">
                            <p className="font-semibold text-gray-700 mb-2">Bạn đánh giá sao về sản phẩm này?</p>
                            <div className="flex gap-2 text-3xl">
                                {[1, 2, 3, 4, 5].map((sao) => (
                                    <FaStar 
                                        key={sao} 
                                        onClick={() => setNewRating(sao)}
                                        className={`cursor-pointer transition-colors ${sao <= newRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold text-gray-700 mb-2">Nội dung đánh giá</p>
                            <textarea 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm này..."
                                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-32"
                            ></textarea>
                        </div>

                        <button 
                            onClick={handleSubmitReview}
                            className="w-full bg-[#d7000e] text-white font-bold text-lg py-3 rounded-xl hover:bg-red-700 transition-colors"
                        >
                            Gửi đánh giá ngay
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}