import { useRef, useState } from 'react'
import { Image, LoaderCircle, Mic, Paperclip, SendHorizontal, X } from 'lucide-react'
import styles from './ChatInput.module.css'
import { useLanguage } from '../../context/useLanguage.js'

function ChatInput({ onSend, onUpload, isTyping, isListening, setIsListening }) {
  const { language } = useLanguage()
  const isAmharic = language === 'am'
  const [value, setValue] = useState('')
  const [voiceError, setVoiceError] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const documentInput = useRef(null)
  const imageInput = useRef(null)
  const recognition = useRef(null)

  
  const submit = (event) => {
    event.preventDefault()
    if (!value.trim() || isTyping) return
    onSend(value)
onUpload(selectedFile)
    setValue('')
    
  }

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onUpload(file)
    }
    event.target.value = ''
  }

  const toggleVoiceInput = () => {
    if (isListening) {
      recognition.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setVoiceError(true)
      return
    }

    setVoiceError(false)
    const speech = new SpeechRecognition()
    speech.lang = isAmharic ? 'am-ET' : 'en-US'
    speech.interimResults = false
    speech.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript
      if (transcript) setValue((previous) => `${previous}${previous ? ' ' : ''}${transcript}`)
    }
    speech.onerror = () => {
      setIsListening(false)
      setVoiceError(true)
    }
    speech.onend = () => setIsListening(false)
    recognition.current = speech
    speech.start()
    setIsListening(true)
  }

  return (
    <div className={styles.scope}>
    <form className={`${styles.chatInputForm}`} onSubmit={submit}>
      <div className={`${styles.chatInputShell}`}>
        <input
          className="form-control"
          type="text"
          aria-label={isAmharic ? 'ጥያቄዎን ይጻፉ' : 'Type your question'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={isAmharic ? 'ጥያቄዎን እዚህ ይጻፉ...' : 'Type your question here...'}
        />
        <div className={`${styles.inputActions}`}>
          <input
            ref={documentInput}
            className={styles.visuallyHidden}
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
            onChange={handleFile}
          />
     
          <button
            className={`btn ${styles.inputIconButton}`}
            type="button"
            aria-label={isAmharic ? 'ሰነድ ያያይዙ' : 'Attach a PDF or image'}
            title={isAmharic ? 'ሰነድ ያያይዙ' : 'Attach a PDF or image'}
            onClick={() => documentInput.current?.click()}
          ><Paperclip size={17} /></button>
          {/* <button
            className={`btn ${styles.inputIconButton}`}
            type="button"
            aria-label={isAmharic ? 'ምስል ያያይዙ' : 'Attach an image'}
            title={isAmharic ? 'ምስል ያያይዙ' : 'Attach an image'}
            onClick={() => imageInput.current?.click()}
          ><Image size={17} /></button> */}
          <button className={`btn ${styles.inputIconButton} ${isListening ? styles.listening : ''}`} type="button" aria-label={isAmharic ? 'በድምፅ ይናገሩ' : 'Use voice input'} aria-pressed={isListening} onClick={toggleVoiceInput}><Mic size={20} /></button>
          <button className={`btn btn-primary ${styles.sendButton}`} type="submit" disabled={!value.trim() || isTyping} aria-label={isAmharic ? 'መልእክት ይላኩ' : 'Send message'}>
            {isTyping ? <LoaderCircle className={`${styles.spin}`} size={18} /> : <SendHorizontal size={18} />}
          </button>
        </div>
      </div>
      {selectedFile && (
        <div className={styles.attachmentChip}>
          <span className={styles.attachmentName} title={selectedFile.name}>
            {selectedFile.name}
          </span>
          <button
            className={styles.removeAttachment}
            type="button"
            aria-label={isAmharic ? 'የተያያዘውን ፋይል አስወግድ' : 'Remove attached file'}
            onClick={() => setSelectedFile(null)}
          ><X size={14} /></button>
        </div>
      )}
      <span className={`${styles.inputHint}`}>{voiceError
        ? (isAmharic ? 'የድምፅ ግቤት በዚህ አሳሽ አይደገፍም' : 'Voice input is not supported in this browser')
        : isListening
          ? (isAmharic ? 'ድምፅዎን በመጠበቅ ላይ' : 'Listening...')
          : (isAmharic ? 'ለመመሪያ PDF፣ Word ሰነድ ወይም ምስል ያያይዙ።' : 'Attach a PDF, Word document, or image for guidance.')}</span>
    </form>
    </div>
  )
}

export default ChatInput
