<template>
  <form action="#">
    <my-input v-pass:value="value" />
  </form>
</template>
<script>
import MyInput from "./MyInput";
export default {
  name: "MyForm",
  components: {
    MyInput,
  },
  props: {
    value: {
      type: String,
      default: "v-pass",
    },
  },
};
</script>