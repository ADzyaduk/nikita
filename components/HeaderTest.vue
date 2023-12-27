
<script setup lang="ts">

</script>

<template>
    <div class="bg-cover bg-center flex items-top justify-center h-[180px] bg-slate-800">
        <nav class="relative container mx-auto p-6">
            <div class="flex items-center justify-between">
                <div class="pt-2">
                    <img src="~/assets/logo2.png" alt="logo" class="" width="400px">
                </div>
                <div class="hidden md:flex space-x-6">
                    <ULink to="/" active-class="text-lime-500 dark:text-indigo-500"
                        inactive-class="font-semibold text-gray-400 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                        Главная
                    </ULink>
                    <ULink to="price" active-class="text-lime-500 dark:text-indigo-500"
                        inactive-class="font-semibold text-gray-400 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                        Цены
                    </ULink>
                    <ULink to="galery" active-class="text-lime-500 dark:text-indigo-500"
                        inactive-class="font-semibold text-gray-400 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                        Галерея
                    </ULink>
                    <ULink to="contacts" active-class="text-lime-500 dark:text-indigo-500"
                        inactive-class="font-semibold text-gray-400 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                        Контакты
                    </ULink>
                </div>
                <div>
                    <BtnColorMode class="m-2" />
                </div>
            </div>
        </nav>

    </div>
</template>


<style scoped>
</style>
