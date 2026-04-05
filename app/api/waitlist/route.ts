import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';
import { getResendClient } from '@/lib/resend';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate Input
    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, name } = result.data;
    const supabase = getSupabaseClient();
    const resend = getResendClient();

    // 2. Insert into Supabase
    const { error: supabaseError } = await supabase
      .from('waitlist')
      .insert([
        { 
          email, 
          name, 
          source: 'nexusflow-landing',
          status: 'pending'
        }
      ]);

    if (supabaseError) {
      // Handle unique constraint violation (email already exists)
      if (supabaseError.code === '23505') {
        return NextResponse.json(
          { message: "You're already on the list! We'll be in touch." },
          { status: 200 }
        );
      }
      throw supabaseError;
    }

    // 3. Send Confirmation Email via Resend
    try {
      await resend.emails.send({
        from: 'NexusFlow <waitlist@nexusflow.ai>',
        to: email,
        subject: 'Welcome to the Network — NexusFlow AI',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #020408; color: #F0F9FF; padding: 40px; border-radius: 20px; border: 1px solid rgba(14, 165, 233, 0.1);">
            <h1 style="color: #0EA5E9; font-size: 24px; margin-bottom: 20px;">Welcome to the Network, ${name}.</h1>
            <p style="font-size: 16px; line-height: 1.6; color: rgba(240, 249, 255, 0.7);">
              You have successfully secured your position in the NexusFlow priority queue. 
              Our autonomous agentic operating system is currently in private beta, and we are scaling access carefully to maintain network stability.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: rgba(240, 249, 255, 0.7);">
              Early access begins soon. You will be notified the moment your node is ready for activation.
            </p>
            <hr style="border: none; border-top: 1px solid rgba(14, 165, 233, 0.1); margin: 30px 0;" />
            <p style="font-size: 12px; color: rgba(240, 249, 255, 0.4); text-transform: uppercase; letter-spacing: 2px;">
              NexusFlow Labs • Distributed Intelligence Network
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // We don't fail the whole request if email fails, as the user is already in the DB
    }

    return NextResponse.json(
      { message: "Successfully joined the waitlist" },
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
