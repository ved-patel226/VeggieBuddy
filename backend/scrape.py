from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from bs4 import BeautifulSoup

import time


class VeggieBuddyScraper:
    def __init__(self, url):
        self.url = url
        self.driver = self._get_driver()

    def _get_driver(self):
        options = Options()
        options.add_argument("--disable-gpu")
        driver = webdriver.Chrome(options=options)
        driver.get(self.url)
        time.sleep(1)

        return driver

    # Selecting "Menu" from "Overview", "Menu", "Reviews", and "About"
    def get_menu_button(self):
        return self.driver.find_element(
            By.XPATH, "//div[contains(@class, 'NlVald') and text()='Menu']"
        )

    # Getting the menu options (different for every resturuant)
    def get_all_menu_options(self):
        buttons = self.driver.find_elements(
            By.CSS_SELECTOR,
            ".RWPxGd",
        )

        if len(buttons) != 2:
            raise IndexError(
                f"Expected 2 menu option buttons, but found {len(buttons)}."
            )

        # Return all elements in buttons[1] which aren't selected
        menu_items = buttons[1].find_elements(By.XPATH, "./*")
        filtered_items = [
            el for el in menu_items if "G7m0Af" not in el.get_attribute("class").split()
        ]
        return filtered_items

    def get_items(self):
        return [
            self.get_item_details(item)
            for item in self.driver.find_elements(
                By.CSS_SELECTOR, ".m6QErb.Pf6ghf.XiKgde.ecceSd.tLjsW.XDi3Bc"
            )
        ]

    def get_item_details(self, element):
        text_part = element.find_element(By.CSS_SELECTOR, ".rogA2c")
        price = element.find_element(By.CSS_SELECTOR, ".Cpt1Qd")

        return [text_part.text.strip(), price.text.strip()]

    def click_element(self, element):
        element.click()

    def scrape(self):
        menu_button = self.get_menu_button()
        self.click_element(menu_button)

        menu_options = self.get_all_menu_options()

        for menu in menu_options:
            self.click_element(menu)

            print(self.get_items())

        while True:
            time.sleep(10)


if __name__ == "__main__":
    url = "https://www.google.com/maps/place/Jake's+Dilemma/@40.7843363,-73.9778757,17z/data=!4m6!3m5!1s0x89c258860488a173:0xb585c75abc63fc77!8m2!3d40.7843586!4d-73.9777082!16s%2Fg%2F1tgdv16b?entry=ttu&g_ep=EgoyMDI1MDYwOS4xIKXMDSoASAFQAw%3D%3D"
    scraper = VeggieBuddyScraper(url)
    scraper.scrape()
