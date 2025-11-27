document.addEventListener("DOMContentLoaded", () => {
    function startCookingCountdown() {
        const countdownElement = document.getElementById('cooking-countdown');
        if (!countdownElement) return;

        const lastUpdate = new Date('2025-11-27T03:00:00');
        const nextUpdate = new Date(lastUpdate);
        nextUpdate.setDate(lastUpdate.getDate() + 3);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = nextUpdate - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "갱신 중...";
                // Optionally, reload the page or fetch new data
                // location.reload();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        }, 1000);
    }
    startCookingCountdown();
});
