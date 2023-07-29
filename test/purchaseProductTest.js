import TempPage from "../pages/TemperaturePage";
import ItemsPage from "../pages/ItemPage";
import PayPage from "../pages/PayPage";

fixture('Purchase Based On the Current Temprature')
    .page('https://weathershopper.pythonanywhere.com/');


test('Purchase Moisturizer/Sunscreen', async t => {

    if (await TempPage.getTemp() < 19) {
        await t.click(TempPage.moistBtn);
        await ItemsPage.selectCheapestItem('loe');
        await ItemsPage.selectCheapestItem('lmond');
    }
    else if (await TempPage.getTemp() > 34) {
        await t.click(TempPage.sunScreenBtn);
        await ItemsPage.selectCheapestItem('SPF-50');
        await ItemsPage.selectCheapestItem('SPF-30');
    }
    await t.click(ItemsPage.cartBtn);
    await PayPage.completePayment('test@test.com', '4242 4242 4242 4242', '12/34', '000', '1234');


});