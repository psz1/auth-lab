import { writable } from "svelte/store";

type TSessionUser = {
  id: number;
  name: string;
  username: string;
};

let initialSessionUser = null;
try {
  const response = await fetch("http://localhost:4000/session", {
    method: "GET",
    mode: "cors",
    credentials: "include"
  });
  const json = await response.json();
  initialSessionUser = json as TSessionUser;
} catch (error) {
  console.log("error", error);
}

const sessionUser = writable<TSessionUser | null>(initialSessionUser);

export default { sessionUser };
