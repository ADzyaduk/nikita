<template>
    <div>
        <UContainer class="mb-16">
            <UCard>
                <UForm :state="formState" :schema="schema" @submit="onSubmit" class="space-y-4">
                    <UFormGroup name="name" label="Имя" class="my-2">
                        <UInput type="text" v-model="formState.name" placeholder="Петр Иванов"></UInput>
                    </UFormGroup>

                    <UFormGroup name="phone" label="Телефон" class="my-2">
                        <UInput type="tel" v-model="formState.phone" placeholder="+79123456789"></UInput>
                    </UFormGroup>

                    <UFormGroup name="text" label="Сообщение" class="my-2">
                        <UTextarea type="text" v-model="formState.text" placeholder="Сообщение"></UTextarea>
                    </UFormGroup>

                    <UButton block label="Отправить" color="lime" type="submit" @click="onSubmit"/>
                </UForm>
            </UCard>
        </UContainer>


    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import axios from 'axios';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';


const toast = useToast();

const schema = z.object({
    name: z.string().min(3, 'Имя должно содержать хотя бы 3 буквы'),
    phone: z.string().regex(/^\+?[0-9]{10,14}$/, 'Введите корректный номер телефона'),
    text: z.string().min(15, 'Напишите сообщение'),
})
const formState = ref({
    name: '',
    phone: '',
    text: '',
})

type Schema = z.output<typeof schema>


async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${'6849693417:AAEhtkyzlwPWpfcHucqmLS_jbiskfQNI7c0'}/sendMessage`,
            {
                chat_id: '-1002054840999',
                text: `Имя: ${event.data.name}\nТелефон: ${event.data.phone}\nСообщение: ${event.data.text}`,
            }
        );

        if (response.status === 200) {
            formState.value.name = '';
            formState.value.phone = '';
            formState.value.text = '';
            toast.add({ title: 'Сообщение отправлено!' });
        } else {
            console.error("Error sending message:", response);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}

</script>

<style scoped></style> 