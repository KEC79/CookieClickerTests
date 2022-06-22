import { Selector, t } from "testcafe";

export const homePage = {
    pageHeader: Selector("h1"),
    newGameHeader: Selector("h2").withExactText("New Game"),
    nameInput: Selector("input").withAttribute("name", "name"),
    startNewGameButton: Selector("button").withText("Start!"),

    async startNewGame(username) {
        await t.typeText(homePage.nameInput, username);
        await t.click(homePage.startNewGameButton);
    },

    findRow(username) {
        return Selector("table")
            .find("tbody > tr > td")
            .withText(username)
            .parent("tr");
    },

    async visitPlayerGamePage(gameDataRow, username) {
        await t.click(
            gameDataRow
                .child("td")
                .nth(0)
                .child("a")
                .withAttribute("href", `/game/${username}`)
        );
    },
};
