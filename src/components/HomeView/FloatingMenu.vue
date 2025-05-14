<template>
    <div class="menu">
        <nav>
            <router-link to="/users" class="menu-button"
                        :class="{ 'active': $route.path === '/users' }">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="33" height="33" rx="8" fill="white" />
                    <path
                        d="M19.92 13.46C19.92 14.367 19.5597 15.2369 18.9183 15.8783C18.2769 16.5197 17.4071 16.88 16.5 16.88C15.593 16.88 14.7231 16.5197 14.0817 15.8783C13.4403 15.2369 13.08 14.367 13.08 13.46C13.08 12.553 13.4403 11.6831 14.0817 11.0417C14.7231 10.4003 15.593 10.04 16.5 10.04C17.4071 10.04 18.2769 10.4003 18.9183 11.0417C19.5597 11.6831 19.92 12.553 19.92 13.46Z"
                        fill="#985184" />
                    <path
                        d="M11.56 16.12C11.56 16.5231 11.3999 16.9098 11.1148 17.1948C10.8298 17.4799 10.4431 17.64 10.04 17.64C9.63689 17.64 9.25027 17.4799 8.96522 17.1948C8.68016 16.9098 8.52002 16.5231 8.52002 16.12C8.52002 15.7169 8.68016 15.3303 8.96522 15.0452C9.25027 14.7601 9.63689 14.6 10.04 14.6C10.4431 14.6 10.8298 14.7601 11.1148 15.0452C11.3999 15.3303 11.56 15.7169 11.56 16.12Z"
                        fill="#FBB945" />
                    <path
                        d="M24.48 16.12C24.48 16.5231 24.3199 16.9098 24.0348 17.1948C23.7497 17.4799 23.3631 17.64 22.96 17.64C22.5569 17.64 22.1703 17.4799 21.8852 17.1948C21.6001 16.9098 21.44 16.5231 21.44 16.12C21.44 15.7169 21.6001 15.3303 21.8852 15.0452C22.1703 14.7601 22.5569 14.6 22.96 14.6C23.3631 14.6 23.7497 14.7601 24.0348 15.0452C24.3199 15.3303 24.48 15.7169 24.48 16.12Z"
                        fill="#1AD3BB" />
                    <path
                        d="M16.5 18.4H8.52C8.11687 18.4 7.73025 18.5601 7.4452 18.8452C7.16014 19.1302 7 19.5169 7 19.92V21.44C7 21.8431 7.16014 22.2297 7.4452 22.5148C7.73025 22.7999 8.11687 22.96 8.52 22.96H16.5V18.4Z"
                        fill="#FBB945" />
                    <path
                        d="M24.48 18.4H16.5V22.96H24.48C24.8831 22.96 25.2697 22.7999 25.5548 22.5148C25.8399 22.2297 26 21.8431 26 21.44V19.92C26 19.5169 25.8399 19.1302 25.5548 18.8452C25.2697 18.5601 24.8831 18.4 24.48 18.4Z"
                        fill="#1AD3BB" />
                    <path
                        d="M11.56 18.4H16.88C19.3983 18.4 21.44 20.4417 21.44 22.96H16.12C13.6017 22.96 11.56 20.9183 11.56 18.4Z"
                        fill="#985184" />
                </svg>
                <div>
                    <h2>Usuarios</h2>
                    <p>Centraliza la gestión de usuarios del sistema.</p>
                </div>
            </router-link>
            <hr>
            <router-link to="/inventory" class="menu-button"
                        :class="{ 'active': $route.path === '/inventory' }">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="33" height="33" rx="8" fill="white" />
                    <path d="M16.5 6.42L19.7913 8.34L11.94 13.62V21.3L12.18 24.06L7.85999 21.54V11.46L16.5 6.42Z"
                        fill="#FBB945" />
                    <path
                        d="M13.1818 24.6442L10.2355 22.9258V12.9L18.9221 7.83264L21.9379 9.59184L15.0605 15.78L13.1818 24.6442Z"
                        fill="#F86126" />
                    <path d="M21.9374 9.5928L25.14 11.46V21.54L16.5 26.58L13.1813 24.6446V14.7L21.9374 9.59184V9.5928Z"
                        fill="#985184" />
                </svg>
                <div>
                    <h2>Inventario</h2>
                    <p>Gestiona el stock de tus productos e insumos.</p>
                </div>
            </router-link>
            <hr>
            <router-link to="/fabrication" class="menu-button"
                        :class="{ 'active': $route.path === '/fabrication' }">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="33" height="33" rx="8" fill="white" />
                    <path
                        d="M26 14.2287C26 13.9494 25.7199 13.7613 25.4687 13.8723L14.8287 18.5854C14.7603 18.6165 14.7022 18.6667 14.6616 18.73C14.621 18.7933 14.5996 18.867 14.6 18.9422V22.5712C14.6 22.7859 14.7702 22.96 14.98 22.96H24.48C25.3198 22.96 26 22.2646 26 21.4062V14.2287Z"
                        fill="#FBB945" />
                    <path
                        d="M22.96 12.3268C22.96 12.0525 22.6868 11.8655 22.4371 11.9689L11.0371 16.6786C10.9666 16.7081 10.9064 16.758 10.8642 16.8218C10.8219 16.8856 10.7996 16.9604 10.8 17.0369V22.5735C10.8 22.7871 10.9702 22.96 11.18 22.96H21.44C22.2798 22.96 22.96 22.268 22.96 21.4141V12.3268Z"
                        fill="#FC868B" />
                    <path
                        d="M22.96 14.9838L14.8287 18.5854C14.69 18.647 14.6 18.7868 14.6 18.9419V22.5716C14.6 22.786 14.7702 22.96 14.98 22.96H21.44C22.2798 22.96 22.96 22.2676 22.96 21.4142V14.9838Z"
                        fill="#F86126" />
                    <path
                        d="M19.16 10.4257C19.16 10.1521 18.8868 9.9659 18.6371 10.0685L7.23712 14.7668C7.16669 14.7962 7.10657 14.8459 7.06436 14.9094C7.02215 14.973 6.99975 15.0477 7 15.124V22.5747C7 22.7875 7.17024 22.96 7.38 22.96H17.64C18.4798 22.96 19.16 22.2695 19.16 21.418V10.4257Z"
                        fill="#1AD3BB" />
                    <path
                        d="M19.16 13.3228L11.0371 16.6786C10.9666 16.7082 10.9064 16.758 10.8642 16.8218C10.8219 16.8856 10.7996 16.9604 10.8 17.0369V22.5735C10.8 22.7871 10.9702 22.96 11.18 22.96H17.64C18.4798 22.96 19.16 22.2695 19.16 21.418V13.3228Z"
                        fill="#1A6F66" />
                </svg>
                <div>
                    <h2>Fabricación</h2>
                    <p>Órdenes de fabricación y listas de materiales.</p>
                </div>
            </router-link>
            <hr>
            <router-link to="/market" class="menu-button"
                        :class="{ 'active': $route.path === '/market' }">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="33" height="33" rx="8" fill="white" />
                    <g clip-path="url(#clip0_527_1351)">
                        <path
                            d="M10.61 10.04L9.28003 20.68H11.5672C11.6148 21.3006 11.8949 21.8804 12.3515 22.3033C12.8081 22.7263 13.4076 22.9613 14.03 22.9613C14.6524 22.9613 15.2519 22.7263 15.7085 22.3033C16.1652 21.8804 16.4453 21.3006 16.4928 20.68H16.5C16.5 21.2847 16.7402 21.8646 17.1678 22.2922C17.5954 22.7198 18.1753 22.96 18.78 22.96C19.3847 22.96 19.9646 22.7198 20.3922 22.2922C20.8198 21.8646 21.06 21.2847 21.06 20.68H21.0672C21.1148 21.3006 21.3949 21.8804 21.8515 22.3033C22.3081 22.7263 22.9076 22.9613 23.53 22.9613C24.1524 22.9613 24.7519 22.7263 25.2085 22.3033C25.6652 21.8804 25.9453 21.3006 25.9928 20.68H26V20.3L25.9829 20.1963C25.9771 20.1471 25.9698 20.0982 25.9609 20.0496L25.9521 20.0047L25.9445 19.9667L24.5017 11.3103C24.4426 10.9554 24.2595 10.633 23.985 10.4004C23.7105 10.1677 23.3624 10.0401 23.0026 10.04H10.61Z"
                            fill="#985184" />
                        <path
                            d="M12.32 10.04L11.56 20.68C11.56 21.2847 11.3198 21.8646 10.8922 22.2922C10.4646 22.7198 9.88469 22.96 9.28 22.96C8.67531 22.96 8.09538 22.7198 7.6678 22.2922C7.24021 21.8646 7 21.2847 7 20.68V20.3L8.32772 11.3373C8.38113 10.9767 8.56236 10.6473 8.83839 10.4091C9.11441 10.171 9.46683 10.04 9.83138 10.04H12.32ZM20.3 10.04L21.06 20.68C21.06 21.2847 20.8198 21.8646 20.3922 22.2922C19.9646 22.7198 19.3847 22.96 18.78 22.96C18.1753 22.96 17.5954 22.7198 17.1678 22.2922C16.7402 21.8646 16.5 21.2847 16.5 20.68V10.04H20.3Z"
                            fill="#FBB945" />
                        <path
                            d="M11.56 20.68C11.56 21.2847 11.3198 21.8646 10.8922 22.2922C10.4646 22.7198 9.88469 22.96 9.28 22.96C8.67531 22.96 8.09538 22.7198 7.6678 22.2922C7.24021 21.8646 7 21.2847 7 20.68H11.56ZM21.06 20.68C21.06 21.2847 20.8198 21.8646 20.3922 22.2922C19.9646 22.7198 19.3847 22.96 18.78 22.96C18.1753 22.96 17.5954 22.7198 17.1678 22.2922C16.7402 21.8646 16.5 21.2847 16.5 20.68H21.06Z"
                            fill="#F78613" />
                        <path
                            d="M11.5676 20.68C11.6158 21.3001 11.8961 21.8793 12.3526 22.3017C12.8091 22.7242 13.4082 22.9588 14.0302 22.9588C14.6522 22.9588 15.2513 22.7242 15.7078 22.3017C16.1643 21.8793 16.4447 21.3001 16.4928 20.68H11.5676ZM21.0676 20.68C21.1158 21.3001 21.3961 21.8793 21.8526 22.3017C22.3091 22.7242 22.9082 22.9588 23.5302 22.9588C24.1522 22.9588 24.7513 22.7242 25.2078 22.3017C25.6643 21.8793 25.9447 21.3001 25.9928 20.68H21.0676Z"
                            fill="#712258" />
                    </g>
                    <defs>
                        <clipPath id="clip0_527_1351">
                            <rect width="19" height="19" fill="white" transform="translate(7 7)" />
                        </clipPath>
                    </defs>
                </svg>
                <div>
                    <h2>Punto de venta</h2>
                    <p>Interfaz de tienda para vendedores.</p>
                </div>
            </router-link>
            <hr>
            <router-link to="/sales" class="menu-button"
                        :class="{ 'active': $route.path === '/sales' }">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="33" height="33" rx="8" fill="white" />
                    <path
                        d="M8.52002 16.5C8.52002 16.0969 8.68016 15.7103 8.96522 15.4252C9.25027 15.1402 9.63689 14.98 10.04 14.98H12.7V24.48H8.52002V16.5Z"
                        fill="#985184" />
                    <path
                        d="M16.88 10.04C16.88 9.20019 17.5929 8.51999 18.4722 8.51999H24.48V22.96C24.48 23.7998 23.7671 24.48 22.8878 24.48H16.88V10.04Z"
                        fill="#FBB945" />
                    <path
                        d="M12.7 13.4855C12.7 12.632 13.4129 11.94 14.2922 11.94H20.3V22.9345C20.3 23.788 19.5871 24.48 18.7078 24.48H12.7V13.4855Z"
                        fill="#FC868B" />
                    <path d="M16.88 24.48H18.7078C19.5871 24.48 20.3 23.788 20.3 22.9345V11.94H16.88V24.48Z"
                        fill="#F86126" />
                    <path
                        d="M12.7 24.48L14.5981 24.4793C15.0016 24.4793 15.3886 24.319 15.674 24.0338C15.9594 23.7485 16.1198 23.3616 16.12 22.9581V14.98H12.7V24.48Z"
                        fill="#962B48" />
                </svg>
                <div>
                    <h2>Ventas</h2>
                    <p>Registro de operaciones de venta.</p>
                </div>
            </router-link>
        </nav>
    </div>
