import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  connectDb();

  try {
    const { email, business, username } = await req.json();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }
    if (!email && !business && !username) {
      return NextResponse.json(
        { message: 'At least one field (email, business, or username) is required to update.' },
        { status: 400 }
      );
    }

    // Find the user and update only provided fields
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: 'User account not found' },
        { status: 404 }
      );
    }

    // Update only if fields are provided
    if (email) user.email = email;
    if (business) user.businessName = business;
    if (username) user.username = username;

    await user.save({ validateBeforeSave: true });

    return NextResponse.json(
      { message: 'User account details updated successfully', user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user account:", error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
