import bcrypt from "bcrypt";

export class PasswordSalter {
    public static salt_password(password: string): string {
        const salt = bcrypt.genSaltSync();
        const salted_password = bcrypt.hashSync(password, salt);
        return salted_password;
    }

    public static validate_salted_password(
        password: string,
        salted_password: string,
    ): boolean {
        const password_is_valid = bcrypt.compareSync(password, salted_password);
        return password_is_valid;
    }
}
