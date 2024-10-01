import moment from "moment-timezone";

export function getCurrentDateInLosAngeles() {
  const dateString = moment().tz("America/Los_Angeles").toString();
  const timeZoneId = "America/Los_Angeles";
  
  const offset = moment["tz"](moment(new Date()), timeZoneId).utcOffset() * 60000;

  // Create a new Date object with the calculated offset minus an additional hour. Doing this because it seems to be 1hr ahead without it
  const dateInLA = new Date(new Date(dateString).getTime() + offset - (60 * 60 * 1000)); // Subtracting an additional hour
  
//   console.log('Date in Los Angeles with an additional hour subtracted:', dateInLA);
  return dateInLA;
}

export function getCurrentDateInLosAngelesFormatted() {
  return moment().tz("America/Los_Angeles").format("YYYY-MM-DD");
}

export function getPreviousDateInLosAngelesFormatted() {
  return moment()
    .tz("America/Los_Angeles")
    .subtract(1, "day")
    .format("YYYY-MM-DD");
}

export function getNextDateInLosAngelesFormatted() {
    console.log('tomorrow is', moment().tz("America/Los_Angeles").add(1, "day").format("YYYY-MM-DD"))
  return moment().tz("America/Los_Angeles").add(1, "day").format("YYYY-MM-DD");
}
