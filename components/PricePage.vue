<template>
    <div class="mx-10">
      <UTable :rows="paintingServices" @select="selectService" :row-class="getRowClass" />
      <div v-if="selectedServices.length > 0">
        <p>Итого: {{ calculateTotal() }} руб.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const paintingServices = [
    {
      name: 'Обеспыливание стен',
      price: 50,
      unit: 'м²'
    },
    {
      name: 'Грунтование стен',
      price: 50,
      unit: 'м²'
    },
    {
      name: 'Покраска стен (один слой)',
      price: 100,
      unit: 'м²'
    },
    {
      name: 'Покраска стен в 2 слоя',
      price: 180,
      unit: 'м²'
    },
    {
      name: 'Покраска потолка (один слой)',
      price: 150,
      unit: 'м²'
    },
    {
      name: 'Покраска потолка (2 слоя)',
      price: 250,
      unit: 'м²'
    },
    {
      name: 'Покраска коммуникаций',
      price: 300,
      unit: 'п.м'
    },
    {
      name: 'Покраска дверей скрытого монтажа',
      price: 1500,
      unit: 'шт'
    },
    {
      name: 'Покраска багетов',
      price: 200,
      unit: 'п.м'
    },
    {
      name: 'Покраска плинтусов',
      price: 200,
      unit: 'п.м'
    },
    {
      name: 'Покраска молдингов',
      price: 200, // Уточните цену
      unit: 'от 200р'
    },
    {
      name: 'Частичная шпаклевка царапин, сколов на стенах',
      price: 150,
      unit: 'м²'
    },
    {
      name: 'Покраска обоев (2 слоя)',
      price: 300,
      unit: 'м²'
    },
    {
      name: 'Покраска радиатора',
      price: 1000, // Уточните цену
      unit: 'шт'
    },
    {
      name: 'Покраска подоконника (масляной краской)',
      price: 700,
      unit: 'шт'
    },
    {
      name: 'Покраска металлоконструкций',
      price: 100,
      unit: 'п.м'
    },
    {
      name: 'Укрывка окон',
      price: 150,
      unit: 'м²'
    },
    {
      name: 'Укрывка полов',
      price: 70,
      unit: 'м²'
    },
    {
      name: 'Укрывание прочих элементов',
      price: 0, // Уточните цену
      unit: 'оговаривается'
    },
  ];
  
  const selectedServices = ref([]);
  
  // Функция для выбора/снятия выбора услуги
  function selectService(service) {
    const index = selectedServices.value.findIndex((item) => item.name === service.name);
    if (index === -1) {
      selectedServices.value.push({ name: service.name, price: service.price });
    } else {
      selectedServices.value.splice(index, 1);
    }
  }
  
  // Вычисление суммы за выбранные услуги
  function calculateTotal() {
    return selectedServices.value.reduce((sum, service) => sum + service.price, 0);
  }
  
  // Функция для добавления класса выделенной строки
  function getRowClass(service) {
    return {
      'selected-row': selectedServices.value.some((item) => item.name === service.name)
    };
  }
  </script>
  
  <style scoped>
    .selected-row {
      background-color: #e0e0e0; /* Любой цвет, который вы хотите использовать для выделенных строк */
    }
  </style>
  