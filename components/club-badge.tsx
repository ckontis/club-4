interface ClubBadgeProps {
  clubName: string
  size?: "sm" | "md" | "lg"
}

export function ClubBadge({ clubName, size = "md" }: ClubBadgeProps) {
  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base",
  }

  // Generate a consistent color based on club name
  const getClubColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div
      className={`${sizeClasses[size]} ${getClubColor(clubName)} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
    >
      {clubName.substring(0, 3).toUpperCase()}
    </div>
  )
}
