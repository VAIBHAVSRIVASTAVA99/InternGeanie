from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pymongo

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "internshala"
COLLECTION_NAME = "internships"

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--window-size=1920x1080')
chrome_options.add_argument('--start-maximized')
chrome_options.add_argument('--disable-notifications')

# Initialize WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)
wait = WebDriverWait(driver, 10)
driver.implicitly_wait(10)

# Initialize MongoDB client
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def search_internships(category):
    try:
        print(f"Navigating to {category} internships page...")
        driver.get(f"https://internshala.com/internships/{category}")
        time.sleep(5)

        # Wait for internships to load
        internships = wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.individual_internship"))
        )
        
        if not internships:
            print("No internships found!")
            return

        print(f"Found {len(internships)} internships")
        for internship in internships:
            try:
                title = internship.find_element(By.CSS_SELECTOR, "a.job-title-href").text.strip()
                company = internship.find_element(By.CSS_SELECTOR, "p.company-name").text.strip()
                location = internship.find_element(By.CSS_SELECTOR, "div.row-1-item.locations span a").text.strip()
                duration = internship.find_element(By.CSS_SELECTOR, "div.row-1-item:nth-child(2) span").text.strip()
                stipend = internship.find_element(By.CSS_SELECTOR, "span.stipend").text.strip()
                
                raw_data = {
                    "title": title,
                    "company": company,
                    "location": location,
                    "duration": duration,
                    "stipend": stipend,
                    "category": category
                }
                
                # Insert into MongoDB
                collection.insert_one(raw_data)
                print(f"Stored in DB: {title} at {company}")
                
            except Exception as e:
                print(f"Error processing internship: {str(e)}")
                continue
    
    except Exception as e:
        print(f"Error during search: {str(e)}")
        driver.save_screenshot("search_error.png")
        raise

def main():
    try:
        category = "web-development-internship"
        search_internships(category)
    except Exception as e:
        print(f"Main error: {str(e)}")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
