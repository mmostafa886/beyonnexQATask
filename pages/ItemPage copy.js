import { Selector, t } from "testcafe";

class ItemsPage {
    constructor() {

        this.cartBtn = Selector('.thin-text.nav-link');
    }

    async selectCheapAloeItem(itemType) {
        const materialContainingItems = Selector('p').withText(itemType);
        const itemsCount = await materialContainingItems.count;
        const priceElements = Selector('p').withText('Price:');

        console.log(itemsCount);

        let leastPrice = Number.MAX_SAFE_INTEGER;
        let selectedItem;
        let selectedButton;

        for (let i = 0; i < itemsCount; i++) {
            const item =  materialContainingItems.nth(i);
            // console.log(await item.innerText);
            const priceElement = priceElements.nth(i);
            const priceText = await priceElement.innerText;
            // console.log('Price Text:', priceText);
            const price = parseInt(priceText.replace('Price: Rs. ', ''));

            if (price < leastPrice) {
                leastPrice = price;
                selectedItem = item;
                            // Find the button element associated with the current item having the least price
            selectedButton = await selectedItem.sibling('button');
            
        }
    }
        if (selectedItem) {
            await t.takeScreenshot();
           // const submitBtn = selectedItem.sibling('button');
            await t.takeElementScreenshot(selectedItem);
            await t.click(selectedButton);

        } else {
            console.error('No item with '+itemType+' found.');
        }
    }
}


export default new ItemsPage();