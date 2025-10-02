document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero .slide");
    const slider = document.querySelector(".hero-slider");
    const nextBtn = document.getElementById("nextSlide");
    const prevBtn = document.getElementById("prevSlide");
    let current = 0;

    console.log("Slides encontrados:", slides.length);
    console.log("Slider encontrado:", slider);
    console.log("Botão next:", nextBtn);
    console.log("Botão prev:", prevBtn);

    function showSlide(index) {
        if (slider) {
            slider.style.transform = `translateX(${-index * 100}%)`;
            console.log("Mostrando slide:", index);
        }
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", nextSlide);
        console.log("Event listener adicionado ao botão next");
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", prevSlide);
        console.log("Event listener adicionado ao botão prev");
    }

    setInterval(nextSlide, 20000); // troca automática a cada 20s

    showSlide(current);
});
