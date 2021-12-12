module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          directives: {
            pass(node, { arg, rawName, value }) {
              const attr = {
                name: ":" + arg,
                value: value
              };

              // add attrs and bind current value
              node.attrsList.push(attr);
              node.attrsMap[attr.name] = attr.value;

              if (!node.attrs) {
                node.attrs = [];
              }

              node.attrs.push({
                name: arg,
                value: value,
                dynamic: false
              });

              // bind events
              const eventName = `update:${arg}`;
              const eventHandler = `$emit('update:${arg}', $event)`;
              const attrName = `@${eventName}`;

              node.attrsMap[attr] = eventHandler;
              node.attrsList.push({
                name: attrName,
                value: eventHandler
              });

              if (!node.events) {
                node.events = {};
              }

              node.events[eventName] = {
                value: eventHandler,
                dynamic: false
              };

              // remove directive itself
              const directiveIndex = node.directives.findIndex((d) => d.rawName === rawName);
              const attrIndex = node.attrsList.findIndex((attr) => attr.name === rawName);

              node.directives.splice(directiveIndex, 1);
              node.attrsList.splice(attrIndex, 1);
            }
          }
        };
        return options;
      });
  }
};
