<template>
    <footer
        class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-lime-500shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-neutral-900 dark:border-indigo-500">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/"
                class="hover:text-lime-500 dark:hover:text-indigo-500">Покраска в городе Казань</a>.
        </span>
        <div
            class="flex flex-wrap items-center justify-between mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 space-x-6">
            <ULink to="/" active-class="text-lime-500 dark:text-indigo-500"
                inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                Главная
            </ULink>
            <ULink to="price" active-class="text-lime-500 dark:text-indigo-500"
                inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                Цены
            </ULink>
            <ULink to="galery" active-class="text-lime-500 dark:text-indigo-500"
                inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                Галерея
            </ULink>
            <ULink to="contacts" active-class="text-lime-500 dark:text-indigo-500"
                inactive-class="font-semibold text-gray-500 dark:text-gray-400 hover:text-lime-500 dark:hover:text-indigo-500">
                Контакты
            </ULink>
        </div>
    </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
</style>
