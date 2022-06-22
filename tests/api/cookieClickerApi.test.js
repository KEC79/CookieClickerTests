import { getUsername } from "../helpers";
import { addCookie, buyFactories, sellCookies } from "./apiMethods";

describe("cookie clicker api", () => {
    const baseUrl =
        "https://kim-crowe-2022-06-20-api-test1.cookieclickertechtest.airelogic.com/rpc";

    // sell cookies

    it("should not allow more cookies than are owned to be sold", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfCookiesToSell = 1;
        const response = await sellCookies(url, numberOfCookiesToSell);

        expect(response.error).toEqual("Not enough cookies to sell");
    });

    it("should only accept whole numbers when selling cookies", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        await addCookie(url);

        const numberOfCookiesToSell = 0.5;
        const response = await sellCookies(url, numberOfCookiesToSell);

        expect(response.error).toEqual(
            "Can only sell whole numbers of cookies"
        );
    });

    it("should not accept non-numeric characters when selling cookies", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfCookiesToSell = "abc!£$%";
        const response = await sellCookies(url, numberOfCookiesToSell);

        expect(response.error).toEqual(
            "'<' not supported between instances of 'str' and 'int'"
        );
    });

    it("should not accept a null value when selling cookies", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfCookiesToSell = null;
        const response = await sellCookies(url, numberOfCookiesToSell);

        expect(response.error).toEqual(
            "'<' not supported between instances of 'NoneType' and 'int'"
        );
    });

    it("should not accept negative numbers when selling cookies", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfCookiesToSell = -1;
        const response = await sellCookies(url, numberOfCookiesToSell);

        expect(response.error).toEqual(
            "Number of cookies to sell must be positive"
        );
    });

    // buy factories

    it("should not accept negative numbers when buying factories", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfFactoriesToBuy = -1;
        const response = await buyFactories(url, numberOfFactoriesToBuy);

        expect(response.error).toEqual(
            "Number of factories to buy must be positive"
        );
    });

    it("should not allow player to buy factories if not enough money", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfFactoriesToBuy = 1;
        const response = await buyFactories(url, numberOfFactoriesToBuy);

        expect(response.error).toEqual("Not enough money to buy factories");
    });

    it("should only accept whole numbers when buying factories", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfFactoriesToBuy = 0.5;
        const response = await buyFactories(url, numberOfFactoriesToBuy);

        expect(response.error).toEqual(
            "Can only buy whole numbers of factories"
        );
    });

    it("should not accept non-numeric characters when buying factories", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfFactoriesToBuy = "abc!£$%";
        const response = await buyFactories(url, numberOfFactoriesToBuy);

        expect(response.error).toEqual(
            "'>' not supported between instances of 'str' and 'int'"
        );
    });

    it("should not accept a null value when buying factories", async () => {
        const username = getUsername();
        const url = `${baseUrl}/${username}`;

        const numberOfFactoriesToBuy = null;
        const response = await buyFactories(url, numberOfFactoriesToBuy);

        expect(response.error).toEqual(
            "'>' not supported between instances of 'NoneType' and 'int'"
        );
    });
});
