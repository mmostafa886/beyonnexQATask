import TempPage from "../pages/TemperaturePage";
import ItemsPage from "../pages/ItemPage";
import PayPage from "../pages/PayPage";
import testData from "../data/testData.json";

fixture("Purchase Based On the Current Temprature").page(
  "https://weathershopper.pythonanywhere.com/"
);

test("Purchase Moisturizer/Sunscreen", async (t) => {
  /**based on the temprature we read from the first page (<19, >34, or between both 19& 34, [the data is coming from the data/testData.json]), we do one of three things
   * - <19, the script is redirectd to the 'Moisturizers' page
   * - >34, the script is redirectd to the 'Sunscreens' page
   * - between 19 & 34, the user is told that the weather is perfect & you don't need to buy either
   */
  await t.maximizeWindow();
  if ((await TempPage.getTemp()) < testData.Temprature.TempLow) {
    await t.click(TempPage.moistBtn);
    await ItemsPage.selectCheapestItem(testData.moistCategories.firstMoist);
    await ItemsPage.selectCheapestItem(testData.moistCategories.secondMoist);
  } else if ((await TempPage.getTemp()) > testData.Temprature.TempHigh) {
    await t.click(TempPage.sunScreenBtn);
    await ItemsPage.selectCheapestItem(
      testData.sunscreenCategories.firstSunscreen
    );
    await ItemsPage.selectCheapestItem(
      testData.sunscreenCategories.secondSunscreen
    );
  } else {
    console.log(
      "The Temprature is perfect, You don't need neither Moisturizer nor Sunscreen"
    );
  }
  await t.click(ItemsPage.cartBtn);
  await PayPage.completePayment(
    testData.paymentDetails.email,
    testData.paymentDetails.cn,
    testData.paymentDetails.ced,
    testData.paymentDetails.cvc,
    testData.paymentDetails.zip
  );
});
