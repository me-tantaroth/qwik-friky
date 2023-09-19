import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main class="px-10 py-3 h-screen w-screen">
      <button
        type="button"
        class="bg-black text-white hover:opacity-90 rounded-md text-4xl py-3 px-5"
        onClick$={() => {
          console.log("Login with Google");
        }}
      >
        Ingresar con Google
      </button>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
