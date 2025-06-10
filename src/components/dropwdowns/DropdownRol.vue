<template>
    <div class="dropdown-rol">
        <div class="family-rol" v-for="(valueFamily, keyFamily, i) in props.data" :key="keyFamily">
            <div class="family-name">
                <span>{{ valueFamily.name }}</span>
            </div>
            <div class="separator"></div>
            <template v-for="(valueRol, keyRol, j) in valueFamily.roles" :key="keyRol">
                <div class="rol">
                    <div class="rol-left">
                        <input type="checkbox" name="" id="" @click="rolClicked(keyRol, valueRol.name)">
                        <span>{{ valueRol.name }}</span>
                    </div>
                    <div class="rol-rigth">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.81898 10.6812H8.18117V6.87508H6.81898V10.6812ZM7.50008 5.69977C7.69831 5.69977 7.86451 5.63273 7.99867 5.49867C8.13273 5.36451 8.19977 5.19831 8.19977 5.00008C8.19977 4.80185 8.13273 4.63565 7.99867 4.50149C7.86451 4.36742 7.69831 4.30039 7.50008 4.30039C7.30185 4.30039 7.13565 4.36742 7.00148 4.50149C6.86742 4.63565 6.80039 4.80185 6.80039 5.00008C6.80039 5.19831 6.86742 5.36451 7.00148 5.49867C7.13565 5.63273 7.30185 5.69977 7.50008 5.69977ZM7.50008 13.8771C6.6156 13.8771 5.7857 13.7098 5.01039 13.3752C4.23497 13.0407 3.56049 12.5866 2.98695 12.0132C2.41352 11.4397 1.95951 10.7652 1.62492 9.98977C1.29034 9.21445 1.12305 8.38456 1.12305 7.50008C1.12305 6.6156 1.29034 5.7857 1.62492 5.01039C1.95951 4.23497 2.41352 3.56049 2.98695 2.98695C3.56049 2.41352 4.23497 1.95951 5.01039 1.62492C5.7857 1.29034 6.6156 1.12305 7.50008 1.12305C8.38456 1.12305 9.21445 1.29034 9.98977 1.62492C10.7652 1.95951 11.4397 2.41352 12.0132 2.98695C12.5866 3.56049 13.0407 4.23497 13.3752 5.01039C13.7098 5.7857 13.8771 6.6156 13.8771 7.50008C13.8771 8.38456 13.7098 9.21445 13.3752 9.98977C13.0407 10.7652 12.5866 11.4397 12.0132 12.0132C11.4397 12.5866 10.7652 13.0407 9.98977 13.3752C9.21445 13.7098 8.38456 13.8771 7.50008 13.8771ZM7.50008 12.4552C8.88591 12.4552 10.0583 11.9759 11.0171 11.0171C11.9759 10.0583 12.4552 8.88591 12.4552 7.50008C12.4552 6.11424 11.9759 4.9419 11.0171 3.98305C10.0583 3.0243 8.88591 2.54492 7.50008 2.54492C6.11424 2.54492 4.9419 3.0243 3.98305 3.98305C3.0243 4.9419 2.54492 6.11424 2.54492 7.50008C2.54492 8.88591 3.0243 10.0583 3.98305 11.0171C4.9419 11.9759 6.11424 12.4552 7.50008 12.4552Z"
                                fill="#9BA7B6" />
                        </svg>
                        <span class="tooltip">
                            {{ valueRol.description }}
                        </span>
                    </div>
                </div>
                <div v-if="i + 1 < Object.keys(props.data).length || j < Object.keys(valueRol).length"
                    class="separator"></div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { RolSelected } from '@/types/rol-selected.interfaces';
const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
const emits = defineEmits(['rol-clicked'])

const rolClicked = (keyRol: number, nameRol: string) => {
    const rolSelected: RolSelected = {id: keyRol, name: nameRol}
    emits('rol-clicked', rolSelected)
}
</script>

<style scoped lang="scss">
.dropdown-rol {
    height: auto;
    display: flex;
    flex-direction: column;
    border: 2px solid #B6BEC9;
    border-radius: 8px;
}

.dropdown-rol .separator {
    width: 100%;
    height: 1px;
    background: #B6BEC9;
}

.family-rol {
    width: 100%;
    height: auto;
    font-size: 13px;
}

.family-name,
.rol {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 8px 10px;
}

.family-name {
    font-weight: bold;
    color: #0F141A;
}

.rol {
    font-weight: 400;
    color: #000716;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.rol-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

.rol-left span {
    text-align: center;
    text-wrap: wrap;
}

.rol-rigth {
    position: relative;
    height: 15px;
    width: 15px;
}

.rol-rigth svg:hover path {
    fill: #006CE0
}

.rol-rigth .tooltip {
    position: absolute;
    bottom: 0px;
    right: 20px;
    width: auto;
    height: auto;
    background: #006CE0;
    display: flex;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), ;
    font-family: sans-serif;
    font-size: 12px;
    color: #fff;
    line-height: 1.2;
}

.rol-rigth:has(svg:hover) .tooltip{
    opacity: 1;
}

@media screen and (min-width: 769px) {
  .rol-rigth .tooltip {
    display: inline-block;
    border-radius: 8px 8px 0px 8px;
    padding: 10px;
    width: 300px;
    max-width: 800px;
    overflow-wrap: anywhere;
    overflow-wrap: break-word;
  }
}

@media screen and (max-width: 768px) {
  .rol-rigth .tooltip {
    width: 200px;
    white-space: normal;
    border-radius: 12px;
    padding: 10px;
  }
}
</style>
