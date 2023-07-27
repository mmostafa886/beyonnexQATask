import { Selector, t } from "testcafe";

class ItemsPage {
    constructor() {

        this.cartBtn = Selector('.thin-text.nav-link');
    }

    async selectCheapAloeItem(itemType) {
        // const materialContainingItems = Selector('p').withText(itemType);
        const materialContainingItems = Selector('.text-center.col-4').child(1).withText(itemType);
        const itemsCount = await materialContainingItems.count;
        // const priceElements = Selector('p').withText('Price:');
       const priceElements = Selector('.text-center.col-4').child(2);

        console.log(itemsCount);

        let leastPrice = Number.MAX_SAFE_INTEGER;
        let selectedItem;
        let selectedButton;

        for (let i = 0; i < itemsCount; i++) {
            const item = materialContainingItems.nth(i);
            // console.log(await item.innerText);
            const priceElement = priceElements.nth(i);
            const priceText = await priceElement.innerText;
            // console.log('Price Text:', priceText);
        const price = parseFloat(priceText.replace('Price: Rs. ', '').replace('Price: ', ''));


            if (price < leastPrice) {
                leastPrice = price;
                selectedItem = item;
                // Find the button element associated with the current item having the least price
                selectedButton = selectedItem.sibling('button.btn.btn-primary');
                console.log(price);

            }
        }
        if (selectedItem && selectedButton && leastPrice) {
            await t.takeScreenshot();
            // const submitBtn = selectedItem.sibling('button');
            await t.takeElementScreenshot(selectedItem);
            await t.click(selectedButton);

        } else {
            console.error('No item with ' + itemType + ' found.');
        }
    }
}


export default new ItemsPage();