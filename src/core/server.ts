import * as sapper from "@sapper/server";
import compression from "compression";
import polka from "polka";
import sirv from "sirv";

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
