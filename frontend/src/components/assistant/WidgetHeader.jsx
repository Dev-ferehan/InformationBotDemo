import { BookOpen, Landmark, Maximize2, Minimize2, X } from 'lucide-react'
import styles from './WidgetHeader.module.css'
import { useLanguage } from '../../context/useLanguage.js'

function WidgetHeader({ activeTab, setActiveTab, serviceMode, setServiceMode, onClose, isFullscreen, onToggleFullscreen }) {
  const { language } = useLanguage()
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
      <div className={styles.widgetTabRow}>
        <div className={`nav nav-pills `} role="tablist" aria-label={isAmharic ? 'የአገልግሎት አይነት' : 'Service category'}>
        <button
          type="button"
          className={`${styles.guidesButton} ${activeTab === 'chat' && serviceMode === 'services' ? `${styles.tabActive} active` : ''}`}
          role="tab"
          aria-selected={activeTab === 'chat' && serviceMode === 'services'}
          onClick={() => { setServiceMode('services'); setActiveTab('chat') }}
        >{isAmharic ? 'የመንግሥት አገልግሎቶች' : 'Government Services'}</button>
        <button
          type="button"
          className={`${styles.guidesButton} ${activeTab === 'chat' && serviceMode === 'legal' ? `${styles.tabActive} active` : ''}`}
          role="tab"
          aria-selected={activeTab === 'chat' && serviceMode === 'legal'}
          onClick={() => { setServiceMode('legal'); setActiveTab('chat') }}
        >{isAmharic ? 'የሕግ ምክክር ' : 'Legal Consultation '}
        </button>
        <button
          className={styles.guidesButton}
          type="button"
          aria-label={isAmharic ? 'መመሪያዎች' : 'Guides'}
          onClick={() => setActiveTab('articles')}
        ><BookOpen size={16} /><span>{isAmharic ? 'መመሪያዎች' : 'Guides'}</span></button>
        </div>
    
      </div>
    </header>
    </div>
  )
}

export default WidgetHeader
