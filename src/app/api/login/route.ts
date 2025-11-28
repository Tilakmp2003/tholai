import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Check user status
    const { data: user, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Access Denied: Identity not found in secure ledger.' }, { status: 401 });
    }

    if (user.status !== 'ACCEPTED') {
      return NextResponse.json({ 
        error: 'Access Denied: Clearance level insufficient. Application is pending review.',
        status: user.status 
      }, { status: 403 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      },
      message: 'Identity Verified. Session Token Generated.' 
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'System Malfunction: Internal Server Error' }, { status: 500 });
  }
}
