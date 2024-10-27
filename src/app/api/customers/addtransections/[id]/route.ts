import { connectDb } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   connectDb();

  const { pathname } = request.nextUrl; 
  const id = pathname.split("/").pop(); 

  try {
    const { amount, type, details } = await request.json();
    if (amount == null || type == null || details == null) {
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
    } else if (type === 'get') {
      customer.totalGet += amount;
    } else {
      return NextResponse.json({ message: 'Invalid transaction type' }, { status: 400 });
    }

    await customer.save();
    return NextResponse.json({ message: 'Transaction added successfully!', customer }, { status: 200 });
    
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json(
      { message: (error as Error).message || 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
