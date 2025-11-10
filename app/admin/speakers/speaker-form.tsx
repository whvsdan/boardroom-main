"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadSpeakerImage } from "@/app/actions/admin"
import Image from "next/image"
import { Upload, X, LinkIcon } from "lucide-react"

interface Speaker {
  id: string
  name: string
  title: string
  company?: string
  bio?: string
  image_url: string
  email?: string
}

interface SpeakerFormProps {
  speaker?: Speaker | null
  onSuccess: () => void
}

export default function SpeakerForm({ speaker, onSuccess }: SpeakerFormProps) {
  const [name, setName] = useState(speaker?.name || "")
  const [title, setTitle] = useState(speaker?.title || "")
  const [company, setCompany] = useState(speaker?.company || "")
  const [bio, setBio] = useState(speaker?.bio || "")
  const [imageUrl, setImageUrl] = useState(speaker?.image_url || "")
  const [urlInput, setUrlInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload")
  const supabase = createClient()

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const result = await uploadSpeakerImage(formData)
      setImageUrl(result.url)
      setUrlInput("")
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploadingImage(false)
    }
  }

  function handleAddImageUrl() {
    if (urlInput.trim()) {
      setImageUrl(urlInput)
      setUrlInput("")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (speaker?.id) {
        const { error } = await supabase
          .from("speakers")
          .update({
            name,
            title,
            company,
            bio,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("id", speaker.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("speakers").insert([
          {
            name,
            title,
            company,
            bio,
            image_url: imageUrl,
            created_at: new Date().toISOString(),
          },
        ])
        if (error) throw error
      }
      onSuccess()
    } catch (error) {
      console.error("Error saving speaker:", error)
      alert("Error saving speaker")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{speaker?.id ? "Edit Speaker" : "Add Speaker"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Speaker Image</label>
            <div className="flex gap-4">
              {imageUrl && (
                <div className="relative w-48 h-48 rounded-lg border border-border overflow-hidden">
                  <Image src={imageUrl || "/placeholder.svg"} alt="Speaker" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="absolute top-1 right-1 bg-destructive text-white p-1 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageInputMode("upload")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      imageInputMode === "upload"
                        ? "bg-accent text-accent-foreground"
                        : "bg-border text-muted-foreground hover:bg-border"
                    }`}
                  >
                    <Upload size={14} className="inline mr-1" />
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode("url")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      imageInputMode === "url"
                        ? "bg-accent text-accent-foreground"
                        : "bg-border text-muted-foreground hover:bg-border"
                    }`}
                  >
                    <LinkIcon size={14} className="inline mr-1" />
                    URL
                  </button>
                </div>

                {imageInputMode === "upload" ? (
                  <>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-accent transition-colors">
                      <Upload size={24} className="text-muted-foreground mb-2" />
                      <span className="text-sm font-medium text-muted-foreground">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>
                    {isUploadingImage && <p className="text-sm text-muted-foreground">Uploading...</p>}
                  </>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                    <Button
                      type="button"
                      onClick={handleAddImageUrl}
                      disabled={!urlInput.trim()}
                      size="sm"
                      variant="outline"
                    >
                      Add Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Speaker name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title/Role *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Speaker title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio/Description</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Speaker bio or description"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting || isUploadingImage}>
              {isSubmitting ? "Saving..." : speaker?.id ? "Update Speaker" : "Add Speaker"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
