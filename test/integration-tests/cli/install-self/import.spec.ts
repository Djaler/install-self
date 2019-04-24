import { Test, Expect } from "alsatian";

export default class ImportTests {

    @Test()
    public mainIsRequired() {
        Expect(require("@djaler/install-self")).toBe(require("../../../../core/install-self"));
    }
}