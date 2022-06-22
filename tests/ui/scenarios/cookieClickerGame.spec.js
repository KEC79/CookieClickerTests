import { gamePage } from "../page-objects/gamePage";
import { homePage } from "../page-objects/homePage";
import { errorPage } from "../page-objects/errorPage";
import { getUsername, getPageUrl } from "../../helpers";
import { t } from "testcafe";

fixture("Cookie Clicker Game")
    .page`https://kim-crowe-2022-06-20-ui-test.cookieclickertechtest.airelogic.com`;

test("a player can create a new game with empty counters", async () => {
    const username = getUsername();

    await homePage.startNewGame(username);
    await t
        .expect(gamePage.pageHeader.innerText)
        .eql("Cookie Clicker!")
        .expect(gamePage.welcomeMessage.innerText)
        .eql(`Hello ${username}`)
        .expect(gamePage.cookieCounter.innerText)
        .eql("0")
        .expect(gamePage.factoryCounter.innerText)
        .eql("0")
        .expect(gamePage.moneyCounter.innerText)
        .eql("0.0")
        .expect(gamePage.cookiesToSellInput.innerText)
        .contains("")
        .expect(gamePage.factoriesToBuyInput.innerText)
        .contains("");
});

test("a player can navigate back to home page from game page", async () => {
    const username = getUsername();
    await t.navigateTo(`/game/${username}`);
    await t.click(gamePage.pageHeader);

    await t
        .expect(getPageUrl())
        .eql(
            "https://kim-crowe-2022-06-20-ui-test.cookieclickertechtest.airelogic.com/"
        );

    t.expect(homePage.newGameHeader.exists);
});

test("a player can add a cookie", async () => {
    const username = getUsername();
    await t.navigateTo(`/game/${username}`);
    await gamePage.addCookies(1);
    await t.expect(gamePage.cookieCounter.innerText).eql("1");
});

test("a player can sell a cookie", async () => {
    const username = getUsername();
    await t.navigateTo(`/game/${username}`);
    await gamePage.addCookies(2);
    await gamePage.sellCookies("1");
    await t
        .expect(gamePage.moneyCounter.innerText)
        .eql("0.25")
        .expect(gamePage.cookieCounter.innerText)
        .eql("1")
        .expect(gamePage.cookiesToSellInput.value)
        .eql("");
});

test("a player can buy a factory", async () => {
    const username = getUsername();
    await t.navigateTo(`/game/${username}`);
    await gamePage.addCookies(14);
    await gamePage.sellCookies("12");
    await gamePage.buyFactories("1");
    await t
        .expect(gamePage.factoryCounter.innerText)
        .eql("1")
        .expect(gamePage.moneyCounter.innerText)
        .eql("0")
        .expect(gamePage.cookieCounter.innerText)
        .eql("2")
        .expect(gamePage.factoriesToBuyInput.value)
        .eql("");
});

test("a player can view their game and score on home page and reenter game via link", async () => {
    const username = getUsername();
    await t.navigateTo(`/game/${username}`);
    await gamePage.addCookies(5);
    await t.click(gamePage.pageHeader);

    const gameDataRow = homePage.findRow(`${username}`);
    await t.expect(gameDataRow.child("td").nth(0).innerText).eql(`${username}`);
    await t.expect(gameDataRow.child("td").nth(1).innerText).eql("5");

    homePage.visitPlayerGamePage(gameDataRow, username);
    await t
        .expect(getPageUrl())
        .eql(
            `https://kim-crowe-2022-06-20-ui-test.cookieclickertechtest.airelogic.com/game/${username}`
        )
        .expect(gamePage.welcomeMessage.innerText)
        .eql(`Hello ${username}`)
        .expect(gamePage.cookieCounter.innerText)
        .eql("5");
});

test("an error is displayed when player uses an invalid url", async () => {
    await t.navigateTo("/new_game");
    await t
        .expect(errorPage.pageHeader.innerText)
        .eql("Bad Request")
        .expect(errorPage.errorMessage.innerText)
        .eql(
            "The browser (or proxy) sent a request that this server could not understand."
        );
});
