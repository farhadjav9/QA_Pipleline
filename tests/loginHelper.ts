// helpers/loginHelper.ts
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

export async function login(page: Page): Promise<LoginPage> {
  const loginPage = new LoginPage(page);
  await loginPage.goto(process.env.APP_URL!);
  await loginPage.clickLoginLink();
  await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

  return loginPage;
}
