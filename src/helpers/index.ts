export async function withErrorHandling<T>(callback: () => Promise<T>): Promise<T | undefined> {
  try {
    return await callback()
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e)
      alert(e.message)
    } else {
      console.error("Unexpected error", e)
    }
  }
}
