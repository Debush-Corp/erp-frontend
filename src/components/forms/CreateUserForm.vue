<template>
    <div class="create-user-form">
        <div class="head">
            <h2>Crear un usuario</h2>
            <img src="@/assets/icons/forms/form-close.svg" alt="icon-close">
        </div>
        <div class="body"></div>
        <div class="foot">

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
    padding: 0px 20px;

    h2 {
        font-family: sans-serif;
        font-weight: bold;
        font-size: 18px;
        color: #0F141A;
    }
}

.body {
    width: 100%;
    height: 100%;
    background: gray;
}

.foot {
    width: 100%;
    height: 70px;
}

@media screen and (min-width: 769px) {
    .create-user-form {
        width: 40%;
        height: 90%;
        border-radius: 20px;
    }
}

@media screen and (max-width: 768px) {
    .create-user-form {
        width: 90%;
        height: 100%;
        border-radius: 0px;
    }
}
</style>