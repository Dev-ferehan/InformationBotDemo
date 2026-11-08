import { useMemo, useState } from "react";
import { governmentalService } from "../services/service.service.js";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Clock3,
  FileText,
  Search,
} from "lucide-react";
import styles from "./ArticlesPage.module.css";
import { useLanguage } from "../context/useLanguage.js";
import { useEffect } from "react";

function ArticlesPage({ onAskQuestion }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [articles, setArticle] = useState([]);
  const { language } = useLanguage();
  const isAmharic = language === "am";
  useEffect(() => {
    const fetchArticle = async () => {
      const result = await governmentalService.fetchArticle(language);
      setArticle(result);
    };
    fetchArticle();
  }, [language]);

  const selected = articles.find((article) => article.id === selectedId);

  const localizedCategories = [
    { id: "all", label: "All" },
    ...articles.map((article) => ({
      id: article.id,
      label: article.category_label,
    })),
  ];

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const categoryMatches = category === "all" || article.id === category;

        return categoryMatches;
      }),
    [category, articles, query],
  );

  return (
    <div className={styles.scope}>
      <section className={styles.articlesScreen}>
        {selected ?
          <div className={styles.articleDetail}>
            <button
              className={`btn ${styles.backToArticles}`}
              type="button"
              onClick={() => setSelectedId(null)}
            >
              <ArrowLeft size={16} />{" "}
              {isAmharic ? "ወደ መመሪያዎች ይመለሱ" : "Back to guides"}
            </button>
            <span className={styles.detailCategory}>
              {selected.category_label}
            </span>
            <h2>{selected.title}</h2>
            <p className={styles.detailSummary}>{selected.summary}</p>
            <div className={styles.detailMeta}>
              <Clock3 size={14} /> {selected.minutes}{" "}
              {isAmharic ? "ደቂቃ ማንበብ" : "min read"}
            </div>
            <ol className={styles.detailSteps}>
              {selected.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <button
              className={`btn btn-primary ${styles.detailAsk}`}
              type="button"
              onClick={() =>
                onAskQuestion(
                  isAmharic ?
                    `ስለ ${selected.category_label} ጥያቄ አለኝ`
                  : `I have a question about ${selected.category_label}`,
                )
              }
            >
              {isAmharic ? "ስለዚህ መመሪያ ጥያቄ ይጠይቁ" : "Ask about this guide"}{" "}
              <ArrowUpRight size={16} />
            </button>
            <p className={styles.detailNote}>
              {isAmharic ?
                "መስፈርቶች ሊለያዩ ይችላሉ። የቅርብ ጊዜ መረጃን ከሚመለከተው የመንግሥት ቢሮ ያረጋግጡ።"
              : "Requirements may vary. Confirm the latest information with the relevant government office."
              }
            </p>
          </div>
        : <>
            <div className={styles.articlesIntro}>
              <span className={styles.articlesMark}>
                <BookOpen size={19} />
              </span>
              <div>
                <p>{isAmharic ? "ይፋዊ መረጃ" : "OFFICIAL INFORMATION"}</p>
                <h2>{isAmharic ? "መመሪያዎችን ያስሱ" : "Browse service guides"}</h2>
              </div>
            </div>

            <div
              className={styles.categoryFilters}
              aria-label={
                isAmharic ? "መመሪያዎችን ይመድቡ" : "Filter guides by category"
              }
            >
              {localizedCategories.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`btn ${category === item.id ? `btn-primary ${styles.categoryActive}` : "btn-outline-secondary"}`}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className={styles.articleResultsLabel}>
              <span>{isAmharic ? "የአገልግሎት መመሪያዎች" : "Service guides"}</span>
              <span>
                {filteredArticles.length.toString().padStart(2, "0")}{" "}
                {isAmharic ? "ውጤቶች" : "results"}
              </span>
            </div>
            <div className={styles.articleList}>
              {filteredArticles.map((article, index) => (
                <button
                  type="button"
                  className={`btn card ${styles.articleCard}`}
                  key={article.id}
                  onClick={() => setSelectedId(article.id)}
                >
                  <span
                    className={`${
                      styles[
                        article.id === "passport-guide" ? "articleIcon"
                        : article.id === "land-guide" ? "articleIconLand"
                        : article.id === "tax-guide" ? "articleIconTax"
                        : article.id === "trade-guide" ? "articleIconTrade"
                        : "articleIcon "
                      ]
                    }`}
                  >
                    <FileText size={19} />
                  </span>
                  <span className={styles.articleCopy}>
                    <span className={styles.articleCardTop}>
                      <span>{article.category_label}</span>
                      <span className={styles.articleIndex}>0{index + 1}</span>
                    </span>
                    <strong>{article.title}</strong>
                    <span className={styles.articleSummary}>
                      {article.summary}
                    </span>
                    <span className={styles.articleTime}>
                      <Clock3 size={12} /> {article.minutes}{" "}
                      {isAmharic ? "ደቂቃ ማንበብ" : "min read"}
                    </span>
                  </span>
                  <span className={styles.articleArrow}>
                    <ArrowUpRight size={17} />
                  </span>
                </button>
              ))}
              {filteredArticles.length === 0 && (
                <p className={styles.emptyArticles}>
                  {isAmharic ?
                    "ከፍለጋዎ ጋር የሚዛመድ መመሪያ አልተገኘም። ሌላ ቃል ይሞክሩ።"
                  : "No guides match your search. Try another term."}
                </p>
              )}
            </div>
            <p className={styles.articlesDisclaimer}>
              {isAmharic ?
                "መመሪያዎቹ ለአጠቃላይ መረጃ ናቸው። ይፋዊ መስፈርቶችን ከሚመለከተው የመንግሥት ቢሮ ያረጋግጡ።"
              : "These guides provide general information. Confirm official requirements with the relevant government office."
              }
            </p>
          </>
        }
      </section>
    </div>
  );
}

export default ArticlesPage;
