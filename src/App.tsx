import { useEffect, useState } from "react";
import "./App.css";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator,Flex, Text, Divider } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }
  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <Flex direction="column">
            <Text> Crud para la clase</Text>
            <Divider size="small" orientation="horizontal" />
            <Text>
              <h1>Normativa Legal Untels</h1>
            </Text>
          </Flex>
          <button onClick={createTodo}>➕ new</button>
          <ul>
            {todos.map((todo) => (
              <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                {todo.content}
              </li>
            ))}
          </ul>
          <button onClick={signOut}>Sign out</button>
          <footer>
            <Text>©Steve Gomez 2024</Text>
          </footer>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
