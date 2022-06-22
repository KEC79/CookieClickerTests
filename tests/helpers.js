import { v4 as uuidv4 } from "uuid";
import { ClientFunction } from "testcafe";

export const getUsername = () => {
    return uuidv4();
};

export const getId = () => {
    return Math.random() * 1000000;
};

export const getPageUrl = ClientFunction(() => window.location.href);
