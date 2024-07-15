import { defineEventHandler, readBody } from "h3";
import { ref, Ref } from "vue/dist/vue.js";
import { Contact } from "~/stores/appStore";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = event.node.req.method;
  const url = `${config.public.apiBase}/contacts`;

  let options: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    const body = await readBody(event);
    console.log(body);
    // const contactRef: Ref<Contact[]> = ref(body);
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, { method, ...options });
  return await response.json();
});
