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
        await t.wait(1500);
        await ItemsPage.selectCheapAloeItem('lmond');
    }
    else if (await TempPage.getTemp() > 34) {
        await t.click(TempPage.sunScreenBtn);
        await ItemsPage.selectCheapAloeItem('SPF-50');
        await t.wait(1500);
        await ItemsPage.selectCheapAloeItem('SPF-30');
    }

    await t.click(ItemsPage.cartBtn);
    await t
        .expect(PayPage.checkoutTitle.innerText).contains('Checkout')
        .expect(PayPage.totalAmount.innerText).notEql('Total: Rupees 0');
    await t
        .click(PayPage.payBtn)
        .switchToIframe(PayPage.iFrame)
        .expect(PayPage.formEmail.visible).ok()
        .typeText(PayPage.formEmail, 'test@test.com', { paste: true })
        .typeText(PayPage.cardNumber, '4242 4242 4242 4242', { paste: true })
        .typeText(PayPage.endAt, '12/34', { paste: true })
        .typeText(PayPage.cvc, '000', { paste: true });
        
    if (await PayPage.zipCode.visible) {
        await t.typeText(PayPage.zipCode, '1234', { paste: true })
    }
        await t
        .click(PayPage.formPayBtn)
        .switchToMainWindow()
        .expect(PayPage.paymentSuccess.visible).ok({ timeout: 5000 })
        .expect(PayPage.paymentSuccess.innerText).contains('SUCCESS');




    await t
        // .takeScreenshot()
        .wait(5000);


});