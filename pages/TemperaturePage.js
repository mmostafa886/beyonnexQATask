import { Selector, t } from "testcafe";

class TempPage {
    constructor() {
        this.currentTempLable = Selector('#temperature');
        this.moistBtn = Selector('button').withText('Buy moisturizers');
        this.sunScreenBtn = Selector('button').withText('Buy sunscreens');
    }

    /**This promise is to get the current temprature displayed in the first page when navigating to (https://weathershopper.pythonanywhere.com/)
     * based on this value, the user will be redirected to either the 'Moisturizer' or 'SunScreen' pages*/
    async getTemp(){
        const currentDisplayedTempTxt = await this.currentTempLable.textContent;
       // console.log(currentDisplayedTempTxt);
        const currentDisplayedTemp = parseInt(currentDisplayedTempTxt.replace('℃', ''));
        return currentDisplayedTemp;
    }
}

export default new TempPage();