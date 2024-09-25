export const formatTimeDuration = (time: string | undefined) => {
  if (time) {
    return `${Math.round(parseInt(time) / 60)} m`
  }
}