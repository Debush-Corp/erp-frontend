import type { DirectiveBinding, ObjectDirective } from 'vue'

const vOnceClick: ObjectDirective = {
  beforeMount(el: HTMLButtonElement, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      console.warn('v-once-click necesita una función async.')
      return
    }

    el.addEventListener('click', async () => {
      if (el.disabled) return

      el.disabled = true
      try {
        const result = binding.value()
        if (result instanceof Promise) {
          await result
        }
      } catch (err) {
        console.error('Error en v-once-click:', err)
      } finally {
        el.disabled = false
      }
    })
  }
}

export default vOnceClick