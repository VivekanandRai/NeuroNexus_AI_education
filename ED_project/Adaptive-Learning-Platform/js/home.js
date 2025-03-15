document.addEventListener("DOMContentLoaded", function() {
    console.log("Homepage loaded successfully!");
});
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav.classList.contains('active')) {
        nav.style.right = "-100%";  // Slide out
        setTimeout(() => nav.classList.remove('active'), 400);
    } else {
        nav.classList.add('active');
        nav.style.right = "0";  // Slide in
    }
}
