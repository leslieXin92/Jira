module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'leslie' && req.body.password === 'leslie')
      return res.status(200).json({ token: 'leslie' })
    else return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}
