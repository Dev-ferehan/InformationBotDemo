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
  const [serviceMode, setServiceMode] = useState("services");
  const [selectedFile, setSelectedFile] = useState(null);
  const { language } = useLanguage();

  const sendMessage = async (userInput) => {
    const value = userInput.trim();
    if ((!value && !selectedFile) || isTyping) return;
    const userDisplayMessage = selectedFile 
      ? `${value ? value + " " : ""}[Attached File: ${selectedFile.name}]` 
      : value;
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text:  userDisplayMessage },
    ]);
    setIsTyping(true);
    const fileToSend = selectedFile;
    // ፋይሉን ልከን ስንጨርስ ከ State እናጸዳዋለን
    setSelectedFile(null);
    try {
      let reply;
      if(fileToSend){
        reply = await uploadDocument(fileToSend, {
          userQuery: value || "ስለዚህ ሰነድ/ምስል አብራርቶ ስጠኝ",
          language: language,
          topicContext:
            serviceMode === "legal"
              ? "Legal Consultation/Document Review"
              : "Government Services",
          additionalContext: `Attached File: ${fileToSend.name}`,
        });
      }else{
        reply = await sendMessageToAI({
          userQuery: value,
          language: language,
          topicContext:
            serviceMode === "legal"
              ? "Legal Consultation/Document Review"
              : "Government Services",
          additionalContext: "Typed directly in chat input",
        });
      }
  
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
    if (!file ) return;
    setSelectedFile(file);
    //     const fileMessageId = crypto.randomUUID();
    // setMessages((current) => [
    //   ...current,
    //   { id: fileMessageId, role: "user", text: ` Attached File: ${file.name}` },

    // ]);


  //   try {
  //   const reply = await uploadDocument(
  //     file, {
  //       userQuery: "explain about this ", 
  //       language: language,
  //       topicContext:
  //         serviceMode === "legal"
  //           ? "Legal Consultation/Document Review"
  //           : "Government Services",
  //       additionalContext:  ` Attached File: ${file.name}` ,

  //     }     
  //   );


    

  //     if (!reply) return;

  //     setMessages((current) => [
  //       ...current,
  //       {
  //         id: crypto.randomUUID(),
  //         role: "assistant",
  //         text: reply, 
  //       },
  //     ]);
   
  //   } catch (error) {
  //     console.error("Unable to upload and analyze the selected document.", error);
  //     setMessages((current) => [
  //       ...current,
  //       {
  //         id: crypto.randomUUID(),
  //         role: "assistant",
  //         text: {
  //           en: "Sorry, I could not analyze the uploaded document. Please try again.",
  //           am: "ይቅርታ፣ የተጫነውን ሰነድ መተንተን አልቻልኩም። እባክዎ እንደገና ይሞክሩ።",
  //         },
  //       },
  //     ]);
  //   }finally {
  //     setIsTyping(false);
  //   }
  // };

  // const showGuidelines = () => {
  //   setIsOpen(true);
  //   setActiveTab("articles");
  // };

  // const askServiceQuestion = (question) => {
  //   setIsOpen(true);
  //   setActiveTab("chat");
  //   setChatInFile(question)
  //   sendMessage(question);

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
        serviceMode={serviceMode}
        setServiceMode={setServiceMode}
        messages={messages}
        onSend={sendMessage}
        onUpload={handleUpload}
        isTyping={isTyping}
        isListening={isListening}
        setIsListening={setIsListening}
        selectedFile={selectedFile}          
        onRemoveFile={() => setSelectedFile(null)} 
      />
    </div>
  );

}

export default PublicServicePage;
