import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import WidgetHeader from './WidgetHeader.jsx'
import ChatPage from '../../pages/ChatPage.jsx'
import ArticlesPage from '../../pages/ArticlesPage.jsx'
import styles from './PublicServiceWidget.module.css'
import { useLanguage } from '../../context/useLanguage.js'

function PublicServiceWidget({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
  messages,
  onSend,
  onUpload,
  isTyping,
  isListening,
  setIsListening,
}) {
  const { language } = useLanguage()
  const isAmharic = language === 'am'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const widgetPanelRef = useRef(null)
  const previousChatState = useRef({ messageCount: messages.length, isTyping })
  const previousTab = useRef(activeTab)

  useEffect(() => {
    const tabChanged = previousTab.current !== activeTab
    previousTab.current = activeTab
    const chatStateChanged =
      previousChatState.current.messageCount !== messages.length ||
      previousChatState.current.isTyping !== isTyping
    previousChatState.current = { messageCount: messages.length, isTyping }

    if (!isOpen || !widgetPanelRef.current) return

    if (tabChanged && activeTab === 'articles') {
      widgetPanelRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if ((chatStateChanged || tabChanged) && activeTab === 'chat') {
      widgetPanelRef.current.scrollTo({
        top: widgetPanelRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [activeTab, isOpen, isTyping, messages.length])

  useEffect(() => {
    if (!isFullscreen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsFullscreen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  return (
    <div className={styles.scope}>
      <aside
        className={`${styles.assistantWidget} ${isOpen ? styles.widgetOpen : ''} ${isFullscreen && isOpen ? styles.fullscreen : ''}`}
        lang={language}
        aria-label={isAmharic ? 'የመንግሥት አገልግሎት ረዳት' : 'Government Services Assistant'}
        role={isFullscreen && isOpen ? 'dialog' : undefined}
        aria-modal={isFullscreen && isOpen ? 'true' : undefined}
      >
        {isOpen && (
          <div ref={widgetPanelRef} className={`card ${styles.widgetPanel}`}>
            <WidgetHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onClose={() => {
                setIsFullscreen(false)
                setIsOpen(false)
              }}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen((fullscreen) => !fullscreen)}
            />
            {activeTab === 'chat' ? (
              <ChatPage
                messages={messages}
                onSend={onSend}
                onUpload={onUpload}
                isTyping={isTyping}
                isListening={isListening}
                setIsListening={setIsListening}
              />
            ) : (
              <ArticlesPage
                onAskQuestion={(question) => { setActiveTab('chat'); onSend(question) }}
              />
            )}
            <div className={`${styles.widgetFooter}`}><span><span className={`${styles.footerSpark}`}>✳</span> {isAmharic ? 'ለሁሉም ቀላል የመንግሥት አገልግሎት መመሪያ' : 'Clear guidance for government services'}</span></div>
          </div>
        )}
        <button
          className={`btn btn-primary ${styles.widgetToggle}`}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isAmharic ? (isOpen ? 'ረዳቱን ዝጋ' : 'ረዳቱን ክፈት') : (isOpen ? 'Close assistant' : 'Open assistant')}
          aria-expanded={isOpen}
        >
          <MessageCircle size={25} fill="currentColor" />
          {!isOpen && <span className={`${styles.togglePing}`} />}
        </button>
      </aside>
    </div>
  )
}

export default PublicServiceWidget
