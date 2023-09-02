import { component$ } from "@builder.io/qwik";
import {
  Form,
  type DocumentHead,
  zod$,
  z,
  routeAction$,
  useNavigate,
} from "@builder.io/qwik-city";
import { ROOMS } from "../layout";

export const usePlayerSave = routeAction$(
  (room) => {
    const code = `${room.name
      .toLowerCase()
      .replaceAll(" ", "-")}-${new Date().getTime()}`;

    ROOMS.push({
      code,
      name: room.name,
      players: [],
    });
  },
  zod$({
    name: z.string().min(3).max(20),
  })
);

export default component$(() => {
  const nav = useNavigate();
  const savePlayer = usePlayerSave();

  return (
    <main class="h-screen w-screen flex justify-center items-center">
      <fieldset>
        <legend class="py-5 mb-16 border-b-2 w-full text-4xl font-semibold">
          Sala
        </legend>
        <Form
          action={savePlayer}
          onSubmit$={() => {
            if (savePlayer.status === 200) {
              nav("list");
            }
          }}
        >
          <div class="flex gap-5 items-center">
            <label for="name" class="text-4xl">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              class="border-2 rounded-md text-4xl py-3 px-5"
              required
            />
          </div>
          <div class="my-10 flex justify-end">
            <button
              type="submit"
              class="bg-black text-white hover:opacity-90 rounded-md text-4xl py-3 px-5"
            >
              Continuar
            </button>
          </div>
        </Form>
      </fieldset>
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
