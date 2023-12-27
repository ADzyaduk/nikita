<!-- CommonServices.vue -->
<template>
    <div class="">
        <p class="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-gray-300">Окрашивание отдельных элементов:
        </p>
        <table class="table-fixed w-full">
            <tbody>
                <tr v-for="service in commonServices" :key="service.name">
                    <td class="text-center border border-lime-500 dark:border-indigo-500 text-gray-800 dark:text-gray-300">
                        {{ service.name }}</td>
                    <td class="text-center border border-lime-500 dark:border-indigo-500 text-gray-800 dark:text-gray-300">
                        {{ service.price }}</td>
                    <td class="text-center border border-lime-500 dark:border-indigo-500 text-gray-800 dark:text-gray-300">
                        {{ service.unit }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, } from 'vue';

const commonServices = ref([
    { name: 'Окрашивание дверей скрытого монтажа', price: 1500, unit: 'шт' },
    { name: 'Покраска багетов', price: 200, unit: 'п.м' },
    { name: 'Покраска плинтусов', price: 200, unit: 'п.м' },
    { name: 'Покраска молдингов', price: 200, unit: 'п.м' },
    { name: 'Покраска радиатора', price: 1000, unit: 'шт' },
    { name: 'Покраска подоконника масляной краской', price: 700, unit: 'шт' },
    { name: 'Покраска металлоконструкций', price: 100, unit: 'п.м' },
    { name: 'Покраска коммуникаций', price: 300, unit: 'п.м' },
]);
</script>
