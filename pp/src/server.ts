import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { RouteHandler } from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req)

    RouteHandler(req,res)
});

server.listen(5000, () => {
  console.log("server is running on port 5000");
});
