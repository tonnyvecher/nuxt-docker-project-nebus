<template>
  <div class="index-container">
    <div class="index-header">
      <h1 class="index__logo">Заметки</h1>
      <nuxt-link to="/create" class="index__create"
        >Создать новую заметку</nuxt-link
      >
    </div>
    <ul class="index__notes">
      <li class="index__note" v-for="note in store.notes" :key="note.id">
        <h2 class="index__note-name">{{ note.title }}</h2>
        <ul class="index__note--todos">
          <li
            class="index__note--todo"
            v-for="todo in note.todos.slice(0, 3)"
            :key="todo.id"
            :class="[todo.completed ? 'index__note--todo-complete' : '']"
          >
            {{ todo.text }}
          </li>
        </ul>
        <div class="index__note--btn">
          <button class="index__note--btn-edit" @click="editNote(note.id)">
            Редактировать
          </button>
          <button
            class="index__note--btn-delete"
            @click="confirmDelete(note.id)"
          >
            Удалить
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from "@/store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useNotesStore();
const router = useRouter();

onMounted(() => {
  store.loadNotes();
});

const editNote = (noteId: number) => {
  router.push(`/edit/${noteId}`);
};

const confirmDelete = (noteId: number) => {
  if (confirm("Вы уверены, что хотите удалить эту заметку?")) {
    store.deleteNote(noteId);
    store.saveNotes();
  }
};
</script>
<style scoped>
.index-container {
  max-width: 1720px;
  padding-inline: 10px;
}

.index-header {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr auto;
  padding: 20px;
}

.index__logo {
  line-height: 40px;
  background-image: linear-gradient(to bottom left, #4f388e, #cf75ff);
  font-size: 40px;
  font-weight: 700;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

.index__create {
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
.index__create:hover {
  color: #fff;
  background-color: rgb(113, 0, 220);
}

.index__notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  margin: 0 auto;
  padding: 10px;
  gap: 16px;
}

.index__note {
  display: grid;
  border: 1px solid rgb(105, 1, 202);
  border-radius: 6px;
  padding: 10px;
  margin: 0;
  gap: 8px;
}

.index__note-name {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 5px 6px;
  margin: 0;
  position: relative;
}
.index__note-name::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: rgb(105, 1, 202);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.index__note-name:hover::after {
  transform: scaleX(1);
}

button {
  background-color: #fff;
  border: 1px solid rgb(113, 0, 220);
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 8px;
  transition: background-color 0.25s;
}
.index__note--btn {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.index__note--btn-edit:hover {
  color: #fff;
  background-color: rgb(24, 11, 173);
}
.index__note--btn-delete:hover {
  color: #fff;
  background-color: rgb(216, 80, 80);
}

.index__note--todo {
  list-style: decimal;
  padding: 5px;
}
.index__note--todo-complete {
  text-decoration: line-through;
  color: #9b9b9b;
}
</style>
