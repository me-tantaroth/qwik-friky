import { component$ } from "@builder.io/qwik";
import {
  Form,
  type DocumentHead,
  zod$,
  z,
  routeAction$,
  useNavigate,
  useLocation,
} from "@builder.io/qwik-city";
import { PLAYERS, ROOMS } from "../../layout";

export const usePlayerSave = routeAction$(
  (player, requestEvent) => {
    const namesplit = player.name.split(" ");
    const firstInitial = namesplit[0][0];
    let secondInitial = namesplit[0][1];

    if (namesplit[1]) {
      secondInitial = namesplit[1][0];
    }

    const initials = firstInitial + secondInitial;

    PLAYERS.push({
      ...player,
      initials,
      tokens: 5,
      points: 0,
    });

    const currentTRoom = ROOMS.map((room, index) => {
      room.index = index;
      return room;
    }).find((room) => room.code === requestEvent.params.idSala);

    if (typeof currentTRoom?.index === "number") {
      ROOMS[currentTRoom.index].players.push({
        ...player,
        initials,
        tokens: 5,
        points: 0,
      });
    }
  },
  zod$({
    name: z.string().min(3).max(20),
  })
);

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const savePlayer = usePlayerSave();

  return (
    <main class="h-screen w-screen flex justify-center items-center">
      <fieldset>
        <legend class="py-5 mb-16 border-b-2 w-full text-4xl font-semibold">
          Usuario
        </legend>
        <Form
          action={savePlayer}
          onSubmit$={() => {
            if (savePlayer.status === 200) {
              nav(`/game/${loc.params.idSala}`);
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
              pattern="[A-Za-z]{3,20}"
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
