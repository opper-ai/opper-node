import Client, { EmbeddingRequest, EmbeddingResponse } from "../index";
import { OpperError } from "../errors";

// Mock fetch for testing
global.fetch = jest.fn();

describe("Embeddings", () => {
    let client: Client;
    
    beforeEach(() => {
        jest.clearAllMocks();
        client = new Client({ apiKey: "test-api-key" });
    });
    
    it("should create embeddings successfully", async () => {
        const mockResponse: EmbeddingResponse = {
            span_id: "test-span-id",
            data: [
                {
                    embedding: [0.1, 0.2, 0.3, 0.4]
                }
            ],
            usage: {
                prompt_tokens: 10,
                total_tokens: 10
            }
        };
        
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            })
        );
        
        const request: EmbeddingRequest = {
            input: "This is a test input"
        };
        
        const response = await client.createEmbedding(request);
        
        expect(response).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.opper.ai/v1/embeddings",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    "X-OPPER-API-KEY": "test-api-key"
                }),
                body: JSON.stringify(request)
            })
        );
    });
    
    it("should handle array inputs for embeddings", async () => {
        const mockResponse: EmbeddingResponse = {
            span_id: "test-span-id",
            data: [
                { embedding: [0.1, 0.2, 0.3, 0.4] },
                { embedding: [0.5, 0.6, 0.7, 0.8] }
            ],
            usage: {
                prompt_tokens: 20,
                total_tokens: 20
            }
        };
        
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            })
        );
        
        const request: EmbeddingRequest = {
            input: ["First test input", "Second test input"],
            model: "text-embedding-3-small"
        };
        
        const response = await client.createEmbedding(request);
        
        expect(response).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.opper.ai/v1/embeddings",
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify(request)
            })
        );
    });
    
    it("should handle API errors", async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 400,
                statusText: "Bad Request"
            })
        );
        
        const request: EmbeddingRequest = {
            input: "Test input"
        };
        
        await expect(client.createEmbedding(request)).rejects.toThrow();
    });
}); 