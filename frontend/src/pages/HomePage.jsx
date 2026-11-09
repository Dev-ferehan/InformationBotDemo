import {
  BriefcaseBusiness,
  FileText,
  Languages,
  ArrowDown,
  ArrowUpRight,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { useLanguage } from "../context/useLanguage.js";
import { governmentalService } from "../services/service.service.js";

function HomePage({ onOpenGuidelines, onAskQuestion }) {
  const [services, setServices] = useState([]);
  const { language, toggleLanguage } = useLanguage();
  const isAmharic = language === "am";
  const fallbackServices = [
    {
      icon: <FileText size={21} />,
      category: isAmharic ? "ፓስፖርት" : "PASSPORTS",
      title: isAmharic ? "የፓስፖርት አገልግሎቶች" : "Passport services",
      description: isAmharic
        ? "ማመልከቻ፣ እድሳት እና መስፈርቶች"
        : "Applications, renewals, and requirements",
      prompt: "How do I apply for a passport?",
      color: "blue",
    },
    {
      icon: <BriefcaseBusiness size={21} />,
      category: isAmharic ? "ንግድ" : "BUSINESS",
      title: isAmharic ? "ንግድ እና ፈቃድ" : "Business and licensing",
      description: isAmharic
        ? "ፈቃዶች፣ ምዝገባ እና ማረጋገጫ"
        : "Licenses, registration, and verification",
      prompt: "How do I renew a business license?",
      color: "yellow",
    },
    {
      icon: <MapPin size={21} />,
      category: isAmharic ? "መሬት" : "LAND",
      title: isAmharic ? "የመሬት ምዝገባ" : "Land registration",
      description: isAmharic
        ? "ባለቤትነት፣ መዝገቦች እና ሂደቶች"
        : "Ownership, records, and procedures",
      prompt: "How do I register land?",
      color: "green",
    },
  ];
  const serviceCards = services.length ? services : fallbackServices;

  useEffect(() => {
    const fetchServiceData = async () => {
      setServices([]);
      try {
        const result =
          await governmentalService.getGovernmentalService(language);
        if (Array.isArray(result)) setServices(result);
      } catch (error) {
        console.error("error happen:", error);
      }
    };

    fetchServiceData();
  }, [language]);

  return (
    <div className={styles.scope}>
      <main className={`container ${styles.siteShell}`}>
        <header
          className={`${styles.siteNav} d-flex align-items-center justify-content-between`}
        >
          <a
            className={`${styles.brandLockup}`}
            href="#home"
            aria-label={
              isAmharic ? "የመንግሥት አገልግሎት መመሪያ" : "Government Services Guide"
            }
          >
            <span className={`${styles.brandMark}`}>
              <Landmark size={21} strokeWidth={2.5} />
            </span>
            <span className={`${styles.brandName}`}>
              {isAmharic ? "የሕዝብ መመሪያ" : "Public Service Guide"}
            </span>
          </a>
          <div className={`${styles.navRight} d-flex align-items-center`}>
            <button
              className={styles.languageToggle}
              type="button"
              onClick={toggleLanguage}
              aria-label={
                isAmharic ? "Switch language to English" : "ቋንቋውን ወደ አማርኛ ቀይር"
              }
              title={isAmharic ? "Switch to English" : "ወደ አማርኛ ቀይር"}
            >
              <Languages size={16} aria-hidden="true" />
              <span>አማርኛ / English</span>
            </button>
          </div>
        </header>

        <section
          className={`${styles.heroSection} row align-items-center`}
          id="home"
        >
          <div className={`${styles.heroCopy} col-12 col-md-7`}>
            <p className={`${styles.eyebrow}`}>
              <span className={`${styles.eyebrowLine}`} />
              {isAmharic ?
                "የዕለት ተዕለት የመንግሥት አገልግሎት መመሪያዎ"
              : "YOUR EVERYDAY GUIDE TO PUBLIC SERVICES"}
            </p>
            <h1>
              {isAmharic ?
                <>
                  የመንግሥት አገልግሎቶች፣
                  <br />
                  <span>በቀላሉ።</span>
                </>
              : <>
                  Government services,
                  <br />
                  <span>made simple.</span>
                </>
              }
            </h1>
            <p className={`${styles.heroDescription}`}>
              {isAmharic ?
                "ለሚያስፈልጉዎት አገልግሎቶች ግልጽና አስተማማኝ መረጃ። ጥያቄ ይጠይቁ ወይም ይፋዊ መመሪያዎችን በአንድ ቦታ ይመልከቱ።"
              : "Clear, reliable information for the services you need. Ask a question or explore official guides, all in one place."
              }
            </p>
            <button
              className={`btn btn-primary ${styles.heroCta}`}
              type="button"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {isAmharic ? "አገልግሎቶችን ይመልከቱ" : "Explore services"}
              <ArrowDown size={17} />
            </button>
            <div className={`${styles.heroProof}`}>
              <span className={`${styles.proofAvatars}`}>
                <i>{isAmharic ? "ኢ" : "PS"}</i>
                <i>{isAmharic ? "ኢት" : "GS"}</i>
                <i>
                  <ShieldCheck size={14} />
                </i>
              </span>
              <span>
                {isAmharic ?
                  "አስተማማኝ መመሪያ · ለሁሉም"
                : "Trusted guidance · For everyone"}
              </span>
            </div>
          </div>
          <div
            className={`${styles.heroArt} col-12 col-md-5`}
            aria-hidden="true"
          >
            <div className={`${styles.artSun}`} />
            <div className={`${styles.artDoodle} ${styles.doodleOne}`}>✳</div>
            <div className={`${styles.artDoodle} ${styles.doodleTwo}`}>✳</div>
            <div className={`${styles.artPaper}`}>
              <span className={`${styles.paperStamp}`}>
                <Landmark size={24} />
              </span>
              <span className={`${styles.paperLines}`}>
                <i />
                <i />
                <i />
              </span>
              <span className={`${styles.paperSeal}`}>
                {isAmharic ? "ኢትዮጲያ" : "ETHIOPIA"}
              </span>
            </div>
            <div className={`${styles.artOrbit}`} />
            <div className={`${styles.artOrbit} ${styles.orbitTwo}`} />
            <span className={`${styles.artCaption}`}>
              <Sparkles size={14} />{" "}
              {isAmharic ? "ቀጣዩ እርምጃዎ ግልጽ ይሁን" : "Make your next step clear"}
            </span>
          </div>
        </section>

        <section
          className={`${styles.servicesSection} container-fluid px-0`}
          id="services"
        >
          <div className={`${styles.sectionHeading}`}>
            <div>
              <p className={`${styles.eyebrow}`}>
                <span className={`${styles.eyebrowLine}`} />
                {isAmharic ? "ታዋቂ አገልግሎቶች" : "POPULAR SERVICES"}
              </p>
              <h2>
                {isAmharic ?
                  "ለሚቀጥለው እርምጃዎ ግልጽ መልሶች።"
                : "Clear answers for your next step."}
              </h2>
            </div>
            <button
              className={`btn ${styles.viewAll}`}
              type="button"
              onClick={onOpenGuidelines}
            >
              {isAmharic ? "ሁሉንም መመሪያዎች ይመልከቱ" : "Browse all guides"}{" "}
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* cards  */}
          <div className={`${styles.serviceGrid} row g-3`}>
            {serviceCards.map((service, index) => {
              return (
                <div className="col-12 col-sm-6 col-xl-3" key={service.color}>
                  <button
                    className={`btn card ${styles.serviceCard} ${styles[`service${service.color[0].toUpperCase()}${service.color.slice(1)}`]} w-100 h-100`}
                    type="button"
                    onClick={() => onAskQuestion(service.prompt)}
                  >
                    <span className={`${styles.serviceTopline}`}>
                      <span className={`${styles.serviceIcon}`}>
                        {service.icon}
                      </span>
                      <span className={`${styles.serviceNumber}`}>
                        0{index + 1}
                      </span>
                    </span>
                    <span className={`${styles.serviceCategory}`}>
                      {service.category}
                    </span>
                    <span className={`${styles.serviceTitle}`}>
                      {service.title}
                    </span>
                    <span className={`${styles.serviceDescription}`}>
                      {service.description}
                    </span>
                    <span className={`${styles.serviceArrow}`}>
                      <ArrowUpRight size={19} />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className={`${styles.trustStrip} d-flex align-items-center`}>
          <div className={`${styles.trustIcon}`}>
            <ShieldCheck size={21} />
          </div>
          <div>
            <h3>{isAmharic ? "አስተማማኝ መመሪያ" : "Trusted guidance"}</h3>
            <p>
              {isAmharic ?
                "በግልጽና ቀላል መረጃ የመንግሥት አገልግሎቶችን ያግኙ።"
              : "Find public services with clear, straightforward information."}
            </p>
          </div>
          <span className={`${styles.trustTag}`}>
            {isAmharic ? "ኢትዮጵያ" : "ETHIOPIA"}
          </span>
        </section>

        <footer className={`${styles.siteFooter}`}>
          <span className={`${styles.footerBrand}`}>
            <Landmark size={15} />{" "}
            {isAmharic ? "የሕዝብ መመሪያ" : "Public Service Guide"}
          </span>
          <span>
            {isAmharic ?
              "የመንግሥት አገልግሎቶችን ለሁሉም ቀላል ለማድረግ የተዘጋጀ።"
            : "Making government services easier for everyone."}
          </span>
          <span>©2026</span>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
