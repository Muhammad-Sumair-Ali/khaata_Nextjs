import { connectDb } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';  // Ensure you have installed and configured JWT

export async function POST(req: NextRequest) {

  // Connect to the database
 connectDb();

  try {
    // Extract the body from the request
    const { name, phone } = await req.json();

    // Extract and verify the JWT token from the request header
    const token = req.headers.get('Authorization')?.split(' ')[1];
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded?.id; // Extract user ID from JWT payload
      } catch (err) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
    }

    // Ensure userId is present (if your app requires authentication for this action)
    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Create a new customer instance
    const newCustomer = new Customer({
      name,
      phone,
      userId, // Associate customer with the logged-in user
    });

    // Save the customer to the database
    await newCustomer.save(); 

    // Return success response
    return new Response(JSON.stringify(newCustomer), { status: 201 });

  } catch (err) {
    // Log the error and return a 500 status code
    console.error('Error adding customer:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
