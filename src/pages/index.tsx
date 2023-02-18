import { Scheduler } from "@aldabil/react-scheduler";
import type {
  EventActions,
  ProcessedEvent,
  ViewEvent,
} from "@aldabil/react-scheduler/types";
import { api } from "../utils/api";

export default function Home() {
  const { data: events } = api.event.list.useQuery();

  const createEvent = api.event.create.useMutation();
  const deleteEvent = api.event.delete.useMutation();

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    const { title, start, end } = event;

    let result: ProcessedEvent;

    if (action === "create") {
      result = await createEvent.mutateAsync({ title, start, end });
    } else {
      result = await createEvent.mutateAsync({ title, start, end });
    }

    return result;
  };

  const handleDelete = async (id: string) => {
    await deleteEvent.mutateAsync({ id });
    return id;
  };

  if (!events) return "로딩 중이오.";

  return (
    <Scheduler
      view="month"
      events={events.map((event) => ({
        event_id: event.id,
        ...event,
        color: event.color ? event.color : undefined,
      }))}
      onConfirm={handleConfirm}
      onDelete={handleDelete}
    />
  );
}
