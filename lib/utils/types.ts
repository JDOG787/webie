import { IncomingMessage, ServerResponse } from "http";

export interface Request extends IncomingMessage {
    query: { [key: string]: string } | {};
}

export interface Response extends ServerResponse {
    send: (data: any) => void;
}

export interface Options {
    showLogs: boolean;
}

export interface Route {
    path: string,
    handler: (req: IncomingMessage, res: ServerResponse) => void,
    middlewares: ((req: IncomingMessage, res: ServerResponse) => void)[]
}

export let Middleware: (req: Request, res: Response) => void;