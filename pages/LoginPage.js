import {HomePage} from '../pages/HomePage.js';
import { expect } from '@playwright/test';


export class LoginPage{
    constructor(page, homepage){
        this.page = page;
        this.homepage = homepage;

        this.signInPage = page.getByText('Sign in with your mobile number');
        // this.username   = page.getByLabel('Mobile Number *');
        // this.password   = page.getByLabel('Password *');
        this.username   = page.getByPlaceholder('98765 43210');
        this.password   = page.locator('input[type="password"]');
        this.signInBTN  = page.getByRole('button', {name : 'Sign In'});
        this.notificationErrorMessage = page.getByText('Wrong mobile number or password', {exact:true});

    }


    async login(username, password){
        await this.homepage.loginBTNinHome();
        await expect(this.signInPage).toBeVisible();
        await this.username.pressSequentially(username, {delay: 200});
        await this.password.fill(password);
        await this.signInBTN.click();
    }
}