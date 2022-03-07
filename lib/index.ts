import http from "http";
import { Options, Route, Request, Response } from "./utils/types";
import { IncomingMessage, ServerResponse } from "http";


declare module "http" { 
  export interface ServerResponse {
    send: (data: string) => void;
  }
}

declare module "http" { 
    export interface IncomingMessage {
        query: { [key: string]: string };
    }
  }

export default (port: number, options: Options) => {
    let routes: Route[] = [];
    let middlewares: ((req: IncomingMessage, res: ServerResponse, next: Function) => void)[] = [];

    const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
        // response.write("Hello World!");
        // function send(data: any): void {
        //     response.write(data);
        //     response.end();
        // }
        // const res = {
        //     ...response,
        //     send
        // }
        // console.log(res);
        // res.write("Hello World!");



    //     // const req = {
    //     //     ...request,
    //     //     query: {},
    //     // }
        res.send = (data: string) => { res.write(data); res.end(); };


        const query = req.url?.split("?")[1];
        const queryObj: Record<string, string> = {};
        if (query) {
            query.split("&").forEach(pair => {
                const [key, value] = pair.split("=");
                queryObj[key] = value;
            });
        }
        req.query = queryObj;

        req.url = req.url?.split("?")[0];


        // middlewares
        // middlewares.forEach(middleware => {
        //     middleware(req, res);
        // });\
        let goNext = true;
        function next() {
            goNext = true;
        }
        for (const middleware of middlewares) {
            goNext = false;
            middleware(req, res, next);
            if (!goNext) {
                break;
            }
        }


        const route = routes.find((route) => route.path === req.url);
        if (route) {
            if (options && options.showLogs === true) { console.log(`${req.method} ${req.url}`); }  
            if (route.middlewares) {
                route.middlewares.forEach(middleware => {
                    middleware(req, res);
                });
            }
            if (goNext) {
                route.handler(req, res);
            }
        } else {
            if (options && options.showLogs === true) { console.log(`404 ${req.url}`); };

            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>404 This Page Doesn't Exist</h1>");
            res.end();
        }
    });

    server.listen(port);

    function get(path: string, ...handlers: ((req: IncomingMessage, res: ServerResponse) => void)[]): void {
        routes.push({
            path, 
            handler: handlers[handlers.length - 1], 
            middlewares: handlers.slice(0, -1)
        });
    }

    function middleware(handler: (req: IncomingMessage, res: ServerResponse) => void): void {
        middlewares.push(handler);
    }



    return { get, middleware }
}