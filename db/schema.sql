-- Create database
CREATE DATABASE IF NOT EXISTS valentina_industries;
USE valentina_industries;

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  full_description LONGTEXT NOT NULL,
  image VARCHAR(255),
  logo VARCHAR(255),
  status ENUM('Active', 'Inactive', 'Draft') NOT NULL DEFAULT 'Draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_company_slug (slug),
  INDEX idx_company_status (status)
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  image VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  status ENUM('Published', 'Draft') NOT NULL DEFAULT 'Draft',
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_news_slug (slug),
  INDEX idx_news_category (category),
  INDEX idx_news_date (date),
  INDEX idx_news_status (status)
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_gallery_category (category),
  INDEX idx_gallery_date (date)
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('New', 'In Progress', 'Resolved') NOT NULL DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_inquiry_status (status),
  INDEX idx_inquiry_email (email)
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Finance Manager', 'Content Manager', 'Support Staff') NOT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_email (email),
  INDEX idx_user_role (role),
  INDEX idx_user_status (status)
);

-- Financial records table
CREATE TABLE IF NOT EXISTS financial_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  year VARCHAR(4) NOT NULL,
  quarter ENUM('Q1', 'Q2', 'Q3', 'Q4') NOT NULL,
  revenue DECIMAL(15, 2) NOT NULL,
  expenses DECIMAL(15, 2) NOT NULL,
  profit DECIMAL(15, 2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_financial_company (company_id),
  INDEX idx_financial_year (year),
  INDEX idx_financial_quarter (quarter),
  INDEX idx_financial_date (date)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role, status)
VALUES ('Admin User', 'admin@valentinaindustries.in', '$2a$10$JwZPb5xZdxBZDc.9IyFJz.0zGYO1BLs0hgzeUJv1kKkCzGfzxRIXO', 'Admin', 'Active');

-- Insert sample companies
INSERT INTO companies (name, slug, description, full_description, image, logo, status)
VALUES 
('Phoenix Security', 'phoenix-security', 'Cautious Security and Excellent Service', '<p>We have the pleasure in introducing ourselves as "Phoenix Security and Facility Services" an ISO 9001:2015 certified company which is a part of Malai Industries, to you. We intend to provide high standard services to our impending customers. We owe to maintain a good record of professional services with our customers.</p>', '/placeholder.svg?height=600&width=1200', '/placeholder.svg?height=200&width=200', 'Active'),
('Santosh Bandai Construction', 'santosh-bandai-construction', 'Leading real estate company specializing in high-quality residential communities', '<p>Santosh Bandai Construction LLP is a leading real estate company specializing in the development of high-quality residential communities. With a strong commitment to excellence and a passion for creating vibrant neighbourhoods, we have established ourselves as a trusted name in the housing industry.</p>', '/placeholder.svg?height=600&width=1200', '/placeholder.svg?height=200&width=200', 'Active'),
('Valentina Pharma', 'valentina-pharma', 'Leading pharmaceutical marketing company dedicated to helping clients thrive', '<p>At Valentina Pharma, we are a leading pharmaceutical marketing company dedicated to helping our clients thrive in the ever-evolving healthcare industry. With a deep understanding of the pharmaceutical landscape and a passion for innovation, we provide comprehensive marketing solutions tailored to meet the unique needs of each client.</p>', '/placeholder.svg?height=600&width=1200', '/placeholder.svg?height=200&width=200', 'Active'),
('Valentina Securities', 'valentina-securities', 'Financial Services Corporate engaged in Stock Broking and Trading', '<p>Valentina Securities is a Financial Services Corporate engaged into Stock Broking, Currency Derivatives and Commodity Trading. Valentina Securities has focused for retail stock trading business model, Valentina Securities is committed to provide Real Value for Money to all its clients.</p>', '/placeholder.svg?height=600&width=1200', '/placeholder.svg?height=200&width=200', 'Active');

-- Insert sample news articles
INSERT INTO news (title, slug, excerpt, content, image, category, author, status, date)
VALUES 
('Valentina Group Expands Into New Markets', 'expansion-new-markets', 'Valentina Industries announces expansion into three new international markets...', '<p>Valentina Industries is proud to announce its expansion into three new international markets, marking a significant milestone in the group's global growth strategy. The expansion includes new offices in Singapore, Dubai, and London, strengthening our presence in key financial hubs around the world.</p>', '/placeholder.svg?height=400&width=600', 'Corporate', 'Admin', 'Published', '2023-12-15'),
('Sustainability Initiative Launched', 'sustainability-initiative', 'Our new eco-friendly initiative aims to reduce carbon footprint across all ventures...', '<p>Valentina Industries is proud to announce the launch of our comprehensive sustainability initiative, designed to reduce our carbon footprint across all ventures and contribute to global environmental goals. This ambitious program represents our commitment to responsible business practices and environmental stewardship.</p>', '/placeholder.svg?height=400&width=600', 'CSR', 'John Smith', 'Published', '2023-11-28'),
('Annual Investor Conference Highlights', 'investor-conference', 'Key takeaways from this year's investor conference and future growth plans...', '<p>Valentina Industries recently held its Annual Investor Conference, bringing together shareholders, potential investors, and financial analysts for a comprehensive overview of the group's performance and future strategy. The event, held at our headquarters, featured presentations from leadership across all Valentina companies.</p>', '/placeholder.svg?height=400&width=600', 'Finance', 'Sarah Johnson', 'Published', '2023-10-10');

-- Insert sample gallery items
INSERT INTO gallery (title, category, description, image, date)
VALUES 
('Company Headquarters', 'Offices', 'Main headquarters of Valentina Industries in Pune', '/placeholder.svg?height=600&width=800', '2023-10-15'),
('Annual Meeting 2023', 'Events', 'Annual shareholder meeting held in December 2023', '/placeholder.svg?height=600&width=800', '2023-12-05'),
('Phoenix Security Team', 'Teams', 'The dedicated security professionals at Phoenix Security', '/placeholder.svg?height=600&width=800', '2023-09-20');

-- Insert sample financial records
INSERT INTO financial_records (company_id, year, quarter, revenue, expenses, profit, date)
VALUES 
(1, '2023', 'Q4', 2500000.00, 1800000.00, 700000.00, '2023-12-31'),
(2, '2023', 'Q4', 4200000.00, 3100000.00, 1100000.00, '2023-12-31'),
(3, '2023', 'Q4', 3800000.00, 2500000.00, 1300000.00, '2023-12-31');

-- Insert sample inquiries
INSERT INTO inquiries (name, email, phone, company, subject, message, status)
VALUES 
('Rajesh Kumar', 'rajesh.kumar@example.com', '9876543210', 'ABC Corp', 'Partnership Opportunity', 'I would like to discuss a potential partnership with Valentina Industries in the pharmaceutical sector...', 'New'),
('Priya Sharma', 'priya.sharma@example.com', '8765432109', NULL, 'Job Application', 'I am interested in applying for the Marketing Manager position at Valentina Pharma...', 'In Progress');

