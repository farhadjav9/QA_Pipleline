import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { login } from '../tests/loginHelper';
import { getRandomNumber } from '../utils/randomUtils';
import { log } from 'console';

let page: Page;
let loginPage: LoginPage;
let randomnum: number;

test.describe('OrangeHRM E2E Tests - Login Once', () => {

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = await login(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  

  test('Check Update Button Visible', async () => {
    await expect(loginPage.accountHeading).toBeVisible();
    await loginPage.hoverComponentsMenu();
    await page.waitForTimeout(2000);
    if(await loginPage.getItemPrice() === true) {
      expect(true).toBeTruthy();
    }
    else {
      expect(false).toBeTruthy();
    }
  });


  test('Check Update Button Visibles', async () => {
   await loginPage.clickMP3Menu();
   if(await loginPage.isAllItemsIPOD() === true) {
      expect(true).toBeTruthy();
    }
    else {
      expect(false).toBeTruthy();
    }
  await page.waitForTimeout(2000);
});

  test('Check Update Button Visibless', async () => {
    await loginPage.clickMP3Menu();
    const takeFirstItem = (await loginPage.getItemNames())[0];
    await loginPage.clickCartBtn();
    expect(takeFirstItem).toBe(await loginPage.getItemNameInCart());
});
});