import { connectDb } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken'; 

export async function POST(req: NextRequest) {
  connectDb();
  try {
    const { name, phone } = await req.json();
   
    const token = req.headers.get('Authorization')?.split(' ')[1];
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        userId = decoded?.id as string;
      } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
    }
   
    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const newCustomer = new Customer({
      name,
      phone,
      userId, 
    });

    await newCustomer.save(); 

    return new Response(JSON.stringify(newCustomer), { status: 201 });

  } catch (err) {
    console.error('Error adding customer:', err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }), // Casting err as Error
      { status: 500 }
    );
  }
}
