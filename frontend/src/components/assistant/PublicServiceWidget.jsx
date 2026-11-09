import { useEffect, useState } from 'react'
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
  serviceMode,
  setServiceMode,
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
          <div className={`card ${styles.widgetPanel}`}>
            <WidgetHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              serviceMode={serviceMode}
              setServiceMode={setServiceMode}
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
                serviceMode={serviceMode}
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
            <div className={styles.widgetFooter} role="note">
              <strong>{isAmharic ? "አስፈላጊ ማስታወሻ" : "Important notice"}</strong>
              <span>
                {isAmharic
                  ? "AI አጠቃላይ መመሪያና መረጃ ይሰጣል፤ መደበኛ የሕግ ወይም የመንግሥት ውሳኔ አይደለም።"
                  : "AI provides guidance and information, not formal legal advice or government decisions."}
              </span>
            </div>
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
