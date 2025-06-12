from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

import time


def get_driver(url):
    options = Options()
    options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=options)
    driver.get(url)

    time.sleep(1)

    return driver


def get_menu_button(driver):
    return driver.find_element(
        By.XPATH, "//div[contains(@class, 'NlVald') and text()='Menu']"
    )


def get_all_menu_options(driver: WebDriver):
    buttons = driver.find_elements(By.CSS_SELECTOR, ".RWPxGd")

    print(len(buttons))

    return buttons


def click_element(element):
    driver = element.parent
    driver.execute_script("arguments[0].style.border='2px solid red'", element)

    element.click()


def main():
    location = "Upper Manhattan"

    url = "https://www.google.com/maps/place/Jake's+Dilemma/@40.7843363,-73.9778757,17z/data=!4m6!3m5!1s0x89c258860488a173:0xb585c75abc63fc77!8m2!3d40.7843586!4d-73.9777082!16s%2Fg%2F1tgdv16b?entry=ttu&g_ep=EgoyMDI1MDYwOS4xIKXMDSoASAFQAw%3D%3D"
    driver = get_driver(url)

    menu_button = get_menu_button(driver)
    menu_options = get_all_menu_options(driver)

    print(menu_options)

    click_element(menu_button)

    while True:
        time.sleep(10)


if __name__ == "__main__":
    main()
