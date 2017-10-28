const flattenError = json => {
  let errMsgs = []
  for (let x in json) {
    if (json.hasOwnProperty(x)) {
      if (x === 'non_field_errors') {
        errMsgs.push(json.non_field_errors[0])
      } else if (x == 'nonFieldErrors') {
        errMsgs.push(json.nonFieldErrors[0])
      } else if (x === 'detail') {
        errMsgs.push(json.detail)
      } else {
        errMsgs.push(x + ': ' + json[x][0])
      }
    }
  }
  return errMsgs
}

module.exports = {flattenError}
