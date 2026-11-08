import { useState } from "react";
import { ArrowRight, Bot, Search, ThumbsDown, ThumbsUp } from "lucide-react";
import QuickFaqCards from "../components/assistant/QuickFaqCards.jsx";
import ChatInput from "../components/assistant/ChatInput.jsx";
import styles from "./ChatPage.module.css";
import { useLanguage } from "../context/useLanguage.js";

function ChatPage({
  messages,
  onSend,
  onUpload,
  isTyping,
  isListening,
  setIsListening,
}) {
  const [feedback, setFeedback] = useState({});

  const { language } = useLanguage();
  const isAmharic = language === "am";

  return (
    <div className={styles.scope}>
      <section className={`${styles.chatScreen}`}>
        <div className={`${styles.chatScrollArea}`}>
          <div className={`${styles.chatWelcome}`}>
            <div className={`${styles.welcomeSpark}`}>✳</div>
            <p className={`${styles.welcomeOverline}`}>
              {isAmharic ?
                "የመንግሥት አገልግሎት ረዳት"
              : "GOVERNMENT SERVICES ASSISTANT"}
            </p>
            <h2>
              {isAmharic ?
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
              {isAmharic ?
                "አገልግሎት ይፈልጉ ወይም ጥያቄ ይጠይቁ።"
              : "Browse a service or ask a question."}
            </p>
          </div>

          {messages.length === 1 && <QuickFaqCards onSelect={onSend} />}

          <div className={`${styles.messageList}`} aria-live="polite">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`${styles.messageRow} ${message.role === "user" ? styles.messageUser : ""}`}
              >
                {message.role === "assistant" && (
                  <span className={`${styles.messageAvatar}`}>
                    <Bot size={17} />
                  </span>
                )}
                <div className={`${styles.messageContent}`}>
                  <div className={`${styles.messageBubble}`}>
                    {typeof message.text === "string" ?
                      message.text
                    : message.text[language]}
                  </div>
                  {message.role === "assistant" && message.id !== "welcome" && (
                    <div className={`${styles.messageFeedback}`}>
                      <span>
                        {isAmharic ? "መልሱ ጠቃሚ ነበር?" : "Was this helpful?"}
                      </span>
                      <button
                        className={`btn ${feedback[message.id] === "up" ? styles.feedbackSelected : ""}`}
                        type="button"
                        aria-label={isAmharic ? "ጠቃሚ ነበር" : "Helpful"}
                        onClick={() =>
                          setFeedback((previous) => ({
                            ...previous,
                            [message.id]:
                              previous[message.id] === "up" ? null : "up",
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
