document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const outputElement = document.getElementById('output');
    const btntextElement = document.getElementById('btntext');
    const copyButton = document.getElementById('copyButton');
    let recognition;

    startButton.addEventListener('click', () => {
        if (!recognition) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                outputElement.innerText = transcript;
            };

            recognition.onend = () => {
                recognition = null;
                startButton.classList.remove('recording');
                btntextElement.innerText = 'Start Recording';
            };

            startButton.classList.add('recording');
            btntextElement.innerText = 'Stop Recording';
            recognition.start();
        } else {
            recognition.stop();
        }
    });

    copyButton.addEventListener('click', () => {
        // Select the text in the output element
        const textToCopy = outputElement.innerText;
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
});
