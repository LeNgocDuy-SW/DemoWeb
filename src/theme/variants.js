import {durations, transitions} from "./motion";
// Hiệu ứng Fade In đơn giản
export const fadeIn = {
    hidden: {opacity: 0},
    visible :{
        opacity: 1,
        transition: transitions.easeOut
    },
    exit: {opacity: 0}
};
// Hiệu ứng trượt từ dưới lên (hợp cho Card, Modal)
export const fadeInUp ={
    hidden: {opacity: 0, y : 20},
    visible : {
        opacity : 1,
        y : 0,
        transition: transitions.springGentle
    },
    exit:{
        opacity: 0,
        y :20,
        transition: {duration: durations.fast}
    }
};
// Hiệu ứng phóng to khi hover (hợp cho Nút, Thẻ)
export const hoverScale = {
    hover: {
        scale: 1.05,
        transition: transitions.springSnappy
    },
    tap: {scale: 0.95}
}