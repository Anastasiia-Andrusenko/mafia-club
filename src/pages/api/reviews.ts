// pages/api/reviews.ts
import fs from "fs";
import path from "path";

interface Review {
  id: string;
  name: string;
  comment: string;
  date: string;
}

//
function handler(
  req: { method: string; body: Review },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: { status: (code: number) => { json: (data: any) => void } }
) {
  const reviewsPath = path.join(process.cwd(), "public/reviews.json");

  // GET
  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(reviewsPath, "utf-8");
      res.status(200).json(JSON.parse(data));
    } catch (err: unknown) {
      console.error("Error reading reviews:", err);
      if (err instanceof Error) {
        res
          .status(500)
          .json({ message: "Error reading reviews", error: err.message });
      } else {
        res
          .status(500)
          .json({ message: "Unknown error occurred while reading reviews" });
      }
    }
  }

  // POST
  if (req.method === "POST") {
    try {
      const newReview: Review = req.body;
      const data = fs.readFileSync(reviewsPath, "utf-8");
      const reviews: Review[] = JSON.parse(data);

      // new review
      newReview.id = (reviews.length + 1).toString();
      reviews.push(newReview);

      fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));

      res.status(200).json({ message: "Review added successfully!" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res
          .status(500)
          .json({ message: "Error adding review", error: err.message });
      } else {
        res
          .status(500)
          .json({ message: "Unknown error occurred while adding review" });
      }
    }
  }
}

export default handler;
