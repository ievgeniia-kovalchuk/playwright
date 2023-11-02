import { expect as baseExpect} from "@playwright/test";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
    toContainItemWithText(received: string[], text: string)
    {
        const pass = received.find(item => item.includes(text));

        if (pass) {
            return {
                message: () => "passed",
                pass: true
            }
        }
        else {
            return {
                message: () => 
                `toContainItemWithText() assertion failed.\nYou expected '${received}' to contain '${text}'`,
                pass: false
            }
        }
    }
})