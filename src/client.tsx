import { createRoot } from "react-dom/client";
import { hc } from "hono/client";
import { AppType } from ".";

interface TodoListProps {
  todos: string[];
}

const client = hc<AppType>("/").api;

function TodoList({ todos }: TodoListProps) {
  return (
    <div>
      <a href="/">
        <h1>Todo App</h1>
      </a>
      <div>
        <input type="text" name="title" />
        <button
          type="submit"
          onClick={() => {
            const title = document.querySelector("input")?.value;
            title &&
              client.todos.$post({
                form: {
                  title,
                },
              });
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button
              onClick={() => {
                client.todos[":id"].$delete({
                  param: {
                    id: i.toString(),
                  },
                });
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(<TodoList todos={["sample"]} />);
