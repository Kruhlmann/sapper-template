export class Logger {
    public static log(message?: string | number, ...optional_parameters: Array<string | number>): void {
        console.log(message, ...optional_parameters);
    }
}
