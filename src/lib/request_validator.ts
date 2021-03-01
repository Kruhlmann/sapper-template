import { Request, Response } from "express";

import { HttpStatusCode } from "./http_status_codes";

const email_regex = /(?:[\d!#$%&'*+/=?^_`a-z{|}~-]+(?:\.[\d!#$%&'*+/=?^_`a-z{|}~-]+)*|"(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F!\u0023-\u005B\u005D-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])*")@(?:(?:[\da-z](?:[\da-z-]*[\da-z])?\.)+[\da-z](?:[\da-z-]*[\da-z])?|\[(?:(2(5[0-5]|[0-4]\d)|1\d\d|[1-9]?\d)\.){3}(?:(2(5[0-5]|[0-4]\d)|1\d\d|[1-9]?\d)|[\da-z-]*[\da-z]:(?:[\u0001-\u0008\u000B\u000C\u000E-\u001F\u0021-\u007F]|\\[\u0001-\u0009\u000B\u000C\u000E-\u007F])+)])/;

function is_email(email_candidate: string): boolean {
    return email_regex.test(email_candidate);
}

function is_nonempty_string(string_candidate: string): boolean {
    const is_string = string_candidate.constructor === String;
    const is_not_empty = string_candidate.length > 0;
    return is_string && is_not_empty;
}

function add_field_constraint(
    function_to_apply: (...args: any[]) => boolean,
    field_name: string,
    status_code_on_error: HttpStatusCode,
) {
    return function (
        _target: unknown,
        _key: string,
        descriptor: PropertyDescriptor,
    ): PropertyDescriptor {
        const method = descriptor.value;
        descriptor.value = function (...function_arguments: unknown[]) {
            const request = function_arguments[0] as Request;
            const response = function_arguments[1] as Response;
            const value_to_validate = request.body[field_name];
            const value_is_valid = function_to_apply(value_to_validate);

            if (value_is_valid) {
                return method.apply(function_arguments);
            }
            response.status(status_code_on_error).end();
        };
        return descriptor;
    };
}

export class UserSignupValidator {
    @add_field_constraint(is_email, "email", HttpStatusCode.BAD_REQUEST)
    @add_field_constraint(
        is_nonempty_string,
        "first_name",
        HttpStatusCode.BAD_REQUEST,
    )
    @add_field_constraint(
        is_nonempty_string,
        "last_name",
        HttpStatusCode.BAD_REQUEST,
    )
    @add_field_constraint(
        is_nonempty_string,
        "password",
        HttpStatusCode.BAD_REQUEST,
    )
    public static validate<RequestType, ResponseType>(
        _request: RequestType,
        _response: ResponseType,
    ): boolean {
        return true;
    }
}
