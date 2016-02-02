IR.interface.load = function(callback) {
  $.getJSON("config.json", function(data) {
    callback(data);
  });
};

$(function() {
  IR.remote.init();
});
