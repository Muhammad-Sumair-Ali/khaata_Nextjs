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

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: 'User account not found' },
        { status: 404 }
      );
    }

    // Check if the email is already used by another user
    if (email && email !== user.email) {
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return NextResponse.json(
          { message: 'Email is already in use. Please choose a different email.' },
          { status: 400 }
        );
      }
    }

    // Update only the fields that are provided
    if (email) user.email = email;
    if (business) user.businessName = business;
    if (username) user.username = username;

    await user.save({ validateBeforeSave: true });

    return NextResponse.json(
      { message: 'User account details updated successfully', user },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Error updating user account:", error);
    return NextResponse.json(
      { message: 'An unexpected error occurred', error: error.message },
      { status: 500 }
    );
  }
}
