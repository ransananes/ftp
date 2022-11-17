// make padding
function pad2(n) {
  return n < 10 ? "0" + n : n;
}

//display date
function getDate() {
  let date = new Date();
  return (
    pad2(date.getDate()) +
    "/" +
    pad2(date.getMonth() + 1) +
    "/" +
    date.getFullYear().toString() +
    " " +
    pad2(date.getHours()) +
    ":" +
    pad2(date.getMinutes()) +
    ":" +
    pad2(date.getSeconds())
  );
}
module.exports = { getDate };
