import { Selector, t } from "testcafe";

class MoistPage {
    constructor() {

        // this.moistAloe = Selector('.text-center.col-4').withText('Aloe');
        //  this.moistPrices = Selector('p').withText('Price');
        this.cartBtn = Selector('.thin-text.nav-link');
    }

    async selectCheapAloeMoist(moistType) {
        const aloeContainingItems = Selector('p').withText(moistType);
        const itemsCount = await aloeContainingItems.count;
        const priceElements = Selector('p').withText('Price:');

        let leastPrice = Number.MAX_SAFE_INTEGER;
        let selectedItem;

        for (let i = 0; i < itemsCount-1; i++) {
            const item = await aloeContainingItems.nth(i);
            console.log(await item.innerText);
            const priceElement = await priceElements.nth(i);
            const priceText = await priceElement.innerText;
            console.log('Price Text:', priceText);
            const price = parseInt(priceText.replace('Price: Rs. ', ''));

            if (price < leastPrice) {
                leastPrice = price;
                selectedItem = item;
                // await t.takeElementScreenshot(selectedItem);
                console.log(itemsCount);
            }
            else{
                console.log('This price is not the least');
            }
        }

        if (selectedItem) {
            await t.takeScreenshot();
            // Use the selectedItem to interact with the element
            const submitBtn = selectedItem.sibling('button');
            await t.takeElementScreenshot(selectedItem);
            await t.click(submitBtn);

        } else {
            console.error('No item with '+moistType+' found.');
        }
    }
}

export default new MoistPage();