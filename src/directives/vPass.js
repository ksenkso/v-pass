const warn = (message) => console.warn(`[v-pass]: ${message}`);

export const vPass = {
  bind(el, { arg }, vnode) {
    const eventName = `update:${arg}`;
    const component = vnode.componentInstance;
    if (component) {
      component.$on(eventName, (value) =>
        vnode.context.$emit(eventName, value)
      );
      vnode.componentOptions.propsData[arg] = vnode.context[arg];
      console.log(vnode);
    } else {
      warn("v-pass can only be used on a Vue component");
    }
  },
  update(el, { arg }, vnode) {}
};
