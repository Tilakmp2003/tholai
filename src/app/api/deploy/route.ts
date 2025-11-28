import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

async function getQueuePosition(createdAt: string) {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
    .lte('created_at', createdAt);
  
  if (error) throw error;
  return count || 0;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    const { data: user, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const queuePosition = await getQueuePosition(user.created_at);

    return NextResponse.json({
      success: true,
      ticketId: user.id,
      queuePosition,
      status: user.status,
      name: user.name
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, role } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if already exists
    const { data: existingUser } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      const queuePosition = await getQueuePosition(existingUser.created_at);
      return NextResponse.json({ 
        success: true, 
        ticketId: existingUser.id,
        queuePosition,
        status: existingUser.status,
        message: 'Already registered' 
      });
    }

    // Insert new user
    const { data: newUser, error } = await supabase
      .from('waitlist')
      .insert([{ name, email, company, role, status: 'PENDING_REVIEW' }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
    }

    const queuePosition = await getQueuePosition(newUser.created_at);

    return NextResponse.json({ 
      success: true, 
      ticketId: newUser.id,
      queuePosition,
      status: newUser.status,
      message: 'Deployment request queued successfully' 
    });

  } catch (error) {
    console.error('Deploy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
