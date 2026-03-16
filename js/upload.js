// upload.js
el.uploadButton.addEventListener(
    "click",
    () => {
        if (!el.apiKey.value) {
            alert("Por favor, insira sua chave de API do Gemini primeiro.");
            el.apiKey.focus();
            return;
        }
        myWidget.open();
    },
    false,
);