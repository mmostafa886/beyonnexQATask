import { Selector, t } from "testcafe";

class ItemsPage {
    constructor() {

        this.cartBtn = Selector('.thin-text.nav-link');
    }

    async selectCheapestItem(itemType) {
        const materialContainingItems = Selector('.text-center.col-4').child(1).withText(itemType);
        const itemsCount = await materialContainingItems.count;

        console.log(itemsCount);

        let leastPrice = Number.MAX_SAFE_INTEGER;
        let selectedItem;
        let selectedButton;
        let wholeItem;

        for (let i = 0; i < itemsCount; i++) {
            const item = materialContainingItems.nth(i);
            const priceElement = item.nextSibling();
            const parentElement = item.parent();
            const priceText = await priceElement.innerText;
            const price = parseFloat(priceText.replace('Price: Rs. ', '').replace('Price: ', ''));

            if (price < leastPrice) {
                leastPrice = price;
                selectedItem = item;
                wholeItem = parentElement;
                selectedButton = selectedItem.sibling('button.btn.btn-primary');

            }
        }
        if (selectedItem && selectedButton && leastPrice) {

            // //The following 2 steps of taking needs to be commented if we gonna use the scripts on docker
            // await t.takeScreenshot();
            // await t.takeElementScreenshot(wholeItem);
            await t.click(selectedButton);

        } else {
            console.error('No item with ' + itemType + ' found.');
        }
    }
}


export default new ItemsPage();