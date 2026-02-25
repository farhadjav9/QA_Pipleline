import { Page, Locator } from "@playwright/test";
import { text } from "node:stream/consumers";

export class LoginPage {
  readonly myAccountLink: Locator;
  readonly loginLink: Locator;
  readonly accountHeading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly updateButton: Locator;
  readonly phonesMenu: Locator;
  readonly itemPrice: Locator;
  readonly mp3Menu: Locator;
  readonly mp3ShowAll: Locator;
  readonly itemsName: Locator;
  readonly cartBtn: Locator;
  readonly showCartLink: Locator;
  readonly itemNameInCart: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.getByPlaceholder('E-Mail Address');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.accountHeading = page.locator('//div[@id="content"]//h2[text()="My Account"]');
    this.updateButton = page.locator("#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-navigation > header > div.oxd-topbar-header > div.orangehrm-upgrade-container > a > button");
    this.myAccountLink = page.getByRole('link', { name: 'My Account' }).nth(0);
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.phonesMenu = page.getByRole('link', { name: 'Phones & PDAs' });
    this.mp3Menu = page.getByRole('link', { name: 'MP3 Players' }).nth(0);
    this.itemPrice = page.locator('//p[@class="price"]');
    this.itemsName = page.locator('div[class="caption"] h4 a')
    this.mp3ShowAll = page.getByRole('link', { name: 'Show All MP3 Players' });
    this.cartBtn = page.getByRole('button', { name: 'Add to Cart' });
    this.showCartLink = page.getByRole('link', { name: 'shopping cart' });
    this.itemNameInCart = page.locator('td[class="text-left"] a').nth(1)
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clickLoginLink() {
    await this.myAccountLink.click();
    await this.loginLink.click();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async hoverComponentsMenu() {
    await this.phonesMenu.click();
  }

  async clickMP3Menu() {
    await this.mp3Menu.click();
    await this.mp3ShowAll.click();
  }

  async clickCartBtn() {
    await this.cartBtn.nth(0).click();
    await this.showCartLink.click();
  }

  async getItemPrice(): Promise<boolean> {
    const texts = await this.itemPrice.allTextContents();
    const cleanTexts = texts.map(text => text.replace(/\s*Ex Tax:.*/, '').replace('$', '').trim());
    cleanTexts.forEach(price => console.log(price));
    for (let i = 0; i < cleanTexts.length - 1; i++) {
      if (cleanTexts[i] < cleanTexts[i + 1]) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  async getItemNames(): Promise<string[]> {
    const texts = await this.itemsName.allTextContents();
    return texts
      .map(t => t.trim())
      .filter(t => t.length > 0);
  }

  async isAllItemsIPOD(): Promise<boolean> {
    const items = await this.getItemNames();
    return items.every(item =>
      item.toLowerCase().includes('ipod')
    );
  }

  async getItemNameInCart() {
    const text = await this.itemNameInCart.textContent();
    return text;
  }
}
