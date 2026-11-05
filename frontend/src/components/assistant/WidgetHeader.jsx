import { Languages, Landmark, Maximize2, Minimize2, X } from 'lucide-react'
import styles from './WidgetHeader.module.css'
import { useLanguage } from '../../context/useLanguage.js'

function WidgetHeader({ activeTab, setActiveTab, onClose, isFullscreen, onToggleFullscreen }) {
  const { language, toggleLanguage } = useLanguage()
  const isAmharic = language === 'am'

  return (
    <div className={styles.scope}>
    <header className={`card-header ${styles.widgetHeader}`}>
      <div className={`${styles.widgetBrandRow}`}>
        <div className={`${styles.widgetBrandMark}`}><Landmark size={20} strokeWidth={2.5} /></div>
        <div className={`${styles.widgetBrandCopy}`}>
          <strong>{isAmharic ? 'የመንግሥት አገልግሎት መመሪያ' : 'Government Services Guide'}</strong>
        </div>
   
        <button
          className={`${styles.widgetAction}`}
          type="button"
          aria-label={isAmharic ? (isFullscreen ? 'ሙሉ ማያ ገጽን ዝጋ' : 'ሙሉ ማያ ገጽ') : (isFullscreen ? 'Exit full screen' : 'Enter full screen')}
          aria-pressed={isFullscreen}
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
        </button>
        <button className={`${styles.widgetClose}`} type="button" aria-label={isAmharic ? 'ረዳቱን ዝጋ' : 'Close assistant'} onClick={onClose}><X size={20} /></button>
      </div>
      <div className={`nav nav-pills ${styles.widgetTabbar}`} role="tablist" aria-label={isAmharic ? 'የረዳቱ ክፍሎች' : 'Assistant sections'}>
        <button
          type="button"
          className={`nav-link ${styles.widgetTab} ${activeTab === 'chat' ? `${styles.tabActive} active` : ''}`}
          role="tab"
          aria-selected={activeTab === 'chat'}
          onClick={() => setActiveTab('chat')}
        >{isAmharic ? 'ውይይት' : 'Chat'}</button>
        <button
          type="button"
          className={`nav-link ${styles.widgetTab} ${activeTab === 'articles' ? `${styles.tabActive} active` : ''}`}
          role="tab"
          aria-selected={activeTab === 'articles'}
          onClick={() => setActiveTab('articles')}
        >{isAmharic ? 'መመሪያዎች' : 'Guides'}</button>
      </div>
    </header>
    </div>
  )
}

export default WidgetHeader
