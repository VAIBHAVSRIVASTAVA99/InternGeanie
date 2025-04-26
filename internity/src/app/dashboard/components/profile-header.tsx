"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfileHeader() {
  const router = useRouter()
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Premium Member",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    joinDate: "Member since Jan 2023",
  })

  return (
    <div className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 -mt-12">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="pt-12 md:pt-0 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {user.role}
                  </Badge>
                  <span className="text-sm text-gray-500">{user.joinDate}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit size={16} />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 gap-1" onClick={() => router.push("/login")}>
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

