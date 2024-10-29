import { connectDb } from '@/dbConfig/dbConfig';
import Customer from '@/models/customerModel';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
    connectDb();
  try {
    
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { message: 'Customer ID is required' },
        { status: 400 }
      );
    }
 
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return NextResponse.json(
        { message: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Customer deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting customer :", error);
    return NextResponse.json(
      { message: (error as Error).message || 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
