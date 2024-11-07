
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

import { connectDb } from '@/dbConfig/dbConfig';

export async function POST(request: NextRequest) {

  connectDb() 
  try {
    const { email, username, password , business} = await request.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: 'Email already taken' },
        { status: 400 }
      );
    }

    const newUser = new User({ email, username, business, password });
    await newUser.save();

    return NextResponse.json({
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (err) {
    const errorMessage = (err as Error).message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}

}
