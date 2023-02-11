
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/highlights/0',
        permanent: true,
      },
    ]
  },
}