//obsolete code

/*
const http = require("http");
const { registeredUsers, registerUser, login, newTicket, retrievePending, previousTickets} = require("./functions");
const port = 3000;

registeredUsers.push({username: "admin", password: "password", manager: true});

const server = http.createServer((req, res) => {
  let body = "";

  req
    .on("data", (chunk) => {
      body += chunk;
    })
    .on("end", () => {
      body = body.length > 0 ? JSON.parse(body) : {};

      const contentType = { "Content-Type": "application/json" };

      const params = req.url.split("/");

      const authorgrabber = req.url.split("=");
      
      switch (req.method) {
        case "POST":
          //registering with post
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
              const message = registerUser(username, password);
              if(message == `Username is already taken`)
              {
                res.writeHead(400, contentType);
                res.end(JSON.stringify({message: "Username is already taken"}))
              }
              else
              {
                res.writeHead(201, contentType);
                res.end(JSON.stringify({ message: "registration successful" }));
              }
            }
          }

          //login time!
          else if (req.url.startsWith("/login")) {
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
              const message = login(username, password);
              if(message == `Incorrect Password`)
              {
                res.writeHead(400, contentType);
                res.end(JSON.stringify({message: "Incorrect Password"}));
              }
              else if(message == `Username not found`)
              {
                res.writeHead(400, contentType);
                res.end(JSON.stringify({message: "Username not found"}));
              }
              else
              {
                res.writeHead(201, contentType);
                res.end(JSON.stringify({ message: "Login Successful" }));
              }
            }
          }

          //ticket time!
          else if(req.url.startsWith("/tickets"))
          {
            const { author, description, type, amount } = body;
            const message = newTicket(author, description, type, amount);
            if(message ==  `amount is not a number`)
            {
              res.writeHead(400, contentType);
              res.end(JSON.stringify({message: "amount is not a number"}));
            }
            else if(message ==  `Ticket requires amount`)
            {
              res.writeHead(400, contentType);
              res.end(JSON.stringify({message: "Ticket requires amount"}));
            }
            else if(message ==  `Ticket requires description`)
            {
              res.writeHead(400, contentType);
              res.end(JSON.stringify({message: "Ticket requires description"}));
            }
            else
            {
              res.writeHead(201, contentType);
              res.end(JSON.stringify({ message: "Ticket has been successfully created" }));
            }
          }
          else {
            res.writeHead(404, contentType);
            res.end(JSON.stringify({message: "Invalid Endpoint"}))
          }

          break;
        case "PUT":
          if (req.url.startsWith("/tickets"))
          {
            if(params.length == 3)
            {

            }
          }
          break;
        //case "DELETE":
        //  break;
        case "GET":
          if (req.url.startsWith("/tickets?status=Pending"))
          {
            res.writeHead(201, contentType);
            res.end(JSON.stringify({ message: retrievePending() }));
          }
          if (authorgrabber[0] == "/tickets?status")
          {
            res.writeHead(201, contentType);
            res.end(JSON.stringify({ message: retrievePending(authorgrabber[1]) }));
          }
          break;

        default:
          res.writeHead(404, contentType);
          res.end(JSON.stringify({message: "Invalid Endpoint"}))
          break;
      }
    });
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
*/
