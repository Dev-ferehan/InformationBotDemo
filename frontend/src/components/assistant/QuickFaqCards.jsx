import { ArrowUpRight } from 'lucide-react'
import styles from './QuickFaqCards.module.css'
import { useLanguage } from '../../context/useLanguage.js'

const faqs = {
  en: [
    { question: 'What do I need to apply for a passport?', prompt: 'What do I need to apply for a passport?', category: 'Passport' },
    { question: 'How do I renew a business license?', prompt: 'How do I renew a business license?', category: 'Business' },
    { question: 'How do I register land?', prompt: 'How do I register land?', category: 'Land' },
    { question: 'Where can I find tax payment information?', prompt: 'Where can I find tax payment information?', category: 'Tax' },
  ],
  am: [
    { question: 'ፓስፖርት ለማውጣት ምን ያስፈልጋል?', prompt: 'ፓስፖርት ለማውጣት ምን ያስፈልጋል?', category: 'ፓስፖርት' },
    { question: 'የንግድ ፈቃድ እንዴት እታደሳለሁ?', prompt: 'የንግድ ፈቃድ እንዴት እታደሳለሁ?', category: 'ንግድ' },
    { question: 'መሬት እንዴት እመዘግባለሁ?', prompt: 'መሬት እንዴት እመዘግባለሁ?', category: 'መሬት' },
    { question: 'የታክስ ክፍያ መረጃ የት አገኛለሁ?', prompt: 'የታክስ ክፍያ መረጃ የት አገኛለሁ?', category: 'ታክስ' },
  ],
}

function QuickFaqCards({ onSelect }) {
  const { language } = useLanguage()

  return (
    <div className={styles.scope}>
      <div className={styles.quickFaqs}>
        <div className={styles.faqHeading}>
          <span>{language === 'am' ? 'በብዛት የሚጠየቁ ጥያቄዎች' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          <span className={styles.faqHeadingLine} />
        </div>
        <div className={styles.faqGrid}>
          {faqs[language].map((faq, index) => (
            <button type="button" className={`btn ${styles.faqCard}`} key={faq.category} onClick={() => onSelect(faq.prompt)}>
              <span className={styles.faqCardTop}><span className={styles.faqIndex}>0{index + 1}</span><span className={styles.faqCategory}>{faq.category}</span></span>
              <span className={styles.faqQuestion}>{faq.question}</span>
              <span className={styles.faqArrow}><ArrowUpRight size={16} /></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickFaqCards
