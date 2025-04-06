import { useState, useMemo } from "react";
import { eventAgentGenerator, EventData } from "@receptron/event_agent_generator";

export const useTextInputEvent = () => {
  const [userInput, setUserInput] = useState("");
  const [eventsObj, setEventsObj] = useState<Record<string, EventData>>({});

  const { eventAgent } = eventAgentGenerator((id, data) => {
    setEventsObj((prev) => ({ ...prev, [id]: data }));
  });

  const submitText = (event: EventData) => {
    const data = {
      text: userInput,
      message: { role: "user", content: userInput },
    };
    event.onEnd(data);
    setEventsObj((prev) => {
      const { [event.id]: __, ...newEvents } = { ...prev };
      return newEvents;
    });
    setUserInput("");
  };

  const events = useMemo(() => Object.values(eventsObj), [eventsObj]);

  return {
    eventAgent,
    userInput,
    setUserInput,
    events,
    submitText,
  };
};
