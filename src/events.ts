import APIResource from './api-resource';
import { OpperError } from './errors';
import { Event } from './types';

class Events extends APIResource {
    /**
     * This method creates a new event in the OpperAI API.
     * It sends a POST request to the events endpoint with the event data.
     * @param event - The event data to be created.
     * @returns A promise that resolves to the created event object.
     * @throws {OpperError} If the response status is not 200.
     */
    public async create(event: Event): Promise<Event> {
        const response = await this.doPost(this.calcURLEvents(), JSON.stringify(event));

        if (response.status !== 200) {
            throw new OpperError(`Failed to create event: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    }

    /**
     * This method updates an existing event in the OpperAI API.
     * It sends a PUT request to the events endpoint with the event data.
     * @param event - The event data to be updated.
     * @returns A promise that resolves to the updated event object.
     * @throws {OpperError} If the response status is not 200 or if the event does not have a uuid.
     */
    public async update(event: Event): Promise<Event> {
        if (!event.uuid) {
            throw new OpperError('Event uuid is required for update');
        }

        const response = await this.doPut(this.calcURLEvent(event.uuid), JSON.stringify(event));

        if (response.status !== 200) {
            throw new OpperError(`Failed to update event: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    }
}

export default Events;
