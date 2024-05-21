export const useLocalTime = (utc: string) => new Date(`${utc} UTC`).getTime()
