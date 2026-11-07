import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowUpRight, BookOpen, Clock3, FileText, Search } from 'lucide-react'
import styles from './ArticlesPage.module.css'
import { useLanguage } from '../context/useLanguage.js'

const articles = [
  {
    id: 'passport',
    category: 'Passport',
    title: 'Applying for your first Ethiopian passport',
    summary: 'A guide to the documents, appointments, and steps required to submit an application.',
    minutes: 5,
    steps: ['Prepare a valid Ethiopian ID and proof of citizenship.', 'Complete the application and book an appointment through the official immigration service.', 'Bring your original documents to the appointment and confirm fees in advance.'],
  },
  {
    id: 'trade',
    category: 'Business',
    title: 'Renewing a business license',
    summary: 'Understand common renewal requirements and where to find local guidance.',
    minutes: 4,
    steps: ['Confirm that your business registration is active and your information is up to date.', 'Request current tax clearance from the relevant revenue authority.', 'Submit the renewal application and fee to your local trade office.'],
  },
  {
    id: 'land',
    category: 'Land',
    title: 'Land registration guide',
    summary: 'Learn how to prepare ownership documents and contact the appropriate office.',
    minutes: 6,
    steps: ['Prepare your ID and all ownership or transfer documents.', 'Contact the local land administration office responsible for the property.', 'Ask the office to confirm the land record, required forms, and fees.'],
  },
  {
    id: 'tax',
    category: 'Tax',
    title: 'Tax filing and payment basics',
    summary: 'Find official guidance for tax filing, payments, and deadlines.',
    minutes: 5,
    steps: ['Identify your taxpayer category and the tax periods that apply to you.', 'Confirm filing obligations through the official revenue authority.', 'Before paying, check deadlines and approved payment methods.'],
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'passport', label: 'Passport' },
  { id: 'trade', label: 'Business' },
  { id: 'land', label: 'Land' },
  { id: 'tax', label: 'Tax' },
]

const amharicArticles = {
  passport: {
    category: 'ፓስፖርት',
    title: 'ለመጀመሪያ ጊዜ የኢትዮጵያ ፓስፖርት ማመልከት',
    summary: 'ማመልከቻ ለማቅረብ ስለሚያስፈልጉ ሰነዶች፣ ቀጠሮዎች እና ሂደቱ የሚያብራራ መመሪያ።',
    steps: ['ትክክለኛ የኢትዮጵያ መታወቂያ እና የዜግነት ማረጋገጫ ያዘጋጁ።', 'በይፋዊው የኢሚግሬሽን አገልግሎት ማመልከቻውን ይሙሉ እና ቀጠሮ ይያዙ።', 'የመጀመሪያ ሰነዶችን ይዘው በቀጠሮው ይገኙ፤ ክፍያውን አስቀድመው ያረጋግጡ።'],
  },
  trade: {
    category: 'ንግድ',
    title: 'የንግድ ፈቃድ ማደስ',
    summary: 'የእድሳት መስፈርቶችን እና የአካባቢውን የመረጃ ምንጭ ይረዱ።',
    steps: ['የንግድ ምዝገባዎ ንቁ መሆኑን እና መረጃዎ ወቅታዊ መሆኑን ያረጋግጡ።', 'ከሚመለከተው የገቢዎች ባለሥልጣን ወቅታዊ የታክስ ማጽዳት ይጠይቁ።', 'የእድሳት ማመልከቻውን እና ክፍያውን ለአካባቢዎ የንግድ ጽሕፈት ቤት ያቅርቡ።'],
  },
  land: {
    category: 'መሬት',
    title: 'የመሬት ምዝገባ መመሪያ',
    summary: 'የባለቤትነት ሰነዶችን ማዘጋጀት እና ትክክለኛውን ቢሮ ማግኘት ይማሩ።',
    steps: ['መታወቂያዎን እና ሁሉንም የባለቤትነት ወይም የዝውውር ሰነዶች ያዘጋጁ።', 'ንብረቱን የሚመለከተውን የአካባቢ የመሬት አስተዳደር ቢሮ ያግኙ።', 'ቢሮው የመሬት መዝገብ፣ ቅጾች እና ክፍያዎችን እንዲያረጋግጥ ይጠይቁ።'],
  },
  tax: {
    category: 'ታክስ',
    title: 'የታክስ ማስታወቂያ እና ክፍያ መሠረታዊ መመሪያ',
    summary: 'ለታክስ ማስታወቂያ፣ ክፍያ እና የጊዜ ገደቦች ትክክለኛ ይፋዊ መንገዶችን ያግኙ።',
    steps: ['የግብር ከፋይ ምድብዎን እና የሚመለከቱዎትን የታክስ ጊዜያት ይለዩ።', 'የማስታወቂያ ግዴታዎችዎን በይፋዊው የገቢዎች ባለሥልጣን አገልግሎት ያረጋግጡ።', 'ክፍያ ከመፈጸምዎ በፊት የጊዜ ገደቦችን እና የተፈቀዱ የክፍያ መንገዶችን ያረጋግጡ።'],
  },
}

