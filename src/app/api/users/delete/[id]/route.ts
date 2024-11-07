import { connectDb } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
    connectDb();
  try {
    
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }
 
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        { message: 'User Account not found' },
        { status: 404 }
      );
    }
    
    const user = await User.findOne({id});
    if (user) {
      return NextResponse.json(
        { message: 'something went wrong deleteing account' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User Account deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user Account:", error);
    return NextResponse.json(
      { message: (error as Error).message || 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
