<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <section class="screen-panel">
    <header class="screen-panel__header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <slot name="extra" />
    </header>
    <div class="screen-panel__body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.screen-panel {
  position: relative;
  display: flex;
  min-height: 0;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-panel);
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.05), rgb(255 255 255 / 0.015)),
    var(--color-panel);
  box-shadow: var(--shadow-panel);
}

.screen-panel::before {
  position: absolute;
  top: 0;
  right: 16px;
  left: 16px;
  height: 1px;
  content: "";
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
}

.screen-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 13px 16px 8px;
  gap: 12px;
}

.screen-panel__header h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
}

.screen-panel__header p {
  margin: 4px 0 0;
  color: var(--color-text-muted);
  font-size: 12px;
}

.screen-panel__body {
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  flex: 1;
  padding: 8px 16px 16px;
}
</style>
