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
