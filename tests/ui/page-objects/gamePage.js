import { Selector, t } from "testcafe";
import { buyFactories } from "../../api/apiMethods";

export const gamePage = {
    pageHeader: Selector("h1 > a"),
    welcomeMessage: Selector("body > p:nth-child(2)"),
    cookieCounter: Selector("#cookies"),
    factoryCounter: Selector("#factories"),
    moneyCounter: Selector("#money"),
    clickCookieButton: Selector("#click"),
    cookiesToSellInput: Selector("#cookies-to-sell"),
    sellCookiesButton: Selector("#sell-cookies"),
    factoriesToBuyInput: Selector("#factories-to-buy"),
    buyFactoriesButton: Selector("#buy-factories"),

    async addCookies(numberOfCookiesToAdd) {
        for (let counter = 1; counter <= numberOfCookiesToAdd; counter++) {
            await t.click(gamePage.clickCookieButton);
        }
    },

    async sellCookies(numberOfCookiesToSell) {
        await t.typeText(gamePage.cookiesToSellInput, numberOfCookiesToSell);
        await t.click(gamePage.sellCookiesButton);
    },

    async buyFactories(numberOfFactoriesToBuy) {
        await t.typeText(gamePage.factoriesToBuyInput, numberOfFactoriesToBuy);
        await t.click(gamePage.buyFactoriesButton);
    },
};
