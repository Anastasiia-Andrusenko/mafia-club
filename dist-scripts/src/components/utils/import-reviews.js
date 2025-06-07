"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: ".env.local" });
const db_1 = require("../../lib/db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function importReviews() {
    const filePath = path_1.default.join(process.cwd(), "public/reviews.json");
    const fileData = fs_1.default.readFileSync(filePath, "utf-8");
    const reviews = JSON.parse(fileData);
    for (const review of reviews) {
        await db_1.db.query("INSERT INTO reviews (name, comment, date) VALUES (?, ?, ?)", [review.name, review.comment, review.date]);
    }
    console.log(`✅ Імпортовано ${reviews.length} відгуків у базу`);
    process.exit(0);
}
importReviews().catch((err) => {
    console.error("❌ Помилка імпорту:", err);
    process.exit(1);
});
