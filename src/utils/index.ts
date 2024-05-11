const nodeCrypto = require('crypto')

// const password = '123456'
const salt = 'zjp_yfc_888'
const iterations = 1000
const keyLength = 32
const digest = 'sha512'
export function encryptPassword(password) {
  const encryptedPassword = nodeCrypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLength,
    digest
  )
  return encryptedPassword.toString('hex')
}

export function verifyPassword(password, encryptedPassword) {
  const newEncryptedPassword = nodeCrypto
    .pbkdf2Sync(password, salt, iterations, keyLength, digest)
    .toString('hex')
  return newEncryptedPassword === encryptedPassword
}

// const encryptedPassword = encryptPassword(password, salt)
// console.log('加密后的密码：', encryptedPassword)

// const isPasswordCorrect = verifyPassword(password, salt, encryptedPassword)
// console.log('密码是否正确：', isPasswordCorrect)
