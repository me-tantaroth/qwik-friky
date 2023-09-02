import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  zod$,
  z,
  routeAction$,
  Link,
} from "@builder.io/qwik-city";
import { ROOMS, useRooms } from "../../layout";

export const usePlayerSave = routeAction$(
  (room) => {
    const code = `${room.name
      .toLowerCase()
      .replaceAll(" ", "-")}-${new Date().getTime()}}`;

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
  const rooms = useRooms();

  return (
    <main class="h-screen w-screen flex justify-center items-center">
      <fieldset class="mx-28">
        <legend class="py-5 mb-16 border-b-2 w-full text-4xl font-semibold">
          Sala
        </legend>

        <ul class="min-w-fit max-w-lg flex">
          {rooms.value.map((room, index) => (
            <li key={`room_${index}`} class="p-6">
              <Link
                href={"/user/" + room.code}
                class="bg-black text-white hover:opacity-90 rounded-md text-4xl py-3 px-5"
              >
                {room.name}
              </Link>
            </li>
          ))}
        </ul>
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
