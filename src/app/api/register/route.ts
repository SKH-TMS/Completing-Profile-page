import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { generateToken, setToken } from "../../../utils/token";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const { firstName, secondName, email, password, contact } =
      await req.json();

    // Connect to MongoDB
    await client.connect();
    const db = client.db("team_manager_db");
    const collection = db.collection("register_user");

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }


    // Insert new user into database
    const result = await collection.insertOne({
      firstName,
      secondName,
      email,
      password,
      contact: contact || "", // Optional field
    });

    // Generate JWT token
    const token = generateToken({
      email,
      firstName,
      secondName,
      contact,
    });

    // Set the token as an HttpOnly cookie
    const res = NextResponse.json({
      success: true,
      message: "Registration successful",
    });
    setToken(res, token);

    return res;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, message: "Failed to register" });
  } finally {
    await client.close();
  }
}
