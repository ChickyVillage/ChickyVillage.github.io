document.addEventListener("DOMContentLoaded", () => {
    const albumItems = document.querySelectorAll(".album-item");
    const postModal = document.getElementById("post-modal");
    const slider = postModal.querySelector(".post-modal-slider");
    const postText = postModal.querySelector(".post-modal-text");
    const closeButton = postModal.querySelector(".close-button");
    const prevButton = postModal.querySelector(".prev-btn");
    const nextButton = postModal.querySelector(".next-btn");

    let currentPostIndex = -1;
    let currentSlideIndex = 0;
    let images = [];

    const openPostModal = (index) => {
        if (index >= 0 && index < albumItems.length) {
            const item = albumItems[index];
            const content = item.dataset.content;
            images = JSON.parse(item.dataset.images);
            
            slider.innerHTML = images.map(src => `<img src="${src}" alt="Post image">`).join('');
            postText.textContent = content;

            postModal.classList.add("show");
            currentPostIndex = index;
            currentSlideIndex = 0;
            updateSlider();

            history.pushState({postIndex: index}, null, `#post-${index + 1}`);
        }
    };

    const closePostModal = () => {
        postModal.classList.remove("show");
        currentPostIndex = -1;
        history.pushState(null, null, window.location.pathname);
    };

    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        prevButton.style.display = currentSlideIndex === 0 ? "none" : "block";
        nextButton.style.display = currentSlideIndex === images.length - 1 ? "none" : "block";
    };

    prevButton.addEventListener("click", () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlider();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentSlideIndex < images.length - 1) {
            currentSlideIndex++;
            updateSlider();
        }
    });

    albumItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openPostModal(index);
        });
    });

    closeButton.addEventListener("click", closePostModal);

    postModal.addEventListener("click", (e) => {
        if (e.target === postModal) {
            closePostModal();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (postModal.classList.contains("show")) {
            if (e.key === "Escape") {
                closePostModal();
            }
        }
    });

    const handlePopState = (event) => {
        const hash = window.location.hash;
        if (hash.startsWith("#post-")) {
            const index = parseInt(hash.substring(6), 10) - 1;
            if(index !== currentPostIndex) {
               openPostModal(index);
            }
        } else {
            closePostModal();
        }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Check hash on initial load
    if (window.location.hash.startsWith("#post-")) {
        const index = parseInt(window.location.hash.substring(6), 10) - 1;
        openPostModal(index);
    }
});