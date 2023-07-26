import { t } from "testcafe";
import TempPage from "../pages/TemperaturePage";
import ItemsPage from "../pages/ItemPage";

fixture ('Purchase Based On the Current Temrature')
.page('https://weathershopper.pythonanywhere.com/');


test('Purchase Moisturizer', async t=>{

    if (await TempPage.getTemp() < 19) {
        await t.click(TempPage.moistBtn);
        await ItemsPage.selectCheapAloeItem('loe');
        await ItemsPage.selectCheapAloeItem('lmond');
    }
    else if (await TempPage.getTemp()  > 34) {
        await t.click(TempPage.sunScreenBtn);
        await ItemsPage.selectCheapAloeItem('SPF-50');
        await ItemsPage.selectCheapAloeItem('SPF-30');
    }
// await TempPage.selectBtn();
// await MoistPage.selectCheapAloeMoist('loe');
//  await MoistPage.selectCheapAloeMoist('lmond');
await t
// .takeScreenshot()
.wait(5000);


});