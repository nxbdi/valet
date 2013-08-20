// Generated by CoffeeScript 1.6.3
(function() {
  var emitter, splitter;

  splitter = function(namespace) {
    var arg, built, emit_to, idx, last, socketspace, split, _i, _len;
    while (namespace[namespace.length - 1] === '/') {
      namespace = namespace.substr(0, namespace.length - 1);
    }
    while (namespace[0] === '/') {
      namespace = namespace.substr(1, namespace.length);
    }
    split = namespace.split('/');
    socketspace = {
      raw: namespace,
      last: null,
      parsed: {}
    };
    emit_to = [];
    if (split.length % 2 > 0) {
      last = split[split.length - 1];
      socketspace.last = last;
      emit_to.push("/" + last);
    }
    built = '';
    for (idx = _i = 0, _len = split.length; _i < _len; idx = ++_i) {
      arg = split[idx];
      built += "/" + arg;
      if (idx % 2 > 0) {
        if (last) {
          emit_to.push("" + built + "/" + last);
        } else {
          emit_to.push(built);
        }
        socketspace.parsed[split[idx - 1]] = split[idx];
      }
    }
    return {
      emit_to: emit_to,
      socketspace: socketspace
    };
  };

  emitter = function(emit_to, socketspace, event, data, io) {
    var namespace, _i, _len, _results;
    data.socket_namespace = socketspace;
    _results = [];
    for (_i = 0, _len = emit_to.length; _i < _len; _i++) {
      namespace = emit_to[_i];
      console.log("emitting '" + event + "' to members of " + namespace);
      _results.push(io.of(namespace).emit(event, data));
    }
    return _results;
  };

  module.exports = {
    splitter: splitter,
    emitter: emitter
  };

}).call(this);

/*
//@ sourceMappingURL=utils.map
*/