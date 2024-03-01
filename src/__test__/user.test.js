const service = require("../service/userService");
const userDao = require("../repository/userDAO");
const jwt = require("jsonwebtoken");

jest.mock("../repository/userDAO");
jest.mock("jsonwebtoken");

beforeEach(() => {
    jest.clearAllMocks();
})

let user = {
}

test("register nothing", async () => {
    const result = await service.registerUser(user);
});

user
