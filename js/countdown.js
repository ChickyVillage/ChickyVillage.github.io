document.addEventListener("DOMContentLoaded", () => {
    // Countdown timer
    /* function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const deadline = new Date('2025-11-23T23:59:59').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "모집 마감";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        }, 1000);
    }
    startCountdown(); */
});