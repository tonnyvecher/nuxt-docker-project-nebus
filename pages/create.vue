<template>
  <div class="create-container">
    <div class="create-header">
      <h1 class="create-header__logo">Создать новую заметку</h1>
      <nuxt-link to="/" class="create-header__back">Назад</nuxt-link>
    </div>
    <div class="create-main">
      <input
        class="create-main__input"
        v-model="title"
        placeholder="Название заметки"
      />
      <button class="create-main__btn-create" @click="createNote">
        Создать
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNotesStore } from "@/store";
import { useRouter } from "vue-router";

const store = useNotesStore();
const router = useRouter();
const title = ref("");

const createNote = () => {
  if (title.value.trim()) {
    store.addNote(title.value);
    store.saveNotes();
    router.push("/");
  } else {
    alert("Введите название заметки.");
  }
};
</script>
<style scoped>
.create-container {
  max-width: 1720px;
  padding-inline: 10px;
}

.create-header {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr auto;
  padding: 20px;
}

.create-header__logo {
  line-height: 40px;
  background-image: linear-gradient(to bottom left, #4f388e, #cf75ff);
  font-size: 40px;
  font-weight: 700;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

.create-header__back {
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
  font-size: 16px;
  border: 1px solid rgb(113, 0, 220);
  border-radius: 4px;
  padding: 10px 8px;
  color: rgb(113, 0, 220);
  transition: background-color 0.25s;
}
.create-header__back:hover {
  color: #fff;
  background-color: rgb(113, 0, 220);
}

.create-main {
  display: grid;
  grid-template-columns: repeat(auto, 1fr);
  justify-items: center;
  margin: 0 auto;
  padding: 0;
  gap: 8px;
}

.create-main__input {
  padding: 0;
  outline: none;
  border: 1px solid rgb(113, 0, 220);
  border-radius: 4px;
  padding: 10px 8px;
  display: flex;
  width: 50%;
}

.create-main__btn-create {
  background-color: #fff;
  border: 1px solid rgb(113, 0, 220);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.25s;
  padding: 10px 8px;
}
.create-main__btn-create:hover {
  color: #fff;
  background-color: rgb(24, 11, 173);
}
</style>
