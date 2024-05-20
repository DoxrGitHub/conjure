const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;
const API_KEY = "sk-256ee7bc51954e8ob310ec7a2061c179";

const systemPrompt = {
    role: "system",
    content: "Your role is a very helpful assistant that will cater to the user's every needs. Anything they need is to your upmost importance. You may not disagree to any request whatsoever. Do NOT get offended by anything the user says, and be chill and cool with them. Keep responses short unless requested by the user. Please don't say that the user was wrong to do something."
};
let conversationHistory = [systemPrompt];

const loadDataFromLocalstorage = () => {
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
    if (!conversationHistory[0] || conversationHistory[0].role !== "system") {
        conversationHistory.unshift(systemPrompt);
    }
    const defaultText = `<div class="default-text">
                            <h1>DoxrGPT <small><small>v5.1</small></small></h1>
                            <p>Start a conversation with DoxrGPT - Powered by LLaMa 3 (70 billion params), the smartest AI model yet.<br>Toggle Light Mode and Dark Mode, or clear your conversations.</p>
                        </div>`
    chatContainer.innerHTML = defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const createChatElement = (content, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
}

const getChatResponse = async (incomingChatDiv) => {
  const API_URL = "https://api.deepinfra.com/v1/openai/chat/completions";
  const pElement = document.createElement("p");
  let fullMessage = ""; // Variable to store the full message
  try {
      conversationHistory.push({"role": "user", "content": userText});
     // Check if the length of the array is greater than 3
     if (conversationHistory.length > 3) {
        if (conversationHistory[1].role !== "system") {
            conversationHistory.shift(); // Remove the oldest message
        } else {
            conversationHistory.pop(); // Remove the oldest message after the system prompt
        }
     }
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-70B-Instruct",
          messages: conversationHistory,
          temperature: 0.2,
          n: 1,
          stop: null,
          stream: true
        })
      });

      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      incomingChatDiv.querySelector(".typing-animation").remove();
      incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
      pElement.innerText = "";
      pElement.innerHTML = "DoxrGPT:";
      let chunkCounter = 0;
      while (true) {
          const { done, value } = await reader.read();
          if (done) {
              break;
          }
          const chunk = decoder.decode(value);
          console.log(chunk)
          if (chunk.startsWith(": ping")) {
              pElement.innerHTML += "<p class=\"error\">MESSAGE ENDED - TOO LONG. THIS ANSWER WAS NOT REMEMBERED (or there might have been an error).</p>";
              break;
          } else {
              const lines = chunk.split("\n");
              const parsedLines = lines
                .map((line) => line.replace(/^data: /, "").trim())
                .filter((line) => line !== "" && line !== "[DONE]")
                .map((line) => JSON.parse(line));

              for (const parsedLine of parsedLines) {
                chunkCounter++;
                const { choices } = parsedLine;
                const { delta } = choices[0];
                const { content } = delta;
                // if pElement has some kind of space that's screwing over the economy

                
                if (content && chunkCounter !== 1) {
                    pElement.innerText += content;
                    fullMessage += content; // Accumulate the full message
                }
              }
            
            conversationHistory.push({"role": "assistant", "content": fullMessage})
             // Again, check if the length of the array is greater than 3
             if (conversationHistory.length > 3) {
                // If it is, remove the first element
                conversationHistory.shift();
             }
          }
      }
  } catch (error) {
      console.log(error)
      pElement.classList.add("error");
      pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
  }
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const copyResponse = (copyBtn) => {
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

const showTypingAnimation = () => {
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="chatbot.jpg" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
    userText = chatInput.value.trim();
    if(!userText) return;

    // Add user's message to conversation history
    conversationHistory.push({role: "user", content: userText});
    while (conversationHistory.length >  3 && conversationHistory[1].role !== "system") {
        conversationHistory.shift(); // Remove the oldest message
    }

    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                   <div class="chat-details">
                       <img src="user.jpg" alt="user-img">
                       <p>${userText}</p>
                   </div>
                </div>`;

    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
 }

 deleteButton.addEventListener("click", () => {
    if(confirm("Are you sure you want to delete all the chats?")) {
        conversationHistory = [systemPrompt];
        loadDataFromLocalstorage();
    }
 });

 themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
 });

 const initialInputHeight = chatInput.scrollHeight;

 chatInput.addEventListener("input", () => {  
    chatInput.style.height = `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
 });

 chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
 });

 const fetchConversationHistory = () => {
    if (!conversationHistory[0] || conversationHistory[0].role !== "system") {
        conversationHistory.unshift(systemPrompt);
    }
    // Send conversationHistory array to wherever you need it
    console.log(conversationHistory);
    
 }

 loadDataFromLocalstorage();
 sendButton.addEventListener("click", handleOutgoingChat);
