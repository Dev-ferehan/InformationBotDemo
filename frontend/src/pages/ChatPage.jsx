import { useEffect, useRef, useState } from "react";
import { Bot, ThumbsDown, ThumbsUp } from "lucide-react";
import QuickFaqCards from "../components/assistant/QuickFaqCards.jsx";
import ChatInput from "../components/assistant/ChatInput.jsx";
import styles from "./ChatPage.module.css";
import { useLanguage } from "../context/useLanguage.js";

function ChatPage({
  messages,
  serviceMode,
  onSend,
  onUpload,
  isTyping,
  isListening,
  setIsListening,
}) {
  const [feedback, setFeedback] = useState({});
  const chatScrollRef = useRef(null);

  const { language } = useLanguage();
  const isAmharic = language === "am";

  useEffect(() => {
    const scrollArea = chatScrollRef.current;
    if (scrollArea) {
      scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: "smooth" });
    }
  }, [messages.length, isTyping, serviceMode]);


  return (
    <div className={styles.scope}>
      <section className={`${styles.chatScreen}`}>
        <div ref={chatScrollRef} className={`${styles.chatScrollArea}`}>
          <div className={`${styles.chatWelcome}`}>
            <div className={`${styles.welcomeSpark}`}>✳</div>
            <p className={`${styles.welcomeOverline}`}>
              {serviceMode === "legal"
                ? (isAmharic ? "የሕግ ምክክር / ሰነድ ግምገማ" : "LEGAL GUIDANCE & DOCUMENT REVIEW")
                : isAmharic ?
                "የመንግሥት አገልግሎት ረዳት"
              : "GOVERNMENT SERVICES ASSISTANT"}
            </p>
            <h2>
              {serviceMode === "legal"
                ? (isAmharic
                    ? <>ስለ ሕጋዊ ሂደቶች<br /><span>መመሪያ ይፈልጋሉ?</span></>
                    : <>Need help with a legal process?<br /><span>Let’s review it together.</span></>)
                : isAmharic ?
                <>
                  ሰላም! እንዴት ልርዳዎ?
                  <br />
                  <span>ዛሬ ምን ይፈልጋሉ?</span>
                </>
              : <>
                  Hello! How can I help?
                  <br />
                  <span>What do you need today?</span>
                </>
              }
            </h2>
            <p className={`${styles.welcomeCaption}`}>
              {serviceMode === "legal"
                ? (isAmharic
                    ? "ሰነድ ያያይዙ ወይም ስለ ሕጋዊ ሂደት ጥያቄ ይጠይቁ።"
                    : "Attach a document or ask about a legal process.")
                : isAmharic ?
                "አገልግሎት ይፈልጉ ወይም ጥያቄ ይጠይቁ።"
              : "Browse a service or ask a question."}
            </p>
          </div>

          {messages.length === 1 && serviceMode === "services" && (
            <QuickFaqCards onSelect={onSend} />
          )}

          <div className={`${styles.messageList}`} aria-live="polite">
            {messages?.map((message) => (
            
              <article
                key={message?.id}
                className={`${styles.messageRow} ${message?.role === "user" ? styles.messageUser : ""}`}
              >
                {message?.role === "assistant" && (
                  <span className={`${styles.messageAvatar}`}>
                    <Bot size={17} />
                  </span>
                )}
                <div className={`${styles.messageContent}`}>
                  <div className={`${styles.messageBubble}`}>
                    {message?.id === "welcome" && serviceMode === "legal"
                      ? (isAmharic
                          ? "ሰላም! ሕጋዊ ሂደቶችን ለማብራራትና ሰነድን ለመገምገም ልረዳዎ እችላለሁ። ምን ማወቅ ይፈልጋሉ?"
                          : "Hello! I can help explain legal processes and review a document. What would you like to understand?")
                      : typeof message.text === "string" ?
                      message?.text
                    : message?.text?.[language] || " "}
                  </div>
                  {message?.role === "assistant" && message?.id !== "welcome" && (
                    <div className={`${styles.messageFeedback}`}>
                      <span>
                        {isAmharic ? "መልሱ ጠቃሚ ነበር?" : "Was this helpful?"}
                      </span>
                      <button
                        className={`btn ${feedback[message?.id] === "up" ? styles.feedbackSelected : ""}`}
                        type="button"
                        aria-label={isAmharic ? "ጠቃሚ ነበር" : "Helpful"}
                        onClick={() =>
                          setFeedback((previous) => ({
                            ...previous,
                            [message?.id]:
                              previous[message?.id] === "up" ? null : "up",
                          }))
                        }
                      >
                        <ThumbsUp size={13} />
                      </button>
                      <button
                        className={`btn ${feedback[message.id] === "down" ? styles.feedbackSelected : ""}`}
                        type="button"
                        aria-label={isAmharic ? "ጠቃሚ አልነበረም" : "Not helpful"}
                        onClick={() =>
                          setFeedback((previous) => ({
                            ...previous,
                            [message.id]:
                              previous[message.id] === "down" ? null : "down",
                          }))
                        }
                      >
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
            {isTyping && (
              <div className={`${styles.messageRow}`}>
                <span className={`${styles.messageAvatar}`}>
                  <Bot size={17} />
                </span>
                <div className={`${styles.typingBubble}`}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>
        </div>
        <ChatInput
          onSend={onSend}
          onUpload={onUpload}
          isTyping={isTyping}
          isListening={isListening}
          setIsListening={setIsListening}
        />
      </section>
    </div>
  );
}

export default ChatPage;
