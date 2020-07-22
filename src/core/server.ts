import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV, BASEPATH } = process.env;
const development = NODE_ENV === "development";

const middleware = [
    `/${BASEPATH || ""}`,
    compression({ threshold: 0 }),
    sirv("static", { dev: development }),
    sapper.middleware(),
];

polka()
    .use(...middleware)
    .listen(PORT, console.error);
