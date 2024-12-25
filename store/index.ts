import { defineStore } from "pinia";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Note {
  id: number;
  title: string;
  todos: Todo[];
}

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [] as Note[],
    nextNoteId: 1,
    nextTodoId: 1,
  }),
  actions: {
    addNote(title: string) {
      this.notes.push({ id: this.nextNoteId++, title, todos: [] });
    },
    deleteNote(noteId: number) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    },
    updateNote(noteId: number, title: string, todos: Todo[]) {
      const note = this.notes.find((note) => note.id === noteId);
      if (note) {
        note.title = title;
        note.todos = todos;
      }
    },
    addTodo(noteId: number, text: string) {
      const note = this.notes.find((note) => note.id === noteId);
      if (note) {
        note.todos.push({ id: this.nextTodoId++, text, completed: false });
      }
    },
    deleteTodo(noteId: number, todoId: number) {
      const note = this.notes.find((note) => note.id === noteId);
      if (note) {
        note.todos = note.todos.filter((todo) => todo.id !== todoId);
      }
    },
    toggleTodo(noteId: number, todoId: number) {
      const note = this.notes.find((note) => note.id === noteId);
      if (note) {
        const todo = note.todos.find((todo) => todo.id === todoId);
        if (todo) {
          todo.completed = !todo.completed;
        }
      }
    },
    loadNotes() {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
        this.nextNoteId = this.notes.length
          ? Math.max(...this.notes.map((note) => note.id)) + 1
          : 1;
        this.nextTodoId = this.notes.flatMap((note) => note.todos).length
          ? Math.max(
              ...this.notes.flatMap((note) => note.todos.map((todo) => todo.id))
            ) + 1
          : 1;
      }
    },
    saveNotes() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
  },
});
