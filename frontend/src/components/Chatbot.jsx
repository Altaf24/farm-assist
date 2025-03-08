import React, { useState, useMemo } from 'react';
// Temporarily disable the real import
// import { GoogleGenerativeAI } from '@google/generative-ai';

// Dummy implementation for temporary use
class DummyGoogleGenerativeAI {
  constructor(apiKey) {
    console.warn('Using DummyGoogleGenerativeAI. Functionality is disabled temporarily.');
  }
  getGenerativeModel({ model }) {
    return {
      generateContent: async (input) => {
        return {
          response: {
            text: () => 'This is a dummy response.',
          },
        };
      },
    };
  }
}

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Use the dummy class instead of the real one
  const genAI = useMemo(() => new DummyGoogleGenerativeAI('dummy-api-key'), []);
  const model = useMemo(
    () => genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }),
    [genAI]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);

    try {
      const result = await model.generateContent(input);
      setMessages((prev) => [
        ...prev,
        { text: result.response.text(), sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error generating response:', error);
    }
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Farm Assistant</h3>
          </div>

          <div className="h-96 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fertilizers..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
