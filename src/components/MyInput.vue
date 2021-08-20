<template>
  <input
    type="text"
    :value="value"
    @input="$emit('update:value', $event.target.input)"
  />
</template>
<script>
export default {
  name: "MyInput",
  props: {
    value: String,
  },
};
</script>