export function convertTimestamp(timestamp: string) {
  if (!timestamp || "") {
    return ""
  }

  const timestampNumber = +timestamp
  var d = new Date(timestampNumber),
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
    ampm = "AM",
    time

  if (hh > 12) {
    h = hh - 12
    ampm = "PM"
  } else if (hh === 12) {
    h = 12
    ampm = "PM"
  } else if (hh == 0) {
    h = 12
  }

  // ie: 2014-03-24, 3:00 PM
  time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm
  return time
}
