import { connectDb } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  connectDb();

  // Extract the customer ID from the request URL
  const { pathname } = request.nextUrl; // Get the full URL path
  const id = pathname.split("/").pop(); // Extract the ID from the path

  try {
    // Validate request body
    const { amount, type, details } = await request.json();
    if (!amount || !type || !details) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
    }

    const newTransaction = { amount, type, details };
    customer.transactions.push(newTransaction);

    if (type === 'give') {
      customer.totalGive += amount;
    } else {
      customer.totalGet += amount;
    }

    await customer.save();
    return NextResponse.json({ message: 'Transaction added successfully!', customer }, { status: 200 });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
