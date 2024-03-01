// endpoint: /items
// CRUD
const express = require("express");
const router = express.Router();

const itemService = require("../service/ticketService");

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized Access" });
        return;
    }
    let role = "";
    let username = "";
    jwt.verify(token, "secret", (err, user) => {
    if(err)
    {
        res.status(401).json({ message: err.message });
    }
    else if (user.role == "Finance Manager") {
        role = "Finance Manager";
        username = user.username;
    }
    else if(user.role == "Employee")
    {
        role = "Employee";
        username = user.username;
    }
    });

    if(role == "Employee")
    {
        const tickets = await itemService.getEmployeeTickets(username);
        res.status(200).json({message: `Got all tickets`, tickets});
    }
    else if(role == "Finance Manager")
    {
        if(req.query.status == "Pending")
        {
            const tickets = await itemService.getPendingTickets();
            res.status(200).json({message: `Got all Pending tickets`, tickets});
        }
        else if(req.query.status == "Approved")
        {
            const tickets = await itemService.getApprovedTickets();
            res.status(200).json({message: `Got all Approved tickets`, tickets});
        }
        else if(req.query.status == "Denied")
        {
            const tickets = await itemService.getDeniedTickets();
            res.status(200).json({message: `Got all Denied tickets`, tickets});
        }
        else
        {
            const tickets = await itemService.getAllTickets();
            res.status(200).json({message: `Got all tickets`, tickets});
        }
    }
});

// create
router.put("/", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized Access" });
        return;
    }
    let role = "";
    let username = "";
    jwt.verify(token, "secret", (err, user) => {
    if(err)
    {
        res.status(401).json({ message: err.message });
    }
    else if (user.role == "Finance Manager") {
        role = "Finance Manager";
        username = user.username;
    }
    });
    if(role == "Finance Manager")
    {
        const data = await itemService.updateTicket(req.body);
        if (data) {
            res.status(201).json({ message: "Status Updated", data });
        } else {
            res
            .status(400)
            .json({ message: "Was not updated", receivedData: req.body });
        }
    }
    else
    {
        res.status(401).json({ message: "Unauthorized Access" });
    }
});

router.post("/", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized Access" });
        return 0;
    }
    let role = "";
    let username = "";
    jwt.verify(token, "secret", (err, user) => {
    if(err)
    {
        res.status(401).json({ message: err.message });
        return 0;
    }
    if(user.role == "Employee")
    {
        role = "Employee";
        username = user.username;
    }
    });

    if(role == "Employee")
    {
        const data = await itemService.postTicket(req.body, username);
        if (data) {
            if(data == "Missing Description")
            {
                res.status(400).json({ message: data });
            }
            else if(data == "Missing amount")
            {
                res.status(400).json({ message: data });
            }
            else
            {
                res.status(201).json({ message: "Ticket Created", data });
            }
        } else {
            res
            .status(400)
            .json({ message: "Was not created", receivedData: req.body });
        }
    }
    else
    {
        res.status(401).json({ message: "Unauthorized Access" });
    }
});

module.exports = router;
