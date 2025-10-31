import { createClient } from"@/lib/supabase/server"
import { NextResponse } from"next/server"

export async function POST(request: Request) {
 const { userId } = await request.json()
 const supabase = await createClient()

 const { data: user } = await supabase
 .from("users")
 .select("role")
 .eq("id", userId)
 .single()

 return NextResponse.json({ role: user?.role ||"none" })
}