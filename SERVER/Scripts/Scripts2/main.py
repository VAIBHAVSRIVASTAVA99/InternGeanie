from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
import pymongo
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "unstop"
COLLECTION_NAME = "internships"

# Credentials from environment variables
USERNAME = os.getenv('UNSTOP_USERNAME')
PASSWORD = os.getenv('UNSTOP_PASSWORD')

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--window-size=1920x1080')
chrome_options.add_argument('--start-maximized')
chrome_options.add_argument('--disable-notifications')

# Initialize WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)
wait = WebDriverWait(driver, 20)
driver.implicitly_wait(20)

# Initialize MongoDB client
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def login_to_unstop():
    """
    Login to Unstop using provided credentials
    """
    try:
        # Navigate to login page
        driver.get("https://unstop.com/auth/login?returnUrl=%2F")
        time.sleep(3)

        # Find and fill email/username field
        email_field = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[name='email']"))
        )
        email_field.clear()
        email_field.send_keys(USERNAME)

        # Find and fill password field
        password_field = driver.find_element(By.CSS_SELECTOR, "input[name='password']")
        password_field.clear()
        password_field.send_keys(PASSWORD)

        # Click login button
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()

        # Wait for login to complete
        time.sleep(5)
        print("Successfully logged in to Unstop")

    except Exception as e:
        print(f"Login Error: {str(e)}")
        driver.save_screenshot("login_error.png")
        raise

def scrape_internships():
    """
    Scrape internships from the specific Unstop URL
    """
    try:
        # Navigate to the specific internships URL
        driver.get("https://unstop.com/internships?oppstatus=open&category=full-stack-development&quickApply=true&usertype=fresher&fresherPassingOutYear=2027")
        time.sleep(5)

        # Scroll to load more internships
        last_height = driver.execute_script("return document.body.scrollHeight")
        while True:
            # Scroll down to bottom
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            
            # Wait to load page
            time.sleep(3)
            
            # Calculate new scroll height and compare with last scroll height
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        # Wait for internships to load
        internship_cards = wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.user_img.opp_content"))
        )
        
        if not internship_cards:
            print("No internships found!")
            return

        print(f"Found {len(internship_cards)} internships")
        
        for card in internship_cards:
            try:
                # Extract internship title
                title = card.find_element(By.CSS_SELECTOR, "h2.double-wrap").text.strip()
                
                # Extract company name0111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                try:
                    company = card.find_element(By.CSS_SELECTOR, "p").text.strip()
                except:
                    company = "Not specified"
                
                # Extract number of applicants
                try:
                    applicants_elem = card.find_element(By.CSS_SELECTOR, "div.seperate_box.align-center .ng-star-inserted")
                    applicants = applicants_elem.text.strip().split()[0]
                except:
                    applicants = "N/A"
                
                # Extract days left
                try:
                    days_left_elem = card.find_elements(By.CSS_SELECTOR, "div.seperate_box.align-center")[1]
                    days_left = days_left_elem.text.strip().split()[0]
                except:
                    days_left = "N/A"
                
                # Extract skills/eligibility
                try:
                    skills = [
                        skill.text.strip() 
                        for skill in card.find_elements(By.CSS_SELECTOR, "un-chip-items .chip_text")
                    ]
                except:
                    skills = []
                
                # Prepare data for MongoDB
                raw_data = {
                    "title": title,
                    "company": company,
                    "applicants": applicants,
                    "days_left": days_left,
                    "skills": skills,
                    "category": "Full Stack Development"
                }
                
                # Check if internship already exists to avoid duplicates
                existing = collection.find_one({
                    "title": title, 
                    "company": company
                })
                
                if not existing:
                    # Insert into MongoDB
                    collection.insert_one(raw_data)
                    print(f"Stored in DB: {title} at {company}")
                else:
                    print(f"Skipped duplicate: {title} at {company}")
                
            except Exception as e:
                print(f"Error processing internship card: {str(e)}")
                continue
    
    except Exception as e:
        print(f"Search Error: {str(e)}")
        driver.save_screenshot("search_error.png")
        raise

def main():
    try:
        # Login first
        login_to_unstop()

        # Scrape internships
        scrape_internships()
    
    except Exception as e:
        print(f"Main Error: {str(e)}")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()