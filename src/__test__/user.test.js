const service = require("../service/userService");
const userDAO = require("../repository/userDAO");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

//jest.mock("../repository/userDAO");
jest.mock("jsonwebtoken");

beforeEach(() => {
    jest.clearAllMocks();
})

test("register nothing", async () => {
    let user = {
    };
    
    const result = await service.registerUser(user);
    expect(result).toBe("Missing username or password");
});

test("register missing password", async () => {
    let user = {
        password: "bob"
    };
    const result = await service.registerUser(user);
    expect(result).toBe("Missing username or password");
});

test("register missing username", async () => {
    let user = {
        username: "bob"
    };
    const result = await service.registerUser(user);
    expect(result).toBe("Missing username or password");
});

test("registration and register again", async () => {
    let user = {
        username: "bob",
        password: "asdf"
    };
    const result = await service.registerUser(user);
    expect(result).toBe("User already exists");
});

test("registration", async () => {
    let user = {
        username: "bob",
        password: "asdf",
        role: "Finance Manager"
    };
    const result = await service.registerUser(user);
    expect(result).toBe("User already exists");
});

test("login nothing", async () => {
    let user = {
    };
    
    const result = await service.loginUser(user);
    expect(result).toBe("Missing username or password");
});

test("login missing password", async () => {
    let user = {
        password: "bob"
    };
    const result = await service.loginUser(user);
    expect(result).toBe("Missing username or password");
});

test("login missing username", async () => {
    let user = {
        username: "bob"
    };
    const result = await service.loginUser(user);
    expect(result).toBe("Missing username or password");
});

test("login", async () => {
    let user = {
        username: "bob",
        password: "asdf"
    };
    const result = await service.loginUser(user);
    expect(result).toBe(null);
});

test("dao coverage", async () => {
    let user = {
        user_id : uuid.v4(),
        username: uuid.v4(),
        password: "password",
        role: "Employee"
    };
    const result = await userDAO.registerUser(user);
    const result2 = await userDAO.registerUser(user);
    expect(result2).toBe("User already exists");
    const result3 = await userDAO.loginUser(user);
    expect(result3).toBe(undefined);
});
