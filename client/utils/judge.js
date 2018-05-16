module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  isMac: process.platform === 'darwin',
  isLinux: process.platform === 'linux',
  isWindows: process.platform === 'win32',
}
