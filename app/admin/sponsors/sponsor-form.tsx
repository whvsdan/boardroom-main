"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"
import { uploadSponsorImage, createSponsor, updateSponsor } from "@/app/actions/admin"

interface SponsorFormProps {
  initialData?: {
    id: string
    name: string
    logo_url: string
    website: string
    tier: string
    description: string
    contact_email: string
  }
  onSuccess?: () => void
}

export function SponsorForm({ initialData, onSuccess }: SponsorFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    website: initialData?.website || "",
    tier: initialData?.tier || "silver",
    description: initialData?.description || "",
    contact_email: initialData?.contact_email || "",
    logo_url: initialData?.logo_url || "",
  })

  const [imageMode, setImageMode] = useState<"upload" | "url">(
    initialData?.logo_url?.startsWith("http") && !initialData?.logo_url?.includes("supabase") ? "url" : "upload",
  )
  const [logoPreview, setLogoPreview] = useState(initialData?.logo_url || "")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append("file", file)

      const result = await uploadSponsorImage(formDataObj)
      setFormData({ ...formData, logo_url: result.url })
      setLogoPreview(result.url)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, logo_url: url })
    setLogoPreview(url)
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, logo_url: "" })
    setLogoPreview("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.logo_url) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      if (initialData?.id) {
        await updateSponsor(initialData.id, formData)
      } else {
        await createSponsor(formData)
      }

      // Reset form
      setFormData({
        name: "",
        website: "",
        tier: "silver",
        description: "",
        contact_email: "",
        logo_url: "",
      })
      setLogoPreview("")
      onSuccess?.()
    } catch (error) {
      console.error("Failed to save sponsor:", error)
      alert("Failed to save sponsor")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Sponsor" : "Add New Sponsor"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload/URL */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Logo *</label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`px-3 py-2 rounded text-sm ${
                  imageMode === "upload" ? "bg-accent text-accent-foreground" : "border border-border"
                }`}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`px-3 py-2 rounded text-sm ${
                  imageMode === "url" ? "bg-accent text-accent-foreground" : "border border-border"
                }`}
              >
                URL
              </button>
            </div>

            {imageMode === "upload" ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="logo-upload"
                  disabled={uploadingImage}
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {uploadingImage ? "Uploading..." : "Click to upload or drag and drop"}
                  </p>
                </label>
              </div>
            ) : (
              <Input
                type="url"
                placeholder="https://example.com/logo.png"
                value={formData.logo_url}
                onChange={(e) => handleUrlChange(e.target.value)}
              />
            )}

            {logoPreview && (
              <div className="relative w-32 h-32 rounded-lg border border-border bg-background p-2">
                <img
                  src={logoPreview || "/placeholder.svg"}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Sponsor Name *</label>
            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Company name" required />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-medium">Website</label>
            <Input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          {/* Tier */}
          <div>
            <label className="text-sm font-medium">Sponsorship Tier</label>
            <select
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              className="w-full border border-border rounded-md px-3 py-2 bg-background"
            >
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Sponsor description"
              rows={3}
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="text-sm font-medium">Contact Email</label>
            <Input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="contact@example.com"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting || uploadingImage} className="w-full">
            {isSubmitting ? "Saving..." : initialData ? "Update Sponsor" : "Add Sponsor"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
