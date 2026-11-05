import PublicServicePage from "./pages/PublicServicePage.jsx";
import styles from "./App.module.css";
import LanguageProvider from "./context/LanguageProvider.jsx";

function App() {
  return (
    <LanguageProvider>
      <div className={`container-fluid p-0 ${styles.appRoot}`}>
        <PublicServicePage />
      </div>
    </LanguageProvider>
  );
}

export default App;
