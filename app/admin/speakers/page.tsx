"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpeakerForm from "./speaker-form"
import Image from "next/image"

interface Speaker {
  id: string
  name: string
  title: string
  company?: string
  bio?: string
  image_url: string
}

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchSpeakers()
  }, [])

  const fetchSpeakers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("speakers").select("*").order("name")

    if (!error && data) {
      setSpeakers(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this speaker?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("speakers").delete().eq("id", id)

      if (error) throw error
      await fetchSpeakers()
    } catch (error) {
      console.error("Error deleting speaker:", error)
      alert("Error deleting speaker")
    }
  }

  const handleSuccess = async () => {
    await fetchSpeakers()
    setEditingSpeaker(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Manage Speakers</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            {(showForm || editingSpeaker) && (
              <>
                <SpeakerForm speaker={editingSpeaker} onSuccess={handleSuccess} />
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => {
                    setShowForm(false)
                    setEditingSpeaker(null)
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
            {!showForm && !editingSpeaker && (
              <Button onClick={() => setShowForm(true)} className="w-full">
                Add New Speaker
              </Button>
            )}
          </div>

          {/* Speakers List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Speakers ({speakers.length})</h2>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : speakers.length > 0 ? (
              <div className="space-y-4">
                {speakers.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="border border-border rounded-lg p-4 flex gap-4 items-start hover:shadow-md transition-shadow"
                  >
                    {speaker.image_url && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={speaker.image_url || "/placeholder.svg"}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold">{speaker.name}</h3>
                      <p className="text-sm text-accent">{speaker.title}</p>
                      {speaker.company && <p className="text-sm text-muted-foreground">{speaker.company}</p>}
                      {speaker.bio && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{speaker.bio}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingSpeaker(speaker)}
                        className="text-muted-foreground hover:text-accent"
                      >
                        <Edit2 size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(speaker.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No speakers yet. Add one to get started.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
