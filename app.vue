<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications icon="i-heroicons-check-badge" color="primary" :id="6" title="Notification"
      description="This is a notification." :timeout="600000" />
  </div>
</template>
