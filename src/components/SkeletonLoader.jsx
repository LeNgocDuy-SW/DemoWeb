import { motion } from "framer-motion";

export function SkeletonLoader({ className }) {
  return (
    <motion.div
      className={`bg-gray-300 w-full min-h-[160px] rounded-xl ${className}`} 
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  );
}