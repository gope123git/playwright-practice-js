
import { test, expect } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils.js';
import { HomePage } from '../pages/HomePage.js';


test.beforeEach('login using API',async({request,page})=>{

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
});

test('Add a fake driver using network interception', async ({ page }) => {

  await page.route(
    '**/rest/v1/rpc/public_drivers',
    async (route) => {

      const response = await route.fetch(); // actual backend response
      const realDrivers = await response.json(); 

      console.log('Real drivers:', realDrivers.length);

      // Create one fake driver
      
const fakeDriver = {
  id: 'a1b2c3d4-e5f6-4789-8123-123456789001',
  user_id: 'b2c3d4e5-f6a7-4890-9234-234567890012',

  driver_name: 'Playwright Test Driver',

  city: 'Kathara',
  route: null,

  vehicle_type: 'Auto',
  vehicle_number: 'JH12TEST001',
  vehicle_brand_id: '1d53ebbc-c9e5-4877-939c-0e0b8edc9f46',
  vehicle_model_id: '79e152a6-0b11-446c-9de6-8c4b789fb204',
  vehicle_year: 2025,
  vehicle_color: 'White',

  fuel_type: 'petrol',
  seating_capacity: 5,
  ac_available: false,

  profile_photo_url: null,

  seats_available: 5,

  is_active: true,
  is_visible: true,
  is_online: true,

  verification_status: 'verified',

  visibility_radius_km: 5,
  use_live_location: true,

  service_areas: [
    'Kathara',
    'Bokaro Thermal, Mansa Nagar',
    'Dvc Btps Hospital, Mansa Nagar'
  ],

  // Same coordinates as the real driver, to make proximity-based searching easier.
  current_lat: 30.73,
  current_lng: 76.84,

  location_updated_at: '2026-10-30T10:00:00.000+00:00',

  created_at: '2026-10-30T10:00:00.000+00:00',
  updated_at: '2026-10-30T10:00:00.000+00:00',

  rating_avg: 4.8
};


      // Adding the fake driver to the real response
      const modifiedDrivers = [
        ...realDrivers,
        fakeDriver,
      ];

      console.log('Modified drivers:', modifiedDrivers.length);

      // Return modified response to the application
      await route.fulfill({
        response,
        json: modifiedDrivers,
      });
    }
  );

  // Open LocalGaadi
  await page.goto('https://localgaadi.lovable.app/');
  const homepage = new HomePage(page);
   await homepage.enableLocationBTNInHomePage.click();

  // Step 7: Keep browser open for UI inspection
  await page.pause();
});
