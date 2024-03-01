const service = require("../service/ticketService");
const ticketDAO = require("../repository/TicketDAO");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

jest.mock("jsonwebtoken");

beforeEach(() => {
    jest.clearAllMocks();
})

test("get employee tickets", async () => {
    const result = await service.getEmployeeTickets("admin");
    expect(result).toBeNull();
});

test("get Pending Tickets", async () => {
    const result = await service.getPendingTickets();
    expect(result).toBeTruthy();
});

test("get Approved Tickets", async () => {
    const result = await service.getApprovedTickets();
    expect(result).toBeTruthy();
});

test("get Denied Tickets", async () => {
    const result = await service.getDeniedTickets();
    expect(result).toBeTruthy();
});

test("get All Tickets", async () => {
    const result = await service.getAllTickets();
    expect(result).toBeTruthy();
});

test("get Pending Tickets", async () => {
    const result = await service.getPendingTickets();
    expect(result).toBeTruthy();
});

test("post ticket", async () => {
    let ticket = {
        amount: 20,
        description: "asdf"
    };
    const result = await service.postTicket(ticket,"cerry");
    expect(result).toBeTruthy();
});

test("post ticket without amount", async () => {
    let ticket = {
        description: "asdf"
    };
    const result = await service.postTicket(ticket,"cerry");
    expect(result).toBe("Missing amount");
});

test("post ticket without description", async () => {
    let ticket = {
        amount: 20
    };
    const result = await service.postTicket(ticket,"cerry");
    expect(result).toBe("Missing Description");
});

test("post ticket with type", async () => {
    let ticket = {
        amount: 20,
        description: "asdf",
        type: "stuff"
    };
    const result = await service.postTicket(ticket,"cerry");
    expect(result).toBeTruthy();
});

test("post ticket with nothing", async () => {
    let ticket = {
    };
    const result = await service.postTicket(ticket,"cerry");
    expect(result).toBe("Missing Description");
});

test("update ticket", async () => {
    let ticket = {
        ticket_id: "asdf",
        status: "stuff"
    };
    const result = await service.updateTicket(ticket);
    expect(result).toBeTruthy();
});

test("update ticket with nothing", async () => {
    let ticket = {
    };
    const result = await service.updateTicket(ticket);
    expect(result).toBeNull();
});

