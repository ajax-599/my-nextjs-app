const sendMessage = async () => {
  if (!input.trim()) return;

  // show user's message
  setMessages(prev => [
    ...prev,
    { role: "user", content: input }
  ]);

  try {
    const res = await fetch("/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        agent_id: "agent123"
      })
    });

    const data = await res.json();

    // show AI response
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: data.answer }
    ]);

  } catch (err) {
    console.error("Error talking to ask-ai:", err);
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: "Sorry, something went wrong." }
    ]);
  }

  setInput("");
};

