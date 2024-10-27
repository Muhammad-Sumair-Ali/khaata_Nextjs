import { connectDb } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; 

interface JwtPayload {
  id: string;
}

export async function GET(req: NextRequest) {
  connectDb();
  
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    let userId: string | null = null;

    if (token) {
      try {
        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined in the environment variables");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        userId = decoded?.id; 
      } catch (err) {
        console.error("JWT Verification Error:", err);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
    }

    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const customers = await Customer.find({ userId });

    return NextResponse.json(customers, { status: 200 });

  } catch (err) {
    console.error('Error fetching customers:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal server error' }, { status: 500 });
  }
}
