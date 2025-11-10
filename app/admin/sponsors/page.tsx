"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { ArrowLeft, Trash2, Edit2 } from "lucide-react"
import { SponsorForm } from "./sponsor-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { deleteSponsor } from "@/app/actions/admin"

interface Sponsor {
  id: string
  name: string
  logo_url: string
  website: string
  tier: string
  description: string
  contact_email: string
}

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from("sponsors").select("*").order("created_at", { ascending: false })
      setSponsors(data || [])
    } catch (error) {
      console.error("Error fetching sponsors:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sponsor?")) return

    try {
      await deleteSponsor(id)
      await fetchSponsors()
    } catch (error) {
      console.error("Error deleting sponsor:", error)
      alert("Failed to delete sponsor")
    }
  }

  const editingSponsors = editingId ? sponsors.find((s) => s.id === editingId) : null

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/admin" className="text-accent hover:underline">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Manage Sponsors</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Form */}
          <SponsorForm
            initialData={editingSponsors || undefined}
            onSuccess={() => {
              setEditingId(null)
              fetchSponsors()
            }}
          />

          {/* Sponsors List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Current Sponsors ({sponsors.length})</h2>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading sponsors...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sponsors.map((sponsor) => (
                  <Card key={sponsor.id} className="flex flex-col">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-start gap-4">
                        {sponsor.logo_url && (
                          <div className="w-20 h-20 rounded-lg border border-border bg-background p-1 flex-shrink-0">
                            <img
                              src={sponsor.logo_url || "/placeholder.svg"}
                              alt={sponsor.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg">{sponsor.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{sponsor.tier} Tier</p>
                          {sponsor.website && (
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-accent hover:underline truncate block"
                            >
                              {sponsor.website}
                            </a>
                          )}
                        </div>
                      </div>

                      {sponsor.description && <p className="text-sm text-muted-foreground">{sponsor.description}</p>}

                      {sponsor.contact_email && (
                        <a href={`mailto:${sponsor.contact_email}`} className="text-sm text-accent hover:underline">
                          {sponsor.contact_email}
                        </a>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(sponsor.id)}
                          className="gap-1 flex-1"
                        >
                          <Edit2 size={16} />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(sponsor.id)}
                          className="gap-1"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && sponsors.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No sponsors yet. Add your first sponsor above!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
