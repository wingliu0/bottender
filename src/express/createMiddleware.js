function createMiddleware(bot) {
  const requestHandler = bot.createRequestHandler();
  return async (req, res) => {
    if (!req.body) {
      throw new Error(
        'createMiddleware(): Missing body parser. Use `body-parser` or other similar package before this middleware.'
      );
    }
    const response = await requestHandler({ req, body: req.body });
    if (response) {
      res.set(response.headers || {});
      res.status(response.status || 200);
      res.send(response.body || '');
    } else {
      res.status(200);
      res.send('');
    }
  };
}

export default createMiddleware;
