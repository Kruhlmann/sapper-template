import compression from "compression";
import express, { Express } from "express";
import session from "express-session";
import sirv from "sirv";
import swagger from "swagger-ui-express";

import { logging_middleware, session_middleware } from "../lib/middleware";

export class ServerBuilder {
    public static make_sapper_express_server(sesstion_secret: string, devmode: boolean, basepath = ""): Express {
        const middleware = [compression({ threshold: 0 }), sirv("static", { dev: devmode }), session_middleware()];
        return express()
            .set("base", `/${basepath}`)
            .use(
                session({
                    secret: sesstion_secret,
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: false },
                }),
            )
            .use(logging_middleware())
            .use(express.json())
            .use(express.urlencoded({ extended: true }))
            .use("/docs", swagger.serve, swagger.setup(swagger_spec))
            .use(...middleware);
    }
}

const swagger_spec = {
    openapi: "3.0.3",
    info: {
        version: "1.0.0",
        title: "Cinema API",
        description: "API for managing a cinema",
        contact: {
            name: "Andreas Krühlmann",
            email: "andreas@kruhlmann.com",
        },
        license: {
            name: "GPL-3.0-or-later",
            url: "https://www.gnu.org/licenses/gpl-3.0.en.html",
        },
    },
    host: "localhost:3000",
    basePath: "/docs",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        "/api/genres": {
            get: {
                description: "Returns all genres",
                responses: {
                    "200": {
                        description: "all genres",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Genre",
                            },
                        },
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error",
                        },
                    },
                },
            },
            post: {
                description: "Creates a new grenre",
                operationId: "add_genre",
                parameters: [
                    {
                        name: "genre",
                        in: "body",
                        description: "Genre to add",
                        required: true,
                        schema: {
                            $ref: "#/definitions/NewGenre",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "genre response",
                        schema: {
                            $ref: "#/definitions/Genre",
                        },
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error",
                        },
                    },
                },
            },
        },
        "/api/genres/{id}": {
            get: {
                description: "Returns a genre based on a single ID",
                operationId: "find_genre_by_id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID of genre to fetch",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    "200": {
                        description: "genre response",
                        schema: {
                            $ref: "#/definitions/Genre",
                        },
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error",
                        },
                    },
                },
            },
            delete: {
                description: "deletes a single genre based on the ID supplied",
                operationId: "delete_genre_by_id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID of genre to delete",
                        required: true,
                        type: "string",
                    },
                ],
                responses: {
                    "204": {
                        description: "genre deleted",
                    },
                    default: {
                        description: "unexpected error",
                        schema: {
                            $ref: "#/definitions/Error",
                        },
                    },
                },
            },
        },
    },
    definitions: {
        Genre: {
            type: "object",
            allOf: [
                {
                    $ref: "#/definitions/NewGenre",
                },
                {
                    required: ["id"],
                    properties: {
                        id: {
                            type: "string",
                        },
                    },
                },
            ],
        },
        NewGenre: {
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string",
                },
            },
        },
        Error: {
            type: "object",
            required: ["code", "message"],
            properties: {
                code: {
                    type: "integer",
                    format: "int32",
                },
                message: {
                    type: "string",
                },
            },
        },
    },
};
