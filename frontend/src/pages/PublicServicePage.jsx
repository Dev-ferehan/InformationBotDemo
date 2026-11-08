import { useState } from "react";
import PublicServiceWidget from "../components/assistant/PublicServiceWidget.jsx";
import { initialMessages } from "../data/publicServiceContent.js";
import {sendMessageToAI,uploadDocument} from '../services/chat.service.js'
import HomePage from "./HomePage.jsx";
import styles from "./PublicServicePage.module.css";
import { useLanguage } from "../context/useLanguage.js";

function PublicServicePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const sendMessage = async (userInput) => {
    const value = userInput.trim();
    if (!value || isTyping) return;
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: value },
    ]);
    setIsTyping(true);
    try {
      const reply = await sendMessageToAI({
        userQuery: userInput,
        language: language, 
        topicContext: "General Inquiry",
        additionalContext: "Typed directly in chat input"
      });
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", text: reply },
      ]);
    } catch (error) {
      console.error("Unable to get a response from the assistant.", error);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: {
            en: "Sorry, I could not get a response right now. Please try again in a little while.",
            am: "ይቅርታ አሁን መልስ ማግኘት አልቻልኩም። እባክዎ ከጥቂት ጊዜ በኋላ ይሞክሩ።",
          },
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleUpload = async (file) => {
    try {
      const uploaded = await uploadDocument(file);
      if (!uploaded) return;
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: {
            en: "Your document is ready to attach. Document analysis can be connected to the backend system.",
            am: "ሰነዱ ለመያያዝ ዝግጁ ነው። የሰነድ ትንተናን ከጀርባ ስርዓቱ ጋር ማገናኘት ይቻላል።",
          },
        },
      ]);
    } catch (error) {
      console.error("Unable to upload the selected document.", error);
    }
  };

  const showGuidelines = () => {
    setIsOpen(true);
    setActiveTab("articles");
  };

  const askServiceQuestion = (question) => {
    setIsOpen(true);
    setActiveTab("chat");
    sendMessage(question);
  };

  return (
    <div className={styles.scope}>
      <HomePage
        onOpenGuidelines={showGuidelines}
        onAskQuestion={askServiceQuestion}
      />
      <PublicServiceWidget
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        messages={messages}
        onSend={sendMessage}
        onUpload={handleUpload}
        isTyping={isTyping}
        isListening={isListening}
        setIsListening={setIsListening}
      />
    </div>
  );
}

export default PublicServicePage;
