"use client"

import { useRouter } from "next/navigation"
import { LogOut, Settings, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface UserNavProps {
  user: {
    email?: string
    user_metadata?: {
      name?: string
      avatar_url?: string
    }
  }
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const initials = user.user_metadata?.name
    ? user.user_metadata.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold hover:bg-indigo-600 transition-colors"
      >
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-20">
            <div className="p-4 border-b border-slate-700">
              <p className="text-sm font-medium text-white">
                {user.user_metadata?.name || "Utilisateur"}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  router.push("/settings")
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Paramètres
              </button>

              <button
                onClick={() => {
                  router.push("/profile")
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                Profil
              </button>

              <div className="my-2 border-t border-slate-700" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
