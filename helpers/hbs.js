const moment = require("moment");

module.exports = {
  formatDate: (date, format) => {
    return moment(date).format(format);
  },
  // truncate long text to display part of the text
  truncate: (input) => {
    if (input.length > 150) {
      return input.substring(0, 150) + "...";
    }
    return input;
  },
  // to strip the text of html tags using regular expressions
  stripTags: (input) => {
    return input.replace(/<[^>]*>/g, "");
  },
};
