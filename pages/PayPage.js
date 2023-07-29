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

    async completePayment(mail, cardNum, cardEnd, cardCVC, zCode) {
        await t
            .expect(this.checkoutTitle.innerText).contains('Checkout')
            .expect(this.totalAmount.innerText).notEql('Total: Rupees 0');
        await t
            .click(this.payBtn)
            .switchToIframe(this.iFrame)
            .expect(this.formEmail.visible).ok()
            .typeText(this.formEmail, mail, { paste: true })
            .typeText(this.cardNumber, cardNum, { paste: true })
            .typeText(this.endAt, cardEnd, { paste: true })
            .typeText(this.cvc, cardCVC, { paste: true });

        if (await this.zipCode.visible) {
            await t.typeText(this.zipCode, zCode, { paste: true })
        }
        await t
            .click(this.formPayBtn)
            .switchToMainWindow()
            .expect(this.paymentSuccess.visible).ok({ timeout: 5000 })
            .expect(this.paymentSuccess.innerText).contains('SUCCESS');

    }
}

export default new PayPage();