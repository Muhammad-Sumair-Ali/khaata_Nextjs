import { connectDb } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; 

export async function GET(req: NextRequest) {
   connectDb();
  try {
 
    const token = req.headers.get('Authorization')?.split(' ')[1];
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded?.id; 
      } catch (err) {
        console.log(err)

        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
    }

    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

  
    const customers = await Customer.find({ userId });

   
    return new Response(JSON.stringify(customers), { status: 200 });

  } catch (err) {

    console.error('Error fetching customers:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
