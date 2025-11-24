document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');

    // Village Places Carousel
    const carousels = document.querySelectorAll('.place-img-carousel');
    carousels.forEach((carousel) => {
        const card = carousel.closest('.village-place-card');
        const slides = carousel.querySelectorAll('.place-img-wrapper');
        const pageNumber = carousel.querySelector('.place-page'); // 페이지 번호 엘리먼트
        const prevButton = card.querySelector('.place-prev'); // 이전 버튼
        const nextButton = card.querySelector('.place-next'); // 다음 버튼
        let index = 0;

        function updateSlide() {
            if (slides.length === 0) return;
            pageNumber.textContent = `${index + 1}/${slides.length}`;
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function showPrev() {
            if (slides.length === 0) return;
            index = (index - 1 + slides.length) % slides.length;
            updateSlide();
        }

        function showNext() {
            if (slides.length === 0) return;
            index = (index + 1) % slides.length;
            updateSlide();
        }

        prevButton.addEventListener('click', showPrev);
        nextButton.addEventListener('click', showNext);

        // 이미지 클릭 시 라이트박스 열기
        slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                // 버튼 클릭 시에는 라이트박스가 열리지 않도록 함
                if (e.target.closest('.place-prev') || e.target.closest('.place-next')) {
                    return;
                }
                const img = slide.querySelector('img');
                if (img && lightbox && lightboxImage) {
                    lightboxImage.src = img.src;
                    lightbox.classList.add('show');
                }
            });
        });

        updateSlide();
    });
});