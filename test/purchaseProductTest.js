import TempPage from "../pages/TemperaturePage";
import ItemsPage from "../pages/ItemPage";
import PayPage from "../pages/PayPage";

fixture('Purchase Based On the Current Temprature')
    .page('https://weathershopper.pythonanywhere.com/');


test('Purchase Moisturizer/Sunscreen', async t => {
    /**based on the temprature we read from the first page (<19, >34, or between both 19& 34), we do one of three things
     * - <19, the script is redirectd to the 'Moisturizers' page
     * - >34, the script is redirectd to the 'Sunscreens' page
     * - between 19 & 34, the user is told that the weather is perfect & you don#t need to buy either
     */
    try{
    if (await TempPage.getTemp() < 19) {
        await t.click(TempPage.moistBtn);
        await ItemsPage.selectCheapestItem('loe');
        await ItemsPage.selectCheapestItem('lmond');
    } else if (await TempPage.getTemp() > 34) {
        await t.click(TempPage.sunScreenBtn);
        await ItemsPage.selectCheapestItem('SPF-50');
        await ItemsPage.selectCheapestItem('SPF-30');
    } 
    await t.click(ItemsPage.cartBtn);
    await PayPage.completePayment('test@test.com', '4242 4242 4242 4242', '12/34', '000', '1234');
    }
    catch (error){
        console.error("The provided Temprature is Perfect. You don't need to Buy neither 'Moisturizer' nor 'Sunscreen'" );
    }
});