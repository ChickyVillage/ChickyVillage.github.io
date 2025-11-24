document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById('lightbox-modal');
    if(lightbox) {
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('show');
        });
    }
});