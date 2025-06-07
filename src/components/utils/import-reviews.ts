// // require("dotenv").config({ path: ".env.local" });

// import { db } from "../../lib/db";
// import fs from "fs";
// import path from "path";

// interface Review {
//   id: string;
//   name: string;
//   comment: string;
//   date: string;
// }

// async function importReviews() {
//   const filePath = path.join(process.cwd(), "public/reviews.json");
//   const fileData = fs.readFileSync(filePath, "utf-8");
//   const reviews: Review[] = JSON.parse(fileData);

//   for (const review of reviews) {
//     await db.query(
//       "INSERT INTO reviews (name, comment, date) VALUES (?, ?, ?)",
//       [review.name, review.comment, review.date]
//     );
//   }

//   console.log(`✅ Імпортовано ${reviews.length} відгуків у базу`);
//   process.exit(0);
// }

// importReviews().catch((err) => {
//   console.error("❌ Помилка імпорту:", err);
//   process.exit(1);
// });
