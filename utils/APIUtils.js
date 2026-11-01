
import 'dotenv/config';

export class APIUtils {
  constructor(request) {
    this.request = request;
  }

  
async login() {
  const response = await this.request.post(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        email: process.env.TEST_LOGIN_EMAIL,
        password: process.env.TEST_LOGIN_PASSWORD,
        // gotrue_meta_security: {},
      },
    }
  );

  const responseBody = await response.json();

    // console.log(responseBody);
    // console.log(`access-token: ${responseBody.access_token}`);
    // console.log(`id:${responseBody.user.id}`);


  return responseBody;
  
}

}
