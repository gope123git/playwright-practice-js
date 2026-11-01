import {test,expect} from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// test('Get method',async({request})=>{

// const resp = await request.get(`${BASE_URL}/posts/2`);
// expect(resp.status()).toBe(200);
// const user = await resp.json();

// expect(user.id).toBe(2);
// expect(user).toHaveProperty('title');

// console.log(user);

// });

test('Post method',async({request})=>{
    const resp = await request.post(`${BASE_URL}/posts`,{
        data: {
            title: 'Playwright API Testing',
            body: 'Learning POST requests',
            userId: 1,
        }
    });

    expect(resp.status()).toBe(201);
    const respJson = await resp.json();
    console.log(respJson);

    expect(respJson.id).toBeTruthy();
    expect(respJson.title).toBe('Playwright API Testing');
    expect(respJson.body).toBe('Learning POST requests');
    expect(respJson.userId).toBe(1);
});







