
import { test, expect } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils.js';



test('Login through API and verify authenticated UI', async ({
  request,
  page,
}) => {

  const apiUtils = new APIUtils(request);
  const session = await apiUtils.login();


  expect(session.access_token).toBeTruthy();
  expect(session.refresh_token).toBeTruthy();
  expect(session.user?.id).toBeTruthy();


  await page.addInitScript((authSession) => {
    localStorage.setItem(
      'sb-ctaonjzgajxbfczxfccw-auth-token',
      JSON.stringify(authSession)
    );
  }, session);


  await page.goto(process.env.BASE_URL);


  await expect(
    page.getByRole('button', { name: 'logout'})
  ).toBeVisible({ timeout: 10000 });
});


// await page.addInitScript((token)=>{
//     localStorage.setItem('token',token);
// },session);
