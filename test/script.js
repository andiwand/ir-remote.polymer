$(function() {
  ir.interface.load = function(callback) {
    $.getJSON("config.json", function(data) {
      callback(data);
    });
  };

  ir.remote.init();
});
