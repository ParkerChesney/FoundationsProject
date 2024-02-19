const http = require("http");
const { shoppingList, addItem, togglePurchased, removeItem, calculateTotalCost} = require("./functions");
const port = 3000;

const server = http.createServer((req, res) => {
  let body = "";

  req
    .on("data", (chunk) => {
      body += chunk;
    })
    .on("end", () => {
      body = body.length > 0 ? JSON.parse(body) : {};

      const contentType = { "Content-Type": "application/json" };

      let index = parseInt(req.url.split("/")[2]);

      switch (req.method) {
        case "POST":
          // console.log("POST REQUEST");
          if (req.url.startsWith("/register")) {
            const { username, password } = body;
            if(!username || !password)
            {
              res.writeHead(400, contentType);
              res.end(
                JSON.stringify({
                  message: "Please provide valid username or password",
                })
              );
            }
            else {
              const message = register(username, password);
              if(message == `Username is already taken`)
              {
                res.writeHead(400, contentType);
                res.end(JSON.stringify({message: "Invalid Endpoint"}))
              }
              else
              {
                res.writeHead(201, contentType);
                res.end(JSON.stringify({ message: "registration successful" }));
              }
            }
          }
          else {
            res.writeHead(404, contentType);
            res.end(JSON.stringify({message: "Invalid Endpoint"}))
          }
          break;
        case "PUT":

          break;
        case "DELETE":

          break;
        case "GET":

          break;
        default:

          break;
      }
    });
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
