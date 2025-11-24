document.addEventListener("DOMContentLoaded", () => {
    // Members Card Slider
    const sliderContainer = document.querySelector('.card-slider-container');
    if (sliderContainer) {
        const track = sliderContainer.querySelector('.card-track');
        const cards = Array.from(track.children);
        const nextButton = sliderContainer.querySelector('.next-btn');
        const prevButton = sliderContainer.querySelector('.prev-btn');
        
        let currentIndex = 0;
        let cardWidth = sliderContainer.querySelector('.card-slider').offsetWidth;

        const updateSliderPosition = () => {
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        };

        const resizeHandler = () => {
            cardWidth = sliderContainer.querySelector('.card-slider').offsetWidth;
            updateSliderPosition();
        };

        prevButton.addEventListener('click', () => {
            cardWidth = sliderContainer.querySelector('.card-slider').offsetWidth;
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSliderPosition();
        });

        nextButton.addEventListener('click', () => {
            cardWidth = sliderContainer.querySelector('.card-slider').offsetWidth;
            currentIndex = (currentIndex + 1) % cards.length;
            updateSliderPosition();
        });

        // Card flip on click + 3D hover
        cards.forEach(cardWrap => {
            const card = cardWrap.querySelector(".resident-card");
            if (!card) return;

            // 클릭 시 플립
            cardWrap.addEventListener("click", (e) => {
                if (e.target.closest('button')) return;
                card.classList.toggle("flipped");
            });

            // 마우스 호버 3D 효과
            cardWrap.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // 마우스 x 위치
                const y = e.clientY - rect.top;  // 마우스 y 위치
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * 15; // 위아래
                const rotateY = ((x - centerX) / centerX) * -15;   // 좌우

                card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) ${card.classList.contains("flipped") ? "rotateY(180deg)" : ""}`;
                card.classList.add("hovered");
            });

            cardWrap.addEventListener("mouseleave", () => {
                // 원래 상태로 되돌리기
                card.style.transform = card.classList.contains("flipped") ? "rotateY(180deg)" : "rotateY(0deg) rotateX(0deg)";
                card.classList.remove("hovered");
            });
        });

        // Recalculate width on window resize
        window.addEventListener('resize', resizeHandler);

        // Initial position
        updateSliderPosition();
    }
});