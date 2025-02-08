import { NextResponse } from 'next/server';
import { getToken } from '../../../../utils/token'; 
import { verifyToken } from '../../../../utils/token';

export async function POST(req: Request) {
  try {
    const token = getToken(req); // Extract token from cookies

    if (!token) {
      return NextResponse.json({ success: false, message: 'No token provided' });
    }

    // Verify the token using the verifyToken function
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid token' });
    }

    return NextResponse.json({
      success: true,
      message: 'Token valid',
      user: { email: user.email,firstName: user.firstName,
        secondName: user.secondName, contact: user.contact,}, 
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ success: false, message: 'Error verifying token' });
  }
}


