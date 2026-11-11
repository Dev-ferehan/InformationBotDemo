CREATE TABLE services (
    id VARCHAR(50) PRIMARY KEY,     
    color VARCHAR(20) NOT NULL,       
    icon VARCHAR(10) NOT NULL,      
    display_order INT DEFAULT 0      
);
CREATE TABLE service_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id VARCHAR(50) NOT NULL,
    language_code VARCHAR(10) NOT NULL, 
    category VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    prompt TEXT NOT NULL,
    
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE (service_id, language_code)  
);

CREATE TABLE articles (
    id VARCHAR(50) PRIMARY KEY,        
    service_id VARCHAR(50) NOT NULL,    
    minutes INT NOT NULL,             
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE article_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id VARCHAR(50) NOT NULL,
    language_code VARCHAR(10) NOT NULL,
    summary TEXT NOT NULL,              
    steps JSON NOT NULL,              
    
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    UNIQUE (article_id, language_code)
);

CREATE TABLE `constitution_chunks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY, 
  `chunk_text` TEXT NOT NULL,                  
  `embedding` JSON NOT NULL,                    
  `language` VARCHAR(10) DEFAULT 'en',         
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;