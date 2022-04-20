const generateHash = () => {
  var today = new Date();
  var date = `${
    today.getUTCMonth() + 1
  }-${today.getUTCDate()}-${today.getFullYear()}`;
  var time = `${today.getUTCHours()}-${today.getUTCMinutes()}-${today.getUTCSeconds()}`;

  var key = `${date} ${time}`;
  var hash = 0;

  for (i = 0; i < key.length; i++) {
    char = key.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

module.exports = generateHash;
