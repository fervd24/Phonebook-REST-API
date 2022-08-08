const express = require("express");
const cors = require("cors");
const {dbConection} = require("../db/initDB");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            phonebook: '/',
            users: '/users',
            auth: '/auth'
        }

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.phonebook, require("../routes/phonebooks"));
        this.app.use(this.paths.users, require("../routes/users"));
        this.app.use(this.paths.auth, require("../routes/auth"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on PORT ${this.port}...`);
        });
    }
}

module.exports = Server;