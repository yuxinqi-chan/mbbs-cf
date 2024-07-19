import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", (c) => {
    return c.html(
      renderToString(
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            {import.meta.env.PROD ? (
              <script type="module" src="/static/client.js"></script>
            ) : (
              <script type="module" src="/src/client.tsx"></script>
            )}
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>
      )
    );
  })
  .post(
    "/api/todos",
    zValidator(
      "form",
      z.object({
        title: z.string().min(1),
      })
    ),
    (c) => {
      const { title } = c.req.valid("form");
      // TODO: DB insert
      return c.json({ title });
    }
  )
  .delete(
    "/api/todos/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    (c) => {
      const id = c.req.valid("param").id;
      // TODO: DB delete
      return c.json({ id });
    }
  );
export type AppType = typeof app;

export default app;
