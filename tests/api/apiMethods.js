import fetch from "node-fetch";
import { getId } from "../helpers";

export const addCookie = async (url = "") => {
    const id = getId();

    const addCookieData = {
        method: "click",
        params: [],
        jsonrpc: "2.0",
        id: id,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(addCookieData),
    });
    const data = await response.json();
    return data;
};

export const sellCookies = async (url = "", numberOfCookiesToSell) => {
    const id = getId();

    const sellCookieData = {
        method: "sell_cookies",
        params: [numberOfCookiesToSell],
        jsonrpc: "2.0",
        id: id,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sellCookieData),
    });
    const data = await response.json();
    return data;
};

export const buyFactories = async (url = "", numberOfFactoriesToBuy) => {
    const id = getId();

    const buyFactoryData = {
        method: "buy_factories",
        params: [numberOfFactoriesToBuy],
        jsonrpc: "2.0",
        id: id,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(buyFactoryData),
    });
    const data = await response.json();
    return data;
};
