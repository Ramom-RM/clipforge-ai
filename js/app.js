// app.js
// HTML elements to interact with
const el = {
    loading: document.getElementById("loading"),
    loadingText: document.getElementById("loading-text"),
    video: document.getElementById("video"),
    error: document.getElementById("error"),
    errorMessage: document.getElementById("error-message"),
    placeholder: document.getElementById("placeholder"),
    apiKey: document.getElementById("api-key"),
    uploadButton: document.getElementById("upload-widget"),
};

// app state and actions
const app = {
    cloudName: "dhgdmbhtj",
    uploadPreset: "upload_video",
    transcriptionURL: "",
    public_id: "",
};

// Init Lucide Icons
lucide.createIcons();

// GSAP Intro Animation
window.addEventListener("load", () => {
    const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.5 },
    });
    tl.to(".nav-el", { opacity: 1, y: 0 })
        .to(".title-el", { opacity: 1, y: -10 }, "-=1.2")
        .to(".cta-el", { opacity: 1, y: -10 }, "-=1.3")
        .to(".video-el", { opacity: 1, scale: 1, y: 0 }, "-=1.3");
});