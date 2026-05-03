import { motion } from "framer-motion";
import { fadeInUp } from "../theme/variants";

export function AnimateInView({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate="visible" // <-- Đổi dòng này từ whileInView thành animate để ép hiển thị
    >
      {children}
    </motion.div>
  );
}