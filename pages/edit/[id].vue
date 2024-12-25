<template>
  <div class="edit-container">
    <div class="edit-header">
      <h1 class="edit-header__logo">Редактировать заметку</h1>
      <nuxt-link to="/" class="edit-header__back">Назад</nuxt-link>
    </div>
    <input class="edit__edit-name" v-model="note.title" @input="updateTitle" />
    <ul class="edit__todos">
      <li class="edit__todos-todo" v-for="todo in note.todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
          class="edit__todos-todo--checkbox"
        />
        <input
          v-model="todo.text"
          @input="updateTodoText(todo.id, todo.text)"
          class="edit__todos-todo--new-todo"
        />
        <button
          @click="confirmDeleteTodo(todo.id)"
          class="edit__todos-todo--btn-delete"
        >
          Удалить
        </button>
      </li>
    </ul>
    <div class="edit__btn-management">
      <button class="edit__btn-management--btn-add" @click="addTodo">
        Добавить задачу
      </button>
      <button class="edit__btn-management--btn-save" @click="saveChanges">
        Сохранить изменения
      </button>
      <button class="edit__btn-management--btn-undo" @click="confirmCancel">
        Отменить редактирование
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNotesStore } from "@/store";
import { useRouter } from "vue-router";

const store = useNotesStore();
const router = useRouter();
const noteId = Number(router.currentRoute.value.params.id);
const note = ref({ title: "", todos: [] });

onMounted(() => {
  const foundNote = store.notes.find((n) => n.id === noteId);
  if (foundNote) {
    note.value = foundNote;
  }
});

const updateTitle = () => {
  store.updateNote(noteId, note.value.title, note.value.todos);
};

const toggleTodo = (todoId: number) => {
  store.toggleTodo(noteId, todoId);
  store.saveNotes();
};

const updateTodoText = (todoId: number, text: string) => {
  const todo = note.value.todos.find((t) => t.id === todoId);
  if (todo) {
    todo.text = text;
  }
};

const confirmDeleteTodo = (todoId: number) => {
  if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
    store.deleteTodo(noteId, todoId);
    store.saveNotes();
  }
};

const addTodo = () => {
  const newTodoText = prompt("Введите текст задачи:");
  if (newTodoText) {
    store.addTodo(noteId, newTodoText);
    store.saveNotes();
  }
};

const saveChanges = () => {
  store.updateNote(noteId, note.value.title, note.value.todos);
  store.saveNotes();
  router.push("/");
};

const confirmCancel = () => {
  if (confirm("Вы уверены, что хотите отменить редактирование?")) {
    router.push("/");
  }
};
</script>
<style scoped>
.edit-container {
  max-width: 1720px;
  padding-inline: 10px;
  display: grid;
  gap: 16px;
}

.edit-header {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr auto;
  padding: 20px;
}

.edit-header__logo {
  line-height: 40px;
  background-image: linear-gradient(to bottom left, #4f388e, #cf75ff);
  font-size: 40px;
  font-weight: 700;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

.edit-header__back {
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
.edit-header__back:hover {
  color: #fff;
  background-color: rgb(113, 0, 220);
}

.edit__edit-name {
  padding: 0;
  outline: none;
  border: 1px solid rgb(113, 0, 220);
  border-radius: 4px;
  padding: 10px 8px;
  display: flex;
  width: 50%;
  justify-items: center;
  margin: 0 auto;
  gap: 8px;
}

.edit__todos {
  display: grid;
  justify-items: center;
  margin: 0 auto;
  padding: 0;
  gap: 8px;
}

.edit__todos-todo {
  display: flex;
  border: 1px solid rgb(105, 1, 202);
  border-radius: 6px;
  padding: 8px;
  margin: 0;
  gap: 8px;
}

.edit__todos-todo--checkbox {
  appearance: none;
  position: relative;
  width: 20px;
  height: 20px;
  background: transparent;
  border-radius: 3px;
  border: none;
  box-shadow: inset 0 0 0 1px #d5d5d5;
  transition: 500ms;
}
.edit__todos-todo--checkbox:checked {
  box-shadow: none;
  background: rgb(177, 115, 235);
}
.edit__todos-todo--checkbox::before {
  content: "";
  position: absolute;
  transform: scale(0);
  width: 20px;
  height: 20px;
  font-size: 20px;
  background-image: url("/images/checked.svg");
  background-position: center;
  background-repeat: no-repeat;
  transition: 500ms;
}
.edit__todos-todo--checkbox:checked::before {
  transform: scale(1);
  transition: 500ms;
}

.edit__todos-todo--new-todo {
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 14px;
}

.edit__todos-todo--btn-delete {
  border: 1px solid #9b9b9b;
  background-color: #fff;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.25s;
}
.edit__todos-todo--btn-delete:hover {
  color: #fff;
  background-color: rgb(216, 80, 80);
}

.edit__btn-management {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.edit__btn-management--btn-add,
.edit__btn-management--btn-save,
.edit__btn-management--btn-undo {
  background-color: #fff;
  border: 1px solid rgb(113, 0, 220);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.25s;
  padding: 10px 8px;
}
.edit__btn-management--btn-add:hover {
  color: #fff;
  background-color: rgb(79, 224, 79);
}
.edit__btn-management--btn-save:hover {
  color: #fff;
  background-color: rgb(116, 215, 199);
}
.edit__btn-management--btn-undo:hover {
  color: #fff;
  background-color: rgb(249, 53, 53);
}
</style>
