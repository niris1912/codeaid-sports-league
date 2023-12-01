<template>
    <ul class="navbar">
        <li 
            v-for="(menu, index) in MENU_ITEMS"
            :key="index">
            <a 
                class="nav-item"
                :href="menu.path" >

                <img class="nav-icon" :src="`/images/${menu.icon}`" /> 
                <span class="nav-title">{{ menu.title }}</span>    

            </a>
        </li>
    </ul>
</template>
<script setup>
import { MENU_ITEMS } from '../../config';
</script>