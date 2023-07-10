import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: input },
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', // Replace with your actual API key
        },
      });

      const { choices } = response.data;
      const { content } = choices[0].message;

      setOutput(content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Chat with ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <p>Response: {output}</p>
    </div>
  );
}

export default App;
