import { createServer, IncomingMessage, ServerResponse, type Server } from "http";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {

    // req.url -> The path requested by the client ("/", "/products", etc.)
    // req.method -> The HTTP method (GET, POST, PUT, PATCH, DELETE, etc.)

    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {

        // Sends the HTTP status code and response headers.
        // Here, status code = 200 (OK)
        // "Content-Type" tells the browser what type of data is being sent.
        // res.writeHead(200, { "Content-Type": "text/plain" });

        // Sends the response body to the client and ends the response.
        // res.end("This is root route now working perfectly");


        // if u want to show json format
        // application/json tells the browser that the response is JSON.
        res.writeHead(200, { "Content-Type": "application/json" });

        // JSON.stringify() converts a JavaScript object into a JSON string,
        // because res.end() cannot send a plain JavaScript object directly.
        res.end(JSON.stringify({
            message: "root route"
        }));

    }
    else if (url?.startsWith("/products")){
        res.writeHead(200,{"content-type": "application/json"})
        res.end(JSON.stringify({
            message:"root route"
    }))
    }
    
    else {

        // Better to send a response instead of only logging.
        // Status code 404 means the requested route was not found.
        res.writeHead(404, { "Content-Type": "text/plain" });

        // Sends the error message and closes the response.
        res.end("Route not found");
    }
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});