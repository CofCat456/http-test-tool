export default defineWebSocketHandler({
  async open(peer) {
    const lastData = getLatestUrl()
    peer.send(lastData)

    db.function('logger', { varargs: true, deterministic: true }, (...values: any[]) => {
      const [id, created_at, url, event, data] = values

      peer.send({
        id,
        created_at,
        url,
        event,
        data,
      })
    })

    db.prepare('DROP TRIGGER IF EXISTS insertHook;').run()
    db.prepare(
      'CREATE TRIGGER insertHook AFTER INSERT ON urls BEGIN SELECT logger(NEW.id, NEW.created_at, NEW.url, NEW.event, NEW.data); END',
    ).run()
  },
},
)
