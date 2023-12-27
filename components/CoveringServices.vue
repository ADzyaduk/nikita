<script setup>
import { ref } from 'vue';

const coveringServices = ref([
    { name: 'Укрывание окон', price: 150, unit: 'м²' },
    { name: 'Укрывание полов', price: 70, unit: 'м²' },
    { name: 'Укрывание потолков', price: 100, unit: 'м²' },
]);

</script>

<template>
    <div class="">
        <p class="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-gray-300">Укрывные работы:</p>
        <table class="table-fixed w-full">
            <tbody>
                <tr v-for="service in coveringServices" :key="service.name">
                    <td class="text-center border border-lime-500 dark:border-indigo-500 text-gray-800 dark:text-gray-300">
                        {{ service.name }}</td>
                    <td class="text-center border border-lime-500 dark:border-indigo-500 text-gray-800 dark:text-gray-300">
                        {{ service.price }}</td>
                    <td class=" text-center border border-lime-500 dark:border-indigo-500 text-gray-800 dark:text-gray-300">
                        {{ service.unit }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
