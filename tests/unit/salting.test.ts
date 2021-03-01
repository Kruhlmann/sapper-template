/// <reference types="jest" />
import { PasswordSalter } from "../../src/lib/password_salter";

function getnerate_random_string_of_length(string_length: number): string {
    return Math.random()
        .toString(string_length)
        .replace(/[^a-z]+/g, "");
}

describe("Password salting", () => {
    it("can salt and compare a password", () => {
        const random_password = getnerate_random_string_of_length(36);
        const salted_password = PasswordSalter.salt_password(random_password);
        const comparison_result = PasswordSalter.validate_salted_password(
            random_password,
            salted_password,
        );
        expect(random_password).not.toEqual(salted_password);
        expect(comparison_result).toEqual(true);
    });
});
