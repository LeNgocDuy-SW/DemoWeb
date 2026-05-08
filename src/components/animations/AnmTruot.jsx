import {motion} from "framer-motion";
import "./styles.css";
const containerVariants = {
    hidden: {opacity: 0},
    visible :{
        opacity: 1,
        transition: {
            //// Cứ mỗi 0.2s thì một thẻ con bên trong sẽ được kích hoạt hiệu ứng
            staggerChildren: 0.2
        }
    }
};
const itemVariants = {
    hidden: {opacity: 0, y :-20}, //Ban đầu: vô hình và bị đẩy lên trên 20px
    visible : {opacity: 1, y:0} // Kết thúc: rõ nét và rơi xuống đúng vị trí ban đầu
};
export default function AnimeTruot(){
    const boxVariants = {
        hiddent : {opacity: 0, scale: 0.3},
        visible :{
            opacity: 1, // rõ nét: 0 là mờ 
            scale : 1, // phóng to thu nhỏ
            transition: {duration: 0.5} // tốc độ
        }
    }
    const items = ["Thẻ số 1", "Thẻ số 2", "Thẻ số 3"];
    
    
    return (
        <div>
            <motion.div 
            initial = {{opacity: 0, y : 150, x : 150}} // Bắt đầu mờ tịt và bị đẩy xuống 150px
            animate = {{opacity: 1, y : 0}} // Kết thúc : rõ nét và ở vị trí ban đầu
            transition ={{duration: 0.5}} // Thời gian chạy hiệu ứng 0.5 giây
            style = {{
                width : 100,
                height : 100,
                background : "blue",
                borderRadius: 10
            }}>Hello!</motion.div>
            <motion.button
                whileHover = {{scale :1.1}} //**  phóng to 10% khi di chuột
                whileTap = {{scale: 0.9}} // Thu nhỏ lại khi bấm vào
                transition = {{stype: "spring", stiffness: 400, damping: 10}} 
               //Hiệu ứng nảy (spring)
                style = {{padding: "10px 20px", fontSize: "16px", cursor: "pointer"}}
            >Click me!
                
            </motion.button>
            <motion.div
                variants={boxVariants}
                initial="hidden" // Sử dụng tên variant
                animate="visible" // Sử dụng tên variant
                style={{ width: 100, height: 100, background: "red" }}
                />
            
            <motion.ul
            className = "list-container"
            variants = {containerVariants}
            initial ="hidden"
            animate= {visible}>
                {items.map((text, index)=> (
                    // Thẻ <li> được gán class .list-item để lấy giao diện tĩnh
                    <motion.li
                    key ={index}
                    className = "list-item"
                    variants = {itemVariants}
                    // Chú ý: Không cần initial và animate ở đây, vì Framer Motion 
                    // tự động truyền lệnh từ cha (container) xuống con (item)
                    >{text}</motion.li>
                ))}
            </motion.ul>
        </div>
    );
}