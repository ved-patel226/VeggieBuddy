from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    StaleElementReferenceException,
    NoSuchElementException,
)

import time


class VeggieBuddyScraper:
    def __init__(self, place_id):
        self.url = f"https://www.google.com/maps/place/?q=place_id:{place_id}"
        self.driver = self._get_driver()

    def _get_driver(self):
        options = Options()
        options.add_argument("--disable-gpu")
        options.add_argument("--headless")
        driver = webdriver.Chrome(options=options)
        driver.get(self.url)
        time.sleep(1)

        return driver

    # Selecting "Menu" from "Overview", "Menu", "Reviews", and "About"
    def get_menu_button(self):
        wait = WebDriverWait(self.driver, 0.01)
        menu_button = wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//div[contains(@class, 'NlVald') and text()='Menu']")
            )
        )
        return menu_button

    # Getting the menu options (different for every resturuant)
    def get_all_menu_options(self):
        # 0.01s is more stable than 0 seconds for some reason
        wait = WebDriverWait(self.driver, 0.01)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".RWPxGd")))

        buttons = self.driver.find_elements(
            By.CSS_SELECTOR,
            ".RWPxGd",
        )

        if len(buttons) < 1:
            return []  # Some restaurants might only have one menu

        # Return all elements in buttons[1] which aren't selected
        try:
            menu_items = buttons[1].find_elements(By.XPATH, "./*")
            filtered_items = [
                el
                for el in menu_items
                if "G7m0Af" not in el.get_attribute("class").split()
            ]
            return filtered_items
        except IndexError:
            # If there's only one menu section, return empty list
            return []

    def get_items(self):
        wait = WebDriverWait(self.driver, 0.01)
        wait.until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, ".m6QErb.Pf6ghf.XiKgde.ecceSd.tLjsW.XDi3Bc")
            )
        )

        items = []
        elements = self.driver.find_elements(
            By.CSS_SELECTOR, ".m6QErb.Pf6ghf.XiKgde.ecceSd.tLjsW.XDi3Bc"
        )

        for element in elements:
            try:
                item_details = self.get_item_details(element)
                if item_details:
                    items.append(item_details)
            except (StaleElementReferenceException, NoSuchElementException) as e:
                # Skip this element if it's stale
                print(f"Skipping stale element: {str(e)}")
                continue

        return items

    def get_item_details(self, element):
        try:
            text_part = element.find_element(By.CSS_SELECTOR, ".rogA2c")
            price = element.find_element(By.CSS_SELECTOR, ".Cpt1Qd")

            return [text_part.text.strip(), price.text.strip()]
        except (StaleElementReferenceException, NoSuchElementException) as e:
            # Some menu items might not have prices
            # Try to get just the text
            try:
                text_part = element.find_element(By.CSS_SELECTOR, ".rogA2c")
                return [text_part.text.strip(), "Price not available"]
            except (StaleElementReferenceException, NoSuchElementException):
                return None

    def click_element(self, element):
        try:
            element.click()
        except StaleElementReferenceException:
            # Try to find the element again if it's stale
            print("Element became stale, retrying...")
            # This is a simplified retry - might need more context-specific handling

    def scrape(self):
        try:
            menu_button = self.get_menu_button()
            self.click_element(menu_button)

            menu_options = self.get_all_menu_options()

            items = []

            if not menu_options:
                # If no menu options, just get items from the main menu
                items.extend(self.get_items())
            else:
                for menu in menu_options:
                    try:
                        self.click_element(menu)
                        items.extend(self.get_items())
                    except StaleElementReferenceException:
                        print(f"Menu option became stale, skipping")
                        continue

            return items
        finally:
            # Clean up
            self.driver.quit()


if __name__ == "__main__":
    url = "ChIJVZRotpf0wokRYqbfByWZ5uo"
    scraper = VeggieBuddyScraper(url)
    items = scraper.scrape()
    print(items)
