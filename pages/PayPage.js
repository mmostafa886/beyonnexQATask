import { Selector, t } from "testcafe";

class PayPage{
    constructor(){

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
}

export default new PayPage();