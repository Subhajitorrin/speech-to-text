// script.js

// Corrected the selector from '.startButton' to '#btntext'
let startbtn = document.querySelector('#startbtn');
let start_btn_text = document.querySelector("#start-btn-text");
let copyButton = document.querySelector('#copyButton'); // Added selector for the copy button
let output = document.querySelector("#output"); // Added selector for the output element

// Moved the 'speech' variable outside the click event listener
let speech = false;

// Added an event listener to the button with the correct ID
startbtn.addEventListener('click', () => {
    // Toggling the 'speech' variable
    speech = !speech;

    // Checking if SpeechRecognition is supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // Using the standard SpeechRecognition API if available, otherwise using webkitSpeechRecognition
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (speech) {
            // If 'speech' is true, update the button text to "Listening"
            start_btn_text.innerHTML = "Listening";

            // Clearing the content of the output element
            output.innerHTML = "";

            // Creating a new SpeechRecognition instance
            let recognition = new SpeechRecognition();
            recognition.interimResults = true;

            // Adding an event listener for the 'result' event
            recognition.addEventListener('result', (e) => {
                // Extracting the transcript from the recognition result
                let transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript);

                // Updating the content of the output element
                output.innerHTML = transcript;
            });

            // Adding an event listener for the 'end' event
            recognition.addEventListener('end', () => {
                // Changing the text back to "Start recording" when recognition ends
                start_btn_text.innerHTML = "Start recording";
            });

            // Starting recognition
            recognition.start();
        } else {
            // If 'speech' is false, update the button text to "Start recording"
            start_btn_text.innerHTML = "Start recording";
        }
    }
});

// Adding an event listener to the copy button
copyButton.addEventListener('click', () => {
    // Creating a textarea element to facilitate copying
    let textarea = document.createElement('textarea');
    textarea.value = output.innerText; // Copying the text from the output element
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
});
