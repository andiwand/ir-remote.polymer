var IR = IR || {};

IR.remote = IR.remote || {};
$.extend(IR.remote, {
  _ready: false,
  _readyObservers: [],
  isReady: function() {
    return IR.remote._ready;
  },
  _setReady: function() {
    IR.remote._ready = true;
    var observers = IR.remote._readyObservers;
    for (var i = 0; i < observers.length; i++) {
      observers[i]();
    }
  },
  addReadyObserver: function(observer) {
    IR.remote._readyObservers.push(observer);
    if (IR.remote._ready) observer();
  },
  init: function(settings) {
    IR.remote.load = settings.load;
    IR.remote.save = settings.save;
    IR.remote._setReady();
  },
  load: null,
  save: null
});

// TODO: remove
IR.remote.init({
  load: function() {
    return {
      "remotes": [
        {
          "name": "Test Remote",
          "description": "blablabla this is so blablabla remote bla.",
          "grid": {
            "base_dimensions": [50, 50],
            "table": [
              {
                "col": 1,
                "row": 1,
                "size_x": 2,
                "size_y": 2,
                "button": "1"
              },
              {
                "col": 3,
                "row": 1,
                "size_x": 1,
                "size_y": 2,
                "button": "2"
              }
            ]
          },
          "buttons": {
            "1": {
              "name": "power",
              "short": "pwr",
              "icon": "",
              "frame": {
                "protocol": "nec",
                "data": 1234567
              }
            }
          }
        }
      ],
      "settings": {}
    };
  },
  save: function() {}
});
