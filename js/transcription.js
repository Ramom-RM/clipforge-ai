// transcription.js
async function waitForTranscription() {
    const maxAttempts = 30;
    for (let i = 0; i < maxAttempts; i++) {
        const currentUrl = `https://res.cloudinary.com/${app.cloudName}/raw/upload/v${Date.now()}/${app.public_id}.transcript`;
        try {
            const response = await fetch(currentUrl);
            if (response.ok) {
                app.transcriptionURL = currentUrl;
                return true;
            }
        } catch (e) {
            console.log("Fetch check error", e);
        }
        await new Promise((r) => setTimeout(r, 2000));
    }
    return false;
}

async function getTranscription() {
    const response = await fetch(app.transcriptionURL);
    return response.text();
}