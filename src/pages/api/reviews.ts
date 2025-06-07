// pages/api/reviews.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

interface Review {
  id: number;
  name: string;
  comment: string;
  date: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT * FROM reviews ORDER BY id DESC"
      );
      const reviews: Review[] = rows as Review[];
      res.status(200).json(reviews);
    } catch (err) {
      console.error("DB READ error:", err);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  }

  if (req.method === "POST") {
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: "Missing name or comment" });
    }

    try {
      await db.query("INSERT INTO reviews (name, comment) VALUES (?, ?)", [
        name,
        comment,
      ]);
      res.status(200).json({ message: "Review added successfully!" });
    } catch (err) {
      console.error("DB WRITE error:", err);
      res.status(500).json({ message: "Failed to add review" });
    }
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
