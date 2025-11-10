"use server"

import { createClient } from "@/lib/supabase/server"

export async function updateMentorshipStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("mentorship_applications").update({ status }).eq("id", id)

  if (error) throw new Error(error.message)
  return { success: true }
}

export async function updateAwardStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("award_nominations").update({ status }).eq("id", id)

  if (error) throw new Error(error.message)
  return { success: true }
}

export async function uploadBlogImage(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get("file") as File

  if (!file) throw new Error("No file provided")

  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage.from("blog-images").upload(fileName, file)

  if (error) throw new Error(error.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(fileName)

  return { url: publicUrl }
}

export async function uploadSpeakerImage(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get("file") as File

  if (!file) throw new Error("No file provided")

  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage.from("speaker-images").upload(fileName, file)

  if (error) throw new Error(error.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from("speaker-images").getPublicUrl(fileName)

  return { url: publicUrl }
}

export async function uploadSponsorImage(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get("file") as File

  if (!file) throw new Error("No file provided")

  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage.from("sponsor-images").upload(fileName, file)

  if (error) throw new Error(error.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from("sponsor-images").getPublicUrl(fileName)

  return { url: publicUrl }
}

export async function createSponsor(data: {
  name: string
  logo_url: string
  website: string
  tier: string
  description: string
  contact_email: string
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("sponsors").insert([data])

  if (error) throw new Error(error.message)
  return { success: true }
}

export async function updateSponsor(
  id: string,
  data: {
    name: string
    logo_url: string
    website: string
    tier: string
    description: string
    contact_email: string
  },
) {
  const supabase = await createClient()

  const { error } = await supabase.from("sponsors").update(data).eq("id", id)

  if (error) throw new Error(error.message)
  return { success: true }
}

export async function deleteSponsor(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("sponsors").delete().eq("id", id)

  if (error) throw new Error(error.message)
  return { success: true }
}
