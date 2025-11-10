import { createClient } from "@/lib/supabase/server"

export async function getSponsors() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("sponsors").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching sponsors:", error)
    return []
  }

  return data || []
}

export function getSponsorImageUrl(logoUrl: string): string {
  if (!logoUrl) return "/placeholder.svg"

  // If it's already a full URL (starts with http), return as-is
  if (logoUrl.startsWith("http")) {
    return logoUrl
  }

  // If it's a storage path, construct the public URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl && logoUrl.startsWith("sponsor-images/")) {
    return `${supabaseUrl}/storage/v1/object/public/${logoUrl}`
  }

  return logoUrl || "/placeholder.svg"
}
