import { NextResponse } from 'next/server';
import Customer from '@/models/customerModel';
import { connectDb } from '@/dbConfig/dbConfig';

export async function GET(request) {
     connectDb();

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); 

    try {
        const data = await Customer.findById({id});

        if (!data) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }

        return NextResponse.json({
            status: 'success',
            data: data
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching customer:', error);
        return NextResponse.json({
            status: 'failed',
            message: 'Internal server error'
        }, { status: 500 });
    }
}
