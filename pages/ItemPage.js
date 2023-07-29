/**
 * When started working on the project, I decided to make 2 separate pages for each of 'Mositurizers' and 'Sunscreens'
but then it was discovered that both are using the same locators strategy & the needed actions are the same in concept 
(it is required to get the items with almost the same criteria approach), So I found that it will be better to decrease the project size & keep the same functionality
to unify both of them into one page
*/
import { Selector, t } from "testcafe";

class ItemsPage {
    constructor() {

        this.cartBtn = Selector('.thin-text.nav-link');
    }

    async selectCheapestItem(itemType) {
        const materialContainingItems = Selector('.text-center.col-4').child(1).withText(itemType);
        /**This will retrieve a list of item names where the provided (itemType)/material is part of the item name
         * Then in the next step we will get their count
         */
        const itemsCount = await materialContainingItems.count;
       // console.log(itemsCount);

        let leastPrice = Number.MAX_SAFE_INTEGER;
        let selectedItem;
        let selectedButton;
        let wholeItem;

        /** In this loop, we are working on list of items# names matching the provided (itemType) to select the one with the least price
         * by selecting every one of them, get its parent (which is the full item [image, name, price & Add button]),
         * Get the price & convert it to a float number in order to be able to compare all the prices to get the least price
        */
        for (let i = 0; i < itemsCount; i++) {
            const item = materialContainingItems.nth(i);
            const priceElement = item.nextSibling();
            const parentElement = item.parent();
            const priceText = await priceElement.innerText;
            const price = parseFloat(priceText.replace('Price: Rs. ', '').replace('Price: ', ''));

            /**This is where we perform the prices' comparison process & in case of condition matching, we are getting the corresponding parent item & Add button
             * in order to use them later
             */
            if (price < leastPrice) {
                leastPrice = price;
                selectedItem = item;
                wholeItem = parentElement;
                selectedButton = selectedItem.sibling('button.btn.btn-primary');
            }
        }

        /**Here we either click on the add button of the selected item  or tells the user that there is no item matching the provided criteria*/
        if (selectedItem && selectedButton && leastPrice) {
            // //The following 2 steps of taking screenshots needs to be commented if we gonna use the scripts on docker
            // await t.takeScreenshot();
            // await t.takeElementScreenshot(wholeItem);
            await t.click(selectedButton);
        } else {
            console.error('No item with ' + itemType + ' found.');
        }
    }
}


export default new ItemsPage();