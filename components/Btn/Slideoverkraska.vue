<script setup>
const isOpen = ref(false)
</script>

<template>
    <div>
        <UButton label="Узнать больше" variant="outline" icon="i-heroicons-arrow-right-20-solid" :trailing="true"
            color="lime" @click="isOpen = true" />

        <USlideover v-model="isOpen">
            <div class="p-4 flex-1">
                
            </div>
        </USlideover>
    </div>
</template>
