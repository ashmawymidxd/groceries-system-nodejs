// import user model
const User = require("../databases/schemas/User");

// import thashPassword function
const { hashPassword, comparePassword } = require("../utils/helpers");

async function register(request, response) {
    const { username, email } = request.body;
    const userDB = await User.findOne({ $or: [{ username }, { email }] });
    if (userDB) {
        response.status(400).send("user already exist");
    } else {
        const password = hashPassword(request.body.password);
        const user = new User({ username, password, email });
        await user.save();
        // send user and message to client
        response.send({
            status: "success",
            message: "user created successfully",
            user,
        });
    }
}

async function login(request, response) {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.send(400).send("email and password are required");
    }
    const userDB = await User.findOne({ email });
    if (!userDB) {
        return response.status(400).send("user not found");
    }
    const validPassword = comparePassword(password, userDB.password);
    if (!validPassword) {
        return response.status(400).send("invalid password");
    }
    request.session.user = userDB;
    response.send(userDB);
}

async function index(request, response) {
    const users = await User.find();
    response.send(users);
}

async function show(request, response) {
    const { id } = request.params;
    const user = await User.findById(id);
    response.send(user);
}

async function destroy(request, response) {
    const { id } = request.params;
    await User.findByIdAndDelete(id);
    response.send(204);
}

async function update(request, response) {
    const { id } = request.params;
    const { username, password, email } = request.body;
    const user = await User.findByIdAndUpdate(id, {
        username,
        password,
        email,
    });
    response.send(user);
}

async function serchByUsername(request, response) {
    const { username } = request.params;
    const user = await User.findOne({ username });
    response.send(user);
}

function logout(request, response) {
    request.session.destroy();
    response.send(200);
}

function login2(request, response) {
    console.log("Logged In");
    response.send(200);
}

module.exports = {
    register,
    login,
    index,
    show,
    destroy,
    update,
    serchByUsername,
    logout,
    login2,
};