function ArticlesPage({ onAskQuestion }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const { language } = useLanguage()
  const isAmharic = language === 'am'
  const localizedArticles = useMemo(() => articles.map((article) => ({
    ...article,
    ...(isAmharic ? amharicArticles[article.id] : {}),
  })), [isAmharic])
  const selected = localizedArticles.find((article) => article.id === selectedId)
  const localizedCategories = isAmharic
    ? [{ id: 'all', label: 'ሁሉም' }, ...localizedArticles.map((article) => ({ id: article.id, label: article.category }))]
    : categories

  const filteredArticles = useMemo(() => localizedArticles.filter((article) => {
    const categoryMatches = category === 'all' || article.id === category
    const searchText = `${article.title} ${article.summary} ${article.category}`.toLowerCase()
    return categoryMatches && searchText.includes(query.toLowerCase())
  }), [category, localizedArticles, query])

  return (
    <div className={styles.scope}>
      <section className={styles.articlesScreen}>
        {selected ? (
          <div className={styles.articleDetail}>
            <button className={`btn ${styles.backToArticles}`} type="button" onClick={() => setSelectedId(null)}><ArrowLeft size={16} /> {isAmharic ? 'ወደ መመሪያዎች ይመለሱ' : 'Back to guides'}</button>
            <span className={styles.detailCategory}>{selected.category}</span>
            <h2>{selected.title}</h2>
            <p className={styles.detailSummary}>{selected.summary}</p>
            <div className={styles.detailMeta}><Clock3 size={14} /> {selected.minutes} {isAmharic ? 'ደቂቃ ማንበብ' : 'min read'}</div>
            <ol className={styles.detailSteps}>
              {selected.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <button className={`btn btn-primary ${styles.detailAsk}`} type="button" onClick={() => onAskQuestion(isAmharic ? `ስለ ${selected.category} ጥያቄ አለኝ` : `I have a question about ${selected.category}`)}>
              {isAmharic ? 'ስለዚህ መመሪያ ጥያቄ ይጠይቁ' : 'Ask about this guide'} <ArrowUpRight size={16} />
            </button>
            <p className={styles.detailNote}>{isAmharic ? 'መስፈርቶች ሊለያዩ ይችላሉ። የቅርብ ጊዜ መረጃን ከሚመለከተው የመንግሥት ቢሮ ያረጋግጡ።' : 'Requirements may vary. Confirm the latest information with the relevant government office.'}</p>
          </div>
        ) : (
          <>
            <div className={styles.articlesIntro}>
              <span className={styles.articlesMark}><BookOpen size={19} /></span>
              <div><p>{isAmharic ? 'ይፋዊ መረጃ' : 'OFFICIAL INFORMATION'}</p><h2>{isAmharic ? 'መመሪያዎችን ያስሱ' : 'Browse service guides'}</h2></div>
            </div>
          
            <div className={styles.categoryFilters} aria-label={isAmharic ? 'መመሪያዎችን ይመድቡ' : 'Filter guides by category'}>
              {localizedCategories.map((item) => <button type="button" key={item.id} className={`btn ${category === item.id ? `btn-primary ${styles.categoryActive}` : 'btn-outline-secondary'}`} onClick={() => setCategory(item.id)}>{item.label}</button>)}
            </div>
            <div className={styles.articleResultsLabel}><span>{isAmharic ? 'የአገልግሎት መመሪያዎች' : 'Service guides'}</span><span>{filteredArticles.length.toString().padStart(2, '0')} {isAmharic ? 'ውጤቶች' : 'results'}</span></div>
            <div className={styles.articleList}>
              {filteredArticles.map((article, index) => (
                <button type="button" className={`btn card ${styles.articleCard}`} key={article.id} onClick={() => setSelectedId(article.id)}>
                  <span className={`${styles[article.id === 'passport' ? 'articleIcon' : `articleIcon${article.id[0].toUpperCase()}${article.id.slice(1)}`]}`}><FileText size={19} /></span>
                  <span className={styles.articleCopy}>
                    <span className={styles.articleCardTop}><span>{article.category}</span><span className={styles.articleIndex}>0{index + 1}</span></span>
                    <strong>{article.title}</strong>
                    <span className={styles.articleSummary}>{article.summary}</span>
                    <span className={styles.articleTime}><Clock3 size={12} /> {article.minutes} {isAmharic ? 'ደቂቃ ማንበብ' : 'min read'}</span>
                  </span>
                  <span className={styles.articleArrow}><ArrowUpRight size={17} /></span>
                </button>
              ))}
              {filteredArticles.length === 0 && <p className={styles.emptyArticles}>{isAmharic ? 'ከፍለጋዎ ጋር የሚዛመድ መመሪያ አልተገኘም። ሌላ ቃል ይሞክሩ።' : 'No guides match your search. Try another term.'}</p>}
            </div>
            <p className={styles.articlesDisclaimer}>{isAmharic ? 'መመሪያዎቹ ለአጠቃላይ መረጃ ናቸው። ይፋዊ መስፈርቶችን ከሚመለከተው የመንግሥት ቢሮ ያረጋግጡ።' : 'These guides provide general information. Confirm official requirements with the relevant government office.'}</p>
          </>
        )}
      </section>
    </div>
  )
}

export default ArticlesPage
