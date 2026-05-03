// 1. Token về Thời gian (Durations)
export const durations = {
    fast : 0.2,// Cho nút bấm, hover
    medium: 0.3,// Cho menu sổ xuống, alert
    slow: 0.5,// Cho Modal, chuyển trang
}
// 2. Token về Kiểu chuyển động (Easings/Springs)
export const transitions = {
    // Tween transition (mượt, dựa trên thời gian)
    easeOut: {type : "tween", ease: [0,0,0.2,1], duration: durations.medium},
    easeInOut: {type: "tween", ease:[0.4,0,0.2,1], duration: durations.medium},
    // Spring transition (bật nảy, dựa trên vật lý - cảm giác tự nhiên)
  springGentle: { type: "spring", stiffness: 100, damping: 20 },
  springSnappy: { type: "spring", stiffness: 300, damping: 15 }, // Bật mạnh hơn
  springBouncy: { type: "spring", stiffness: 400, damping: 10 }, // Nảy nhiều
}   