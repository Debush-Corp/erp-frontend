<template>
    <div class="create-user-form">
        <div class="head">
            <h2>Crear un usuario</h2>
            <img src="@/assets/icons/forms/form-close.svg" alt="icon-close">
        </div>
        <div class="body">
            <div class="group" id="group-username">
                <h3>Nombre de usuario</h3>
                <label>Especifica un nombre para este usuario. (*)</label>
                <input type="text" id="username" name="username" />
            </div>
            <div class="group" id="group-password">
                <h3>Contraseña</h3>
                <div class="desc">
                    <label>Genere una constraseña para este usuario. (*)</label>
                    <div class="buttons">
                        <button>
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_678_1284" fill="white">
                                    <path
                                        d="M12 7.5C12 10 9.31714 12.5 6 12.5C2.68286 12.5 0 9.81714 0 6.5C0 3.18286 2.68286 0.5 6 0.5C8.39143 0.5 10.4571 1.89714 11.4257 3.92857" />
                                </mask>
                                <path
                                    d="M12 7.5H10.4C10.4 8.17726 10.0223 9.01474 9.19804 9.72666C8.38998 10.4246 7.25728 10.9 6 10.9V12.5V14.1C8.05986 14.1 9.92716 13.3254 11.2898 12.1483C12.6363 10.9853 13.6 9.32274 13.6 7.5H12ZM6 12.5V10.9C3.56651 10.9 1.6 8.93349 1.6 6.5H0H-1.6C-1.6 10.7008 1.7992 14.1 6 14.1V12.5ZM0 6.5H1.6C1.6 4.06651 3.56651 2.1 6 2.1V0.5V-1.1C1.7992 -1.1 -1.6 2.2992 -1.6 6.5H0ZM6 0.5V2.1C7.75124 2.1 9.26819 3.12117 9.98148 4.61717L11.4257 3.92857L12.87 3.23997C11.6461 0.673117 9.03161 -1.1 6 -1.1V0.5Z"
                                    fill="#006CE0" mask="url(#path-1-inside-1_678_1284)" />
                                <path d="M11.5005 1.42822V4.70947L8.21436 4.68311V4.42822H11.2144V1.42822H11.5005Z"
                                    stroke="#006CE0" />
                            </svg>
                            <span>Generar</span></button>
                        <button>
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_678_1302)">
                                    <path
                                        d="M5.18136 10.161C4.73636 10.161 4.36062 10.0078 4.05416 9.70132C3.74769 9.39485 3.59446 9.01912 3.59446 8.57412V2.83104C3.59446 2.38604 3.74769 2.0103 4.05416 1.70384C4.36062 1.39737 4.73636 1.24414 5.18136 1.24414H9.4131C9.8581 1.24414 10.2338 1.39737 10.5403 1.70384C10.8468 2.0103 11 2.38604 11 2.83104V8.57412C11 9.01912 10.8468 9.39485 10.5403 9.70132C10.2338 10.0078 9.8581 10.161 9.4131 10.161H5.18136ZM5.18136 8.57412H9.4131V2.83104H5.18136V8.57412ZM2.5869 12.7555C2.1419 12.7555 1.76616 12.6022 1.4597 12.2958C1.15323 11.9893 1 11.6136 1 11.1686V3.8386H2.5869V11.1686H8.40554V12.7555H2.5869Z"
                                        fill="#006CE0" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_678_1302">
                                        <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Copiar</span></button>
                    </div>
                </div>
                <input type="text" id="password" name="password" disabled/>
                <label class="info">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.81898 10.6812H8.18117V6.87508H6.81898V10.6812ZM7.50008 5.69977C7.69831 5.69977 7.86451 5.63273 7.99867 5.49867C8.13273 5.36451 8.19977 5.19831 8.19977 5.00008C8.19977 4.80185 8.13273 4.63565 7.99867 4.50149C7.86451 4.36742 7.69831 4.30039 7.50008 4.30039C7.30185 4.30039 7.13565 4.36742 7.00148 4.50149C6.86742 4.63565 6.80039 4.80185 6.80039 5.00008C6.80039 5.19831 6.86742 5.36451 7.00148 5.49867C7.13565 5.63273 7.30185 5.69977 7.50008 5.69977ZM7.50008 13.8771C6.6156 13.8771 5.7857 13.7098 5.01039 13.3752C4.23497 13.0407 3.56049 12.5866 2.98695 12.0132C2.41352 11.4397 1.95951 10.7652 1.62492 9.98977C1.29034 9.21445 1.12305 8.38456 1.12305 7.50008C1.12305 6.6156 1.29034 5.7857 1.62492 5.01039C1.95951 4.23497 2.41352 3.56049 2.98695 2.98695C3.56049 2.41352 4.23497 1.95951 5.01039 1.62492C5.7857 1.29034 6.6156 1.12305 7.50008 1.12305C8.38456 1.12305 9.21445 1.29034 9.98977 1.62492C10.7652 1.95951 11.4397 2.41352 12.0132 2.98695C12.5866 3.56049 13.0407 4.23497 13.3752 5.01039C13.7098 5.7857 13.8771 6.6156 13.8771 7.50008C13.8771 8.38456 13.7098 9.21445 13.3752 9.98977C13.0407 10.7652 12.5866 11.4397 12.0132 12.0132C11.4397 12.5866 10.7652 13.0407 9.98977 13.3752C9.21445 13.7098 8.38456 13.8771 7.50008 13.8771ZM7.50008 12.4552C8.88591 12.4552 10.0583 11.9759 11.0171 11.0171C11.9759 10.0583 12.4552 8.88591 12.4552 7.50008C12.4552 6.11424 11.9759 4.9419 11.0171 3.98305C10.0583 3.0243 8.88591 2.54492 7.50008 2.54492C6.11424 2.54492 4.9419 3.0243 3.98305 3.98305C3.0243 4.9419 2.54492 6.11424 2.54492 7.50008C2.54492 8.88591 3.0243 10.0583 3.98305 11.0171C4.9419 11.9759 6.11424 12.4552 7.50008 12.4552Z"
                            fill="#9BA7B6" />
                    </svg>
                    <span>La contraseña se mostrará solo en este formulario. Si la olvida, deberá generar una
                        nueva.</span>
                </label>
            </div>
            <div class="group" id="group-document">
                <h3>Documento de identidad</h3>
                <label>Especifica el DNI u otro documento para este usuario (*)</label>
                <input type="text" id="document" name="document" />
            </div>
            <div class="group" id="group-roles">
                <h3>Roles</h3>
                <label>Seleccione los roles para este usuario. (*)</label>
                <div class="input-wrapper">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.27694 1.35858C6.87622 0.648385 7.97046 0.648386 8.56974 1.35858L13.5686 7.28265C14.3915 8.25791 13.6983 9.75 12.4222 9.75H2.4245C1.14842 9.75 0.45515 8.25791 1.2781 7.28265L6.27694 1.35858Z"
                            fill="#9BA7B6" />
                    </svg>
                    <input type="text" id="roles" name="roles" disabled />
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="btn-secondary" id="btn-cancel">Cancelar</button>
            <button class="btn-primary" id="btn-create">Crear</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.create-user-form {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.head {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px;

    h2 {
        margin: 0;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 18px;
        color: #0F141A;
    }
}

.body {
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-sizing: border-box;
    padding: 0px 20px;
}

.body .group {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: sans-serif;

    h3 {
        font-size: 15px;
        font-weight: 600;
        color: #0F141A;
        margin: 0;
    }

    .desc {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: start;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        gap: 0px;

        button {
            border: none;
            background: transparent;
            color: #006CE0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 5px;
            cursor: pointer;
        }
    }

    label {
        font-size: 12px;
        color: #5F6B7A;
    }

    .info {
        height: auto;
        color: #9BA7B6;
        display: flex;
        flex-direction: row;
        align-items: start;
        gap: 5px;
        text-wrap: wrap;

        svg {
            width: 14px;
            height: 14px;
        }
    }

    input {
        font-size: 13px;
        font-weight: 400;
        color: #080F1E;
        display: flex;
        box-sizing: border-box;
        padding: 8px 10px;
        border: none;
        border: 2px solid #7D8998;
        border-radius: 8px;
    }

    input:disabled {
        background: #F9F9F9;
    }

    input:focus {
        border: 2px solid #006CE0;
    }

    .input-wrapper {
        position: relative;
        input {
            width: 100%;
            padding: 8px 30px 8px 10px;
        }
        svg {
            position: absolute;
            top: calc(50% - 5px );
            right: 10px;
        }
    }
}

.foot {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 15px;
    box-sizing: border-box;
    padding: 20px;
    border-top: 1px solid #B6BEC9;
}

.foot button {
    border: none;
    padding: 0px 15px;
    border-radius: 17px;
    font-weight: 600;
    cursor: pointer;
}

#btn-cancel {
    background: transparent;
    color: #006CE0;
}

#btn-cancel:hover {
    color: #012B66;
}

#btn-create {
    background: #FFC756;
    color: #0F141A;
}

#btn-create:hover {
    background: #ffb056;
}

@media screen and (min-width: 769px) {
    .create-user-form {
        min-width: 500px;
        width: 40%;
        height: 90%;
        border-radius: 24px;
    }

    .foot button {
        height: 34px;
    }
}

@media screen and (max-width: 768px) {
    .create-user-form {
        width: 100%;
        height: 100%;
        border-radius: 0px;
    }

    .foot button {
        height: 25px;
    }
}
</style>