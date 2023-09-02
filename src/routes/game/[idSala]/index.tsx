import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useLocation,
} from "@builder.io/qwik-city";
import { useRooms } from "~/routes/layout";

export const usePlayers = routeLoader$(() => {
  return [
    {
      initials: "SR",
      name: "José Santos Ramirez Moscoso",
      tokens: 5,
      points: 3,
    },
    {
      initials: "ER",
      name: "Eduard Ramirez Mesa",
      tokens: 5,
      points: 3,
    },
    {
      initials: "IA",
      name: "Isabela Arevalo Ramirez",
      tokens: 5,
      points: 3,
    },
    {
      initials: "ZR",
      name: "Rachel Zoe Ramirez Urrutia",
      tokens: 5,
      points: 3,
    },
  ];
});

export default component$(() => {
  const loc = useLocation();
  const rooms = useRooms();
  const allPlayers = useSignal<
    {
      initials: string;
      name: string;
      tokens: number;
      points: number;
    }[]
  >([]);
  const dice1 = useSignal(1);
  const dice2 = useSignal(1);
  const currentPlayer = useSignal(0);
  const gap = useSignal(0);
  const win = useSignal(false);
  const winner = useSignal("");
  const pitcher = useSignal(false);
  const started = useSignal(false);
  const gaps = useSignal<
    {
      number: number;
      tokens: {
        currentPlayer: number | null;
      }[];
    }[]
  >([
    {
      number: 4,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 5,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 6,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 7,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 2,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 8,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 3,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 9,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 10,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 11,
      tokens: [{ currentPlayer: null }],
    },
    {
      number: 12,
      tokens: [{ currentPlayer: null }],
    },
  ]);

  useTask$(() => {
    const room = rooms.value.find((room) => room.code === loc.params.idSala);
    allPlayers.value = room?.players || [];
  });
  useVisibleTask$(({ track }) => {
    track(() => win.value);

    if (win.value) {
      const totalPoints = allPlayers.value.reduce(
        (acc, player) => acc + player.points,
        0
      );

      alert(
        `¡¡¡ GANASTE ${winner.value}, puntos total de penalización ${totalPoints} !!!`
      );
    }
  });

  return (
    <main class="px-10 h-screen w-screen overflow-auto">
      <div>
        <ul class="flex gap-5 justify-center">
          {allPlayers.value.map((player, index) => (
            <li
              key={`player_${index}`}
              class="flex flex-col items-center border-b-4 pb-1"
              style={{
                borderColor: index === currentPlayer.value ? `black` : "",
              }}
            >
              <h1 class="text-red-500 text-xl font-semibold">
                {player.points}
              </h1>
              <span class="mb-2 flex items-center justify-center border-2 border-black w-12 h-12 rounded">
                {player.initials}
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {Array.from(Array(player.tokens).keys()).map((token, i) => (
                  <li key={`player_${index}_token_${token}_${i}`}>
                    <span class="block w-3 h-3 border-2 border-amber-700 rounded-full"></span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div class="flex flex-col sm:flex-row gap-8 justify-between bg-amber-50">
        <div class="flex flex-1 justify-between m-5">
          <ul class="flex flex-col justify-center gap-6">
            <li id={`gap_${gaps.value[0].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                4
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[0].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[0].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[1].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                5
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[1].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[1].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[2].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                6
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[2].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[2].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[3].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                7
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[3].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[3].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <ul class="flex flex-col justify-center gap-6">
            <li id={`gap_${gaps.value[4].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                2
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[4].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[4].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[5].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                8
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[5].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[5].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[6].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                3
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[6].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[6].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <ul class="flex flex-col justify-center gap-6">
            <li id={`gap_${gaps.value[7].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                9
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[7].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[7].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[8].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                10
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[8].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[8].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[9].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                11
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[9].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[9].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
            <li id={`gap_${gaps.value[10].number}`}>
              <span class="flex items-center justify-center text-white font-semibold text-5xl bg-black w-20 h-20 rounded-full">
                12
              </span>
              <ul class="flex gap-1 items-center justify-center my-1">
                {gaps.value[10].tokens.map((token, i) => (
                  <li key={`player_${gaps.value[10].number}_token_${i}`}>
                    <span
                      class="block w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor:
                          token.currentPlayer !== null
                            ? `brown`
                            : "transparent",
                      }}
                    ></span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div class="px-6 md:w-1/3 bg-gray-100 rounded">
          <h1 class="text-3xl my-3 font-semibold">Dados</h1>
          <div class="my-10 flex flex-col gap-3 items-center">
            <div class="flex gap-3 flex-col justify-center items-center">
              {started.value && (
                <div class="flex items-center gap-3">
                  <h1 class="text-gray-500 font-semibold">
                    {
                      allPlayers.value[
                        currentPlayer.value === 0
                          ? allPlayers.value.length - 1
                          : currentPlayer.value - 1
                      ].name.split(" ")[0]
                    }{" "}
                    {
                      allPlayers.value[
                        currentPlayer.value === 0
                          ? allPlayers.value.length - 1
                          : currentPlayer.value - 1
                      ].name.split(" ")[1]
                    }
                  </h1>
                  <h1 class="text-xl border-2 border-gray-300 px-5 py-1 rounded-md">
                    {dice1.value}
                  </h1>
                  <h1 class="text-xl border-2 border-gray-300 px-5 py-1 rounded-md">
                    {dice2.value}
                  </h1>
                </div>
              )}
              <button
                type="button"
                class="px-8 py-2 w-full text-xl rounded-md border-2 border-black font-semibold hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
                onClick$={() => {
                  pitcher.value = true;
                  started.value = true;
                  dice1.value = Math.floor(Math.random() * 6) + 1;
                  dice2.value = Math.floor(Math.random() * 6) + 1;

                  gap.value = dice1.value + dice2.value;

                  setTimeout(() => {
                    pitcher.value = false;
                  }, 1000);

                  if (gap.value === 2 || gap.value === 3) {
                    if (allPlayers.value[currentPlayer.value].tokens > 0) {
                      allPlayers.value[currentPlayer.value].tokens -= 1;
                    } else {
                      win.value = true;
                      winner.value = allPlayers.value[currentPlayer.value].name;
                    }

                    if (gap.value === 3) {
                      currentPlayer.value =
                        allPlayers.value.length - 1 === currentPlayer.value
                          ? 0
                          : currentPlayer.value + 1;
                    }
                  } else {
                    const currentGap = gaps.value.find(
                      (cGap) => cGap.number === gap.value
                    );

                    const currentTokens = currentGap?.tokens.filter(
                      (token) => token.currentPlayer !== null
                    );

                    if (currentTokens?.length) {
                      allPlayers.value[currentPlayer.value].tokens += 1;

                      if (currentGap?.tokens) {
                        currentGap.tokens.pop();

                        gaps.value = gaps.value.map((cGap) => {
                          if (cGap.number === currentGap.number) {
                            return currentGap;
                          }

                          return cGap;
                        });
                      }
                    } else {
                      if (currentGap?.number) {
                        currentGap.tokens = currentGap.tokens.filter(
                          (token) => token.currentPlayer !== null
                        );

                        currentGap.tokens.push({
                          currentPlayer: currentPlayer.value,
                        });

                        gaps.value = gaps.value.map((cGap) => {
                          if (cGap.number === currentGap.number) {
                            return currentGap;
                          }

                          return cGap;
                        });

                        if (allPlayers.value[currentPlayer.value].tokens > 0) {
                          allPlayers.value[currentPlayer.value].tokens -= 1;
                        } else {
                          allPlayers.value[currentPlayer.value].points += 1;
                        }
                      }
                    }

                    if (
                      allPlayers.value[currentPlayer.value].tokens === 0 &&
                      (gap.value === 2 || gap.value === 3)
                    ) {
                      win.value = true;
                      winner.value = allPlayers.value[currentPlayer.value].name;
                    } else {
                      currentPlayer.value =
                        allPlayers.value.length - 1 === currentPlayer.value
                          ? 0
                          : currentPlayer.value + 1;
                    }
                  }
                }}
              >
                Lanzar
              </button>
              {allPlayers.value[currentPlayer.value] && (
                <h1 class="text-gray-500 font-semibold">
                  {allPlayers.value[currentPlayer.value].name}
                </h1>
              )}
            </div>

            {pitcher.value && (
              <div class="fixed top-0 left-0 flex gap-6 items-center justify-center bg-white/80 h-screen w-screen">
                <div>
                  <h1 class="text-7xl border-2 bg-white border-gray-300 px-5 py-1 rounded-md">
                    {dice1.value}
                  </h1>
                </div>
                <div>
                  <h1 class="text-7xl border-2 bg-white border-gray-300 px-5 py-1 rounded-md">
                    {dice2.value}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
