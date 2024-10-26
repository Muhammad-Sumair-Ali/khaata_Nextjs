import { connectDb } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  connectDb();

  const customerId = params.id;

  try {

    const { amount, type, details } = await request.json();
    if (!amount || !type || !details) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const customer = await Customer.findById(customerId);
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
    console.error("Error adding transaction:", error); // Log error for debugging
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
