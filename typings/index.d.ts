import { User } from "../src/lib/models";

export type SapperSession = {
    user: User;
    token: string;
};
