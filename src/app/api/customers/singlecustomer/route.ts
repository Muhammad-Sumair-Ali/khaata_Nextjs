import { NextRequest, NextResponse } from 'next/server';
import Customer from '@/models/Customer';
import { connectDb } from '@/dbConfig/dbConfig';

export async function GET(request: NextRequest) {
     connectDb();

    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        console.log('Fetching customer with ID:', id); // Log the ID

        const customer = await Customer.findById(id);

        if (!customer) {
            console.warn(`Customer not found for ID: ${id}`); // Log a warning
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }

        return NextResponse.json(customer, { status: 200 });
    } catch (error) {
        console.error('Error fetching customer:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
