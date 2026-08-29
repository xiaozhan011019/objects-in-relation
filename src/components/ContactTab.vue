<template>
  <div class="contact-tab card">
    <h2 class="contact-title">Contact</h2>

    <div v-if="contacts.length" class="contact-table">
      <div class="contact-table-header contact-table-row">
        <span>Name</span>
        <span>Contact</span>
      </div>

      <div
        v-for="person in contacts"
        :key="person.name"
        class="contact-table-row contact-table-item"
      >
        <span class="contact-name">{{ person.name }}</span>
        <span class="contact-email">{{ person.contact }}</span>
      </div>
    </div>
    <p v-else class="contact-pending">Contact information will be added after author confirmation.</p>
  </div>
</template>

<script setup>
const contacts = []
</script>

<style scoped>
.contact-tab {
  padding: 40px;
}

.contact-title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
  text-align: center;
  margin-bottom: 24px;
}

.contact-table {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact-table-row {
  display: grid;
  grid-template-columns: minmax(160px, 1fr) minmax(220px, 1.3fr);
  gap: 24px;
  align-items: center;
  border-radius: 14px;
  padding: 14px 18px;
}

.contact-table-header {
  background: #eef1fb;
  color: #666;
  font-size: 13px;
  font-weight: 600;
}

.contact-table-item {
  background: #fbfcff;
  border: 1px solid #e3e8f6;
  color: #333;
  font-size: 14px;
}

.contact-name {
  font-weight: 700;
  color: #000;
}

.contact-email {
  color: #4b4b4b;
}

.contact-pending {
  margin: 0;
  text-align: center;
  color: #6b7280;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .contact-tab {
    padding: 35px;
  }

  .contact-title {
    font-size: 22px;
  }
}

@media screen and (max-width: 1024px) {
  .contact-tab {
    padding: 30px;
  }

  .contact-title {
    font-size: 20px;
  }

  .contact-table-row {
    grid-template-columns: minmax(140px, 1fr) minmax(180px, 1.2fr);
    gap: 18px;
  }

  .contact-table-item,
  .contact-table-header {
    font-size: 13px;
  }
}

@media screen and (max-width: 768px) {
  .contact-tab {
    padding: 25px;
  }

  .contact-title {
    font-size: 18px;
  }

  .contact-table-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px 14px;
  }

  .contact-table-item,
  .contact-table-header {
    font-size: 12px;
  }
}

@media screen and (max-width: 576px) {
  .contact-tab {
    padding: 20px;
  }

  .contact-title {
    font-size: 16px;
  }

  .contact-table {
    gap: 10px;
  }

  .contact-table-item,
  .contact-table-header {
    font-size: 11px;
  }
}

@media screen and (max-width: 480px) {
  .contact-tab {
    padding: 15px;
  }

  .contact-title {
    font-size: 15px;
    margin-bottom: 18px;
  }

  .contact-table-row {
    padding: 10px 12px;
  }

  .contact-table-item,
  .contact-table-header {
    font-size: 10px;
  }
}
</style>
