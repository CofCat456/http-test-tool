let timer: NodeJS.Timeout | null = null

export default defineWebSocketHandler({
  async open(peer) {
    if (timer)
      clearInterval(timer)

    timer = setInterval(async () => {
      const lastData = await getLatestUrl()

      if (lastData !== null)
        peer.send(lastData)
    }, 5000)
  },
},
)
