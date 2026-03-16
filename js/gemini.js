// gemini.js
async function getViralMoment() {
    const transcription = await getTranscription();
    const model = "gemini-2.5-flash";
    const apiKey = el.apiKey.value;
    if (!apiKey) throw new Error("API Key é obrigatória");

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const prompt = `
Role: You are a professional video editor specializing in viral content.
Task: Analyze the transcription below and identify the most engaging, funny, or surprising segment.
Constraints:
1. Duration: Minimum 30 seconds, Maximum 60 seconds.
2. Format: Return ONLY the start and end string for Cloudinary. Format: so_<start_seconds>,eo_<end_seconds>
3. Examples: "so_10,eo_20" or "so_12.5,eo_45.2"
4. CRITICAL: Do not use markdown, do not use quotes, do not explain. Return ONLY the raw string.

Transcription:
${transcription}
`;

    const header = {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
    };

    const contents = [
        {
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    const response = await fetch(geminiEndpoint, {
        method: "POST",
        header,
        body: JSON.stringify({ contents }),
    });

    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text;

    return rawText.replace(/```/g, "").replace(/json/g, "").trim();
}