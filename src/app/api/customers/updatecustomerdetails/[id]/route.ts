import { connectDb } from '@/dbConfig/dbConfig';
import Customer from '@/models/customerModel';

import { NextResponse, NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  connectDb();

  try {
    const { name, phone } = await req.json();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { message: 'customer ID is required' },
        { status: 400 }
      );
    }
    if (!name && !phone ) {
      return NextResponse.json(
        { message: 'At least one field (name, phone) is required to update.' },
        { status: 400 }
      );
    }

    // Find the user and update only provided fields
    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json(
        { message: 'customer not found' },
        { status: 404 }
      );
    }

    // Update only if fields are provided
    if (name) customer.name = name;
    if (phone) customer.phone = phone;
  

    await customer.save({ validateBeforeSave: true });

    return NextResponse.json(
      { message: 'customer  details updated successfully', customer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { message: 'An unexpected error occurred customer' },
      { status: 500 }
    );
  }
}
