
export class HomePage{

constructor(page){
    this.page = page;

    this.welcomeHeading = page.getByRole('heading',{name:'Welcome to LocalGaadi'});
    this.findtaxi = page.getByText('Find Taxi', {exact:true});
    this.requestTaxi = page.getByText('Request Taxi', {exact:true});  
    this.emptyRide = page.getByText('Empty Ride');
    this.sendParcel = page.locator('div').filter({ hasText:'Send Parcel'});

    this.allButtons = page.locator('div.grid').getByRole('button');
    this.allButtonsCSS = page.locator('div.font-bold');

    this.loginBTN = page.getByRole('button',{ name:' Login / Register'});

    this.logOut = page.getByRole('button', {name : ' Logout'});
    this.enableLocationBTNInHomePage = page.getByRole('button',{name:'Enable Location'});



}

async open(){
    await this.page.goto('/');
}

async loginBTNinHome(){
    await this.loginBTN.click();

}

}