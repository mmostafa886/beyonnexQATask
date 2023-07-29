/**To handle the payment operations */
import { Selector, t } from "testcafe";

class PayPage {
    constructor() {
        this.checkoutTitle = Selector('h2');
        this.totalAmount = Selector('#total');
        this.payBtn = Selector('button.stripe-button-el');
        this.iFrame = Selector('.stripe_checkout_app');
        this.formEmail = Selector('.emailInput.input');
        this.cardNumber = Selector('.cardNumberInput.input.top');
        this.endAt = Selector('.cardExpiresInput.input.left.bottom');
        this.cvc = Selector('.cardCVCInput.input.right.bottom');
        this.zipCode = Selector('.zipCodeInput.input.bottom');
        this.formPayBtn = Selector('.iconTick');
        this.paymentSuccess = Selector('h2');
    }

    //Handling the payment operation if there are items in the shopping cart
    async completePayment(mail, cardNum, cardEnd, cardCVC, zCode) {
        //Assert that the checkout page is not empty
        await t
            .expect(this.checkoutTitle.innerText).contains('Checkout')
            .expect(this.totalAmount.innerText).notEql('Total: Rupees 0');
            
            //Filling the card details
        await t
            .click(this.payBtn)
            .switchToIframe(this.iFrame)
            .expect(this.formEmail.visible).ok()
            .typeText(this.formEmail, mail, { paste: true })
            .typeText(this.cardNumber, cardNum, { paste: true })
            .typeText(this.endAt, cardEnd, { paste: true })
            .typeText(this.cvc, cardCVC, { paste: true });

            /**The Zip code field is sometimes displayed & other times not
             * So, in case it is there we need to provide a value & skip it if it is not displayed
            */ if (await this.zipCode.visible) {
                    await t.typeText(this.zipCode, zCode, { paste: true })
                }
        await t
            .click(this.formPayBtn)
            .switchToMainWindow()
            .expect(this.paymentSuccess.visible).ok({ timeout: 5000 })//A timeout was added here because the success page is taking longer than usual sometimes
            .expect(this.paymentSuccess.innerText).contains('SUCCESS');
    }
}

export default new PayPage();