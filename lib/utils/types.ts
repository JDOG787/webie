import { IncomingMessage, ServerResponse } from "http";

export interface Options {
    showLogs: boolean;
}

export interface Route {
    path: string,
    handler: (req: IncomingMessage, res: ServerResponse) => void,
    middlewares: ((req: IncomingMessage, res: ServerResponse) => void)[]
}

export let Middleware: (req: IncomingMessage, res: ServerResponse) => void;