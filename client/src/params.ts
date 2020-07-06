// Get the hash of the url
const hash= function () {
  
  return window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial:any, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
}

export default hash;
