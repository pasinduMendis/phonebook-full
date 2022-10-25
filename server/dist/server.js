"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const phonebookRoutes = require('./routes/phoneBookRoute');
const app = (0, express_1.default)();
const PORT = "5000";
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect("mongodb://localhost:27017/Phone")
    .then(() => {
    console.log('Database is successfully connected');
}, (err) => {
    console.log('cannont connect to the database' + err);
});
app.use('/phonebook', phonebookRoutes);
app.listen(4000, function () {
    console.log('saver is running on :', 4000);
});
