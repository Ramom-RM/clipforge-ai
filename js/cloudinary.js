// cloudinary.js
const myWidget = cloudinary.createUploadWidget(
    {
        cloudName: app.cloudName,
        uploadPreset: app.uploadPreset,
        theme: "minimal",
        styles: {
            palette: {
                window: "#0F172A",
                sourceList: "#0F172A",
                activeTab: "#2563EB",
                action: "#2563EB",
                inactiveTabIcon: "#64748B",
                menuIcons: "#64748B",
                link: "#3B82F6",
                textDark: "#000000",
                textLight: "#FFFFFF",
                mainShadow: "#000000",
                background: "#020617",
            },
        },
    },
    async (error, result) => {
        if (!error && result && result.event === "success") {
            const { public_id } = result.info;
            app.public_id = public_id;

            try {
                el.loading.classList.remove("hidden");
                el.loadingText.innerText = "Aguardando transcrição...";
                el.error.classList.add("hidden");

                const isReady = await waitForTranscription();
                if (!isReady) throw new Error("A transcrição demorou demais.");

                el.loadingText.innerText = "Gerando momento viral com IA...";

                const viralMoment = await getViralMoment();
                const viralMomentURL = `https://res.cloudinary.com/${app.cloudName}/video/upload/${viralMoment}/${app.public_id}.mp4`;

                // Display Video with Animation
                el.video.setAttribute("src", viralMomentURL);
                el.video.classList.remove("hidden");
                el.placeholder.classList.add("opacity-0");

                gsap.from(el.video, {
                    opacity: 0,
                    scale: 0.98,
                    filter: "blur(10px)",
                    duration: 1,
                });
            } catch (e) {
                el.errorMessage.innerText = e.message || "Erro inesperado";
                el.error.classList.remove("hidden");
            } finally {
                el.loading.classList.add("hidden");
            }
        }
    },
);