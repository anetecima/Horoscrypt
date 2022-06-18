const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const EMAIL_REGEX_LOCAL_PART = /^[a-zA-Z0-9"].*[a-zA-Z0-9"]$/im
const EMAIL_REGEX_QUOTED_STRING = /^["].*["]$/im

const EMAIL_NEEDS_CHAR_AFTER = /[!#$%&'*+-/=?^_`{|}~(),:;<>[\]\s]/g
const NON_ASCII_SYMBOLS = /[^\u0000-\u007f]/

export const validateEmail = email => {
  let isValid = false

  if (email) {
    //general symbol and format validation
    isValid = EMAIL_REGEX.test(email.toLowerCase()) && !NON_ASCII_SYMBOLS.test(email.toLowerCase())

    //check if first and last chars are alphanumeric
    if (isValid) {
      const localPart = email.slice(0, email.lastIndexOf('@'))
      isValid = EMAIL_REGEX_LOCAL_PART.test(localPart)

      //check if after every special symbol there's at least one alphanumeric
      if (!EMAIL_REGEX_QUOTED_STRING.test(localPart)) {
        isValid = localPart.split(EMAIL_NEEDS_CHAR_AFTER).every(item => item.length > 0)
      }
    }
  }

  return isValid
}
