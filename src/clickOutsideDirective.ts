// src/directives/clickOutside.ts
import type { DirectiveBinding } from 'vue';

interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void;
}

const clickOutsideDirective = {
  beforeMount(el: HTMLElementWithClickOutside, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLElementWithClickOutside) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  },
};

export default clickOutsideDirective;