let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    speechSynthesis.cancel();

    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-US"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    speechSynthesis.cancel();
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}
// window.addEventListener('load',()=>{
//     wishMe()
// })

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
     content.innerText=transcript
    takeCommand(transcript.toLowerCase())
 }



btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})


  






 // Set up speech recognition
//  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//  const recognition = new SpeechRecognition();
//  recognition.lang = "en-US";
//  recognition.interimResults = false;

//  // Handle recognition results
//  recognition.onresult = function(event) {
//      const message = event.results[0][0].transcript.toLowerCase();
//      console.log("Voice input:", message);
//      takeCommand(message);
//  };

//  recognition.onerror = function(event) {
//      console.error("Speech recognition error:", event.error);
//      speak("Sorry, I didn't catch that. Could you repeat?");
//  };


//   // Function to start listening
//   function startListening() {
//     voice.style.display = "block";
//     speak("I am listening");
//     console.log("Starting recognition..."); // Debug statement
//     recognition.start();
// }


// // Re-run recognition on end to continue listening
// recognition.onend = function() {
//     voice.style.display = "none";
//     // Remove auto-restart to avoid looping errors
//     console.log("Stopped listening. Click the button to start again.");
// };
// // Handle recognition results
// recognition.onstart = function() {
//     console.log("Speech recognition started.");
// };



async function takeCommand(message) {
    speechSynthesis.cancel();
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("My name is Jarvis, I am a Virtual Assistant and developed by Sohaib");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today is " + date);
    }else if (message.includes("open tiktok")) {
        speak("Opening tiktok..");
        window.open("https://tiktok.com/", "_blank");
     } else {
        let finalText = "This is what I found on the internet regarding " + message.replace(/shipra|shifra/g, "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace(/shipra|shifra/g, "")}`, "_blank");
    }
}

// Function to get response from ChatGPT API
// async function getChatGptResponse(message) {
//     const apiKey = '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'; // Replace with your OpenAI API key
//     const url = 'https://api.openai.com/v1/chat/completions';
    
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//             model: 'gpt-4-turbo', // or the model you are using
//             messages: [{ role: 'user', content: message }],
//         }),
//     });

//     if (!response.ok) {
//         console.error('Error fetching ChatGPT response:', response.statusText);
//         return "I couldn't fetch a response from ChatGPT.";
//     }

//     const data = await response.json();
//     const chatGptAnswer = data.choices[0].message.content;
//     return chatGptAnswer;
// }


// async function getChatGptResponse(message) {
//     const apiKey = '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'; // Use a secure method to store the key
//     const url = 'https://api.openai.com/v1/chat/completions';

//     for (let attempt = 0; attempt < 3; attempt++) {  // Retry up to 3 times
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${apiKey}`,
//                 },
//                 body: JSON.stringify({
//                     model: 'gpt-3.5-turbo',
//                     messages: [{ role: 'user', content: message }],
//                 }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 return data.choices[0].message.content;
//             } else if (response.status === 429) {
//                 console.warn('Rate limit hit. Retrying in 2 seconds...');
//                 await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds before retrying
//             } else {
//                 console.error('Error fetching ChatGPT response:', response.statusText);
//                 return "I couldn't fetch a response from ChatGPT.";
//             }
//         } catch (error) {
//             console.error('Network or server error:', error);
//             return "An error occurred while connecting to ChatGPT.";
//         }
//     }

//     return "Unable to retrieve response after multiple attempts.";
// }





// 3rd
// async function getChatGptResponse(message) {
//     const apiKey = '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'; // replace with your actual API key
//     const url = 'https://api.openai.com/v1/chat/completions';

//     // Helper function to delay
//     function delay(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     // Maximum retry attempts
//     const maxRetries = 3;
//     let attempts = 0;

//     while (attempts < maxRetries) {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`,
//             },
//             body: JSON.stringify({
//                 model: 'gpt-4-turbo',
//                 messages: [{ role: 'user', content: message }],
//             }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data.choices[0].message.content;
//         } else if (response.status === 429) {
//             // Log rate limit error and wait before retrying
//             console.warn('Rate limit exceeded. Retrying...');
//             attempts++;
//             await delay(2000 * attempts); // Wait longer with each retry
//         } else {
//             console.error('Error fetching ChatGPT response:', response.statusText);
//             return "I couldn't fetch a response from ChatGPT.";
//         }
//     }
    

//     // If all attempts fail
//     return "Too many requests; please try again later.";
// }



