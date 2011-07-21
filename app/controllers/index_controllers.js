var actions = {};
actions.index = function(request,response){
  response.render('index',{
    properties: function (context, fn) {
      var props = JSON.parse("{" + fn(this) + "}");
      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          context[prop] = props[prop];
        }
      }
      return "";
    }
  });
};

module.exports = actions;