</template>

<style scoped>
.menu {
    position: absolute;
    z-index: 3;
    display: flex;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 12px 10px;
}

/* Webkit (Chrome, Edge, Safari) */
.menu::-webkit-scrollbar {
    width: 0px;
    /* ajustar a 10 cuando se quiera mostrar */
}

.menu::-webkit-scrollbar-track {
    background: transparent;
}

.menu::-webkit-scrollbar-thumb {
    background-color: #2F445F;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
}

.menu::-webkit-scrollbar-thumb:hover {
    background-color: #2F445F;
}

nav {
    list-style: none;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

nav svg {
    min-width: 33px;
    height: auto;
}

nav hr {
    border: 0.5px solid #283950;
    width: 100%;
    height: 0px;
    margin: 0;
}

@media screen and (min-width: 769px) {
    .menu {
        top: 61px;
        left: 5px;
        width: 350px;
        height: auto;
        background: #151D26;
        border-radius: 20px;
    }
}

@media screen and (max-width: 768px) {
    .menu {
        top: 55px;
        width: 100%;
        height: 100dvh;
        max-height: calc(100dvh);
        background: #0F1217;
    }
}

nav .menu-button {
    text-decoration: none;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 12px;
    align-items: start;
    font-family: sans-serif;
    transition: background 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
}

.contorn,
.icon-bg {
    transition: fill 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.stroke {
    transition: stroke 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

nav .menu-button:hover {
    background: #283547;

    .contorn {
        fill: #0F1217;
    }

    .stroke {
        stroke: #0F1217;
    }

    .icon-bg {
        fill: #4FC3F7;
    }
}

nav .menu-button div {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.menu-button h2 {
    font-size: 14px;
    font-weight: bold;
    color: #C6C6CD;
    margin: 0;
}

.menu-button p {
    font-size: 12px;
    font-weight: 500;
    color: #768296;
    margin: 0;
}
</style>