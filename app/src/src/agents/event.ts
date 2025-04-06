import { ref, computed } from "vue";
import { eventAgentGenerator, EventData } from "@receptron/event_agent_generator";

export const textInputEvent = () => {
  const userInput = ref("");

  const eventsObj = ref<Record<string, EventData>>({});
  const { eventAgent } = eventAgentGenerator((id, data) => {
    eventsObj.value[id] = data;
  });
  const submitText = (event: EventData) => {
    const data = {
      text: userInput.value,
      message: { role: "user", content: userInput.value },
    };
    event.onEnd(data);
    /* eslint-disable @typescript-eslint/no-dynamic-delete */
    delete eventsObj.value[event.id];
    userInput.value = "";
  };
  const events = computed(() => {
    return Object.values(eventsObj.value);
  });

  const clearEvents = () => {
    Object.values(eventsObj.value).forEach((event) => event.reject());
    eventsObj.value = {};
  };

  return {
    eventAgent,
    userInput,
    events,
    submitText,
    clearEvents,
  };
};
