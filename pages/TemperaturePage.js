import { Selector, t } from "testcafe";

class TempPage {
    constructor() {
        this.currentTempLable = Selector('#temperature');
        this.moistBtn = Selector('button.btn.btn-primary').withText('Buy moisturizers');
        this.sunScreenBtn = Selector('button.btn.btn-primary').withText('Buy sunscreens');

    }

    async getTemp(){
        const currentDisplayedTempTxt = await this.currentTempLable.textContent;
        const currentDisplayedTemp = parseFloat(currentDisplayedTempTxt);
        return currentDisplayedTemp;

    }

    async selectBtn() {
        const currentTempTxt = await this.currentTempLable.textContent;
        const currentTemp = parseFloat(currentTempTxt);
        console.log(currentTempTxt);
        console.log(currentTemp);
        try {
        if (currentTemp < 19) {
            await t.click(this.moistBtn);
        }
        else if (currentTemp > 34) {
            await t.click(this.sunScreenBtn);
        }
    }
    catch(error){
        console.error("The provided Temprature is normal. You don't need to Buy neither 'Moisturizer' nor 'Sunscreen'" );
    }
    
    }
}

export default new TempPage();