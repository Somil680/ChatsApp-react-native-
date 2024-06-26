export const getRoomId = (currentUser: any, otherUser: any) => {
  const sortedId = [currentUser, otherUser].sort()
  const roomId = sortedId.join('')
  return roomId
}
export function secondsToDate(seconds: any) {
  const date = new Date(seconds * 1000) // convert seconds to milliseconds
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const day = date.getDate()
  const month = monthNames[date.getMonth()]

  return `${day} ${month}`
}

export function convertSecondsToTime(seconds: any) {
  // Calculate the total hours and minutes from seconds
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds % 3600) / 60)

  // Ensure hours and minutes are padded to two digits
  let formattedHours = String(hours).padStart(2, '0')
  let formattedMinutes = String(minutes).padStart(2, '0')

  // Combine hours and minutes into the final 24-hour time format
  return `${formattedHours}:${formattedMinutes}`
}
