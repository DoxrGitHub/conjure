const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;
const API_KEY = "sk-256ee7bc51954e8ob310ec7a2061c179";

let conversationHistory = [];

const loadDataFromLocalstorage = () => {
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>DoxrGPT <small><small>v4.1</small></small></h1>
                            <p>Start a conversation with DoxrGPT - Powered by LLaMa 2 (70 billion params)<br>Toggle Light Mode and Dark Mode, or clear your conversations.</p>
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
         // If it is, remove the first element
         conversationHistory.shift();
     }
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-2-70b-chat-hf",
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
      pElement.innerHTML = "";
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

                pElement.innerText = '';
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
    // Send conversationHistory array to wherever you need it
    console.log(conversationHistory);
 }

 loadDataFromLocalstorage();
 sendButton.addEventListener("click", handleOutgoingChat);