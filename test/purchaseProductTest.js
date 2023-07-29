import { t } from "testcafe";
import TempPage from "../pages/TemperaturePage";
import ItemsPage from "../pages/ItemPage";
import PayPage from "../pages/PayPage";

fixture('Purchase Based On the Current Temrature')
    .page('https://weathershopper.pythonanywhere.com/');


test('Purchase Moisturizer', async t => {

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
    await t.click(ItemsPage.cartBtn);

    await PayPage.completePaymen('test@test.com', '4242 4242 4242 4242', '12/34', '000', '1234');

    await t
        // .takeScreenshot()
        .wait(3000);


});