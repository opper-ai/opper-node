import { EmbeddingRequest, EmbeddingResponse, APIClientContext } from "./types";
import APIResource from "./api-resource";
import { URLBuilder, BASE_PATHS } from "./utils";
import { OpperError } from "./errors";

class Embeddings extends APIResource {
    constructor(ctx: APIClientContext) {
        super(ctx);
    }

    protected calcURLEmbeddings = () => {
        const urlBuilder = new URLBuilder(this.baseURL);
        return urlBuilder.buildURL(BASE_PATHS.EMBEDDINGS);
    };

    /**
     * Creates embeddings for the provided input text.
     * 
     * @param request - The embedding request parameters
     * @returns A promise that resolves to an EmbeddingResponse containing the generated embeddings
     * @throws {APIError} If the API response status is not 200
     * @throws {OpperError} If there is an error in the request or response
     */
    public async create(request: EmbeddingRequest): Promise<EmbeddingResponse> {
        const url = this.calcURLEmbeddings();
        
        // Validate request
        if (!request.input) {
            throw new OpperError("Input is required for embedding creation");
        }
        
        if (!request.model) {
            throw new OpperError("Model is required for embedding creation");
        }
        
        const data = await this.doPost<EmbeddingResponse>(url, request);
        
        return data;
    }
}

export default Embeddings; 