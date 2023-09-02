import { component$ } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main class="px-10 py-3 h-screen w-screen">
      <Form></Form>
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
