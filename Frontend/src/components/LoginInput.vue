<template>
  <label :class="{ 'focused' : focused }" class="input-label">
    <span class="label-event-input"> {{ title }} </span>
    <input
      @focusin="focused = true"
      v-bind="$attrs"
      v-on="$listeners"
      :class="`${name}-input input`"
      v-model="value" />
  </label>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class LoginInput extends Vue {
  @Prop(String) name: string;

  @Prop(String) title: string;

  public focused = false;

  public value = '';

  @Watch('inputValue')
  public updateValue(updateInputValue: string) {
    this.$emit('input', updateInputValue);
  }
}
</script>

<style lang="scss">
  .input-label {
    display: inline-block;
    width: 100%;
    margin-bottom: 15px;
    position: relative;
    transition: padding 0.3s ease-in;
    padding-top: 15px;
    &.focused {
      .label-event-input {
        transform: translateY(-10px);
      }
    }
    .label-event-input {
      text-align: left;
      display: block;
      z-index: 1;
      position: absolute;
      color: rgba(#2c3e50, 0.5);
      transition: transform 0.3s ease-out;
    }
    .input {
      background: transparent;
      z-index: 2;
      max-width: 100%;
      width: 100%;
      border-width: 0 0 2px 0;
      border-style: solid;
      border-color: #2c3e50;
      padding: 5px;
      font: 400 16px/1.25 'Alegreya Sans', sans-serif;
      &:hover {
        box-shadow: none;
        outline: none;
      }
    }
  }
</style>
