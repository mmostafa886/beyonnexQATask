/**To handle the payment operations */
import { Selector, t } from "testcafe";

class PayPage {
  constructor() {
    this.checkoutTitle = Selector("h2");
    this.totalAmount = Selector("#total");
    this.payBtn = Selector("button").withText("Pay with Card");
    this.iFrame = Selector("iframe").withAttribute(
      "name",
      "stripe_checkout_app"
    );
    this.formEmail = Selector("#email");
    this.cardNumber = Selector("#card_number");
    this.endAt = Selector("#cc-exp");
    this.cvc = Selector("#cc-csc");
    this.zipCode = Selector("#billing-zip");
    this.formPayBtn = Selector("#submitButton");
    this.paymentSuccess = Selector("h2");
  }

  //Handling the payment operation if there are items in the shopping cart
  async completePayment(mail, cardNum, cardEnd, cardCVC, zCode) {
    await t
      .expect(this.payBtn.visible)
      .ok()
      .expect(this.checkoutTitle.innerText)
      .contains("Checkout")
      .expect(this.totalAmount.innerText)
      .notEql("Total: Rupees 0");
    //Filling the card details
    await t
      .click(this.payBtn)
      .expect(this.iFrame.exists)
      .ok()
      .switchToIframe(this.iFrame)
      .expect(this.formEmail.visible)
      .ok()
      .typeText(this.formEmail, mail, { paste: true })
      .typeText(this.cardNumber, cardNum, { paste: true })
      .typeText(this.endAt, cardEnd, { paste: true })
      .typeText(this.cvc, cardCVC, { paste: true });

    /**The Zip code field is sometimes displayed & other times not
     * So, in case it is there we need to provide a value & skip it if it is not displayed
     */ if (await this.zipCode.visible) {
      await t.typeText(this.zipCode, zCode, { paste: true });
    }
    await t
      .expect(this.formPayBtn.exists)
      .ok()
      .expect(this.formPayBtn.visible)
      .ok()
      .click(this.formPayBtn)
      .switchToMainWindow()
      .expect(this.payBtn.visible)
      .notOk({ timeout: 8000 });
    await t
      .expect(this.paymentSuccess.visible)
      .ok({ timeout: 8000 }) //A timeout was added here because the success page is taking longer than usual sometimes
      .takeScreenshot()
      .takeElementScreenshot(this.paymentSuccess); //This line needs to be commented if we are working on docker
  }
}
export default new PayPage();
