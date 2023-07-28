import { t } from "testcafe";
import TempPage from "../pages/TemperaturePage";
import ItemsPage from "../pages/ItemPage copy";


fixture('Purchase Based On the Current Temrature')
    .page('https://weathershopper.pythonanywhere.com/');


test('Select Product', async t => {

    if (await TempPage.getTemp() < 19) {
        await t.click(TempPage.moistBtn);
        await ItemsPage.selectCheapAloeItem('loe');
        // await t.wait(1500);
         await ItemsPage.selectCheapAloeItem('lmond');
    }
    else if (await TempPage.getTemp() > 34) {
        await t.click(TempPage.sunScreenBtn);
        await ItemsPage.selectCheapAloeItem('SPF-50');
        // await t.wait(1500);
         await ItemsPage.selectCheapAloeItem('SPF-30');
    }



    await t
        // .takeScreenshot()
        .wait(5000);


});