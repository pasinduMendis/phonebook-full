"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phonebookRoutes = express_1.default.Router();
const Phonebook = require('../schema/phoneBookSchema');
phonebookRoutes.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newContact = new Phonebook(req.body);
    newContact.save();
    res.json('already registered');
}));
phonebookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield Phonebook.find({});
    res.send(contacts);
}));
phonebookRoutes.get('/:lastName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield Phonebook.find({
        last_name: req.params.lastName,
    });
    res.send(contacts);
}));
phonebookRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield Phonebook.findOne({
        _id: req.params.id,
    });
    if (!contact) {
        res.send("no user found");
    }
    yield Phonebook.findOneAndUpdate({
        _id: req.params.id,
    }, {
        first_name: req.body.first_name ? req.body.first_name : contact.first_name,
        last_name: req.body.last_name ? req.body.last_name : contact.last_name,
        phone_number: req.body.phone_number ? req.body.phone_number : contact.phone_number,
    });
    res.send("successfully updated");
}));
phonebookRoutes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield Phonebook.findOne({
        _id: req.params.id,
    });
    if (!contact) {
        res.send("no user found");
    }
    yield Phonebook.deleteMany({
        _id: req.params.id,
    });
    res.send("successfully deleted");
}));
module.exports = phonebookRoutes;
