<template>
  <div id="app">
    <json-tree :data="tree" />
    <my-form value="test" />
  </div>
</template>

<script>
import MyForm from "./components/MyForm";
const compiler = require("vue-template-compiler");
export default {
  name: "App",
  components: { MyForm },
  data() {
    return {
      tree: {},
    };
  },
  mounted() {
    const results = compiler.compile(
      `
      <my-form v-pass:value="value">
    `,
      {
        directives: {
          pass(node, { arg, rawName, value }) {
            const attr = {
              name: ":" + arg,
              value: value,
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
              dynamic: false,
            });
            // bind events
            const eventName = `update:${arg}`;
            const eventHandler = `$emit('update:${arg}', $event)`;
            node.attrsMap["@" + eventName] = eventHandler;
            node.attrsList.push({
              name: "@" + eventName,
              value: eventHandler,
            });
            if (!node.events) {
              node.events = {};
            }
            node.events[eventName] = {
              value: eventHandler,
              dynamic: false,
            };
            // remove directive itself
            let index = node.directives.findIndex((d) => d.rawName === rawName);
            node.directives.splice(index, 1);
            index = node.attrsList.findIndex((attr) => attr.name === rawName);
            node.attrsList.splice(index, 1);
          },
        },
      }
    );
    this.tree = results.ast;
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
