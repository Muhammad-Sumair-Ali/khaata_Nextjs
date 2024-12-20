import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDb } from '@/dbConfig/dbConfig';

export async function POST(request: NextRequest) {
    connectDb(); 
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials');
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET environment variable is not set.");
        }
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET, 
          { expiresIn: '7d' }
        );
        

        return NextResponse.json({
            message: 'Login successful',
            token,
            user: user
        });
    } catch (err) {
      const errorMessage = (err as Error).message;  
      console.log('An error occurred:', errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
  
}
