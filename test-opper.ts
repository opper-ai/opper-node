#!/usr/bin/env tsx

import { Opper } from "./src/index.js";

// Configuration - you can set these environment variables or modify them here
const OPPER_API_KEY = process.env.OPPER_API_KEY || process.env.OPPER_HTTP_BEARER;

if (!OPPER_API_KEY) {
  console.error("Error: OPPER_API_KEY or OPPER_HTTP_BEARER environment variable required");
  process.exit(1);
}
const OPPER_SERVER_URL = process.env.OPPER_SERVER_URL || "https://api.opper.ai/v2";

function printSection(title: string): void {
  console.log(`\n${'='.repeat(20)} ${title} ${'='.repeat(20)}`);
}

// Enhanced test example with comprehensive Opper functionality
class OpperComprehensiveExample {
  private opper: Opper;
  private knowledgeBaseId?: string;

  constructor(opper: Opper) {
    this.opper = opper;
  }

  async createAndTestKnowledgeBase(): Promise<string> {
    printSection("Knowledge Base Demo");

    try {
      // Create knowledge base
      console.log("📚 Creating knowledge base...");
      const kbResponse = await this.opper.knowledge.create({
        name: `test_knowledge_${Date.now()}`,
        embeddingModel: "azure/text-embedding-3-large"
      });

      this.knowledgeBaseId = kbResponse.id;
      console.log(`✅ Created knowledge base: ${this.knowledgeBaseId}`);

      // Sample data to add
      const sampleDocs = [
        {
          content: "Apple MacBook Pro 16-inch with M3 Pro chip, perfect for developers. Price: $2499",
          key: "macbook_pro",
          metadata: { category: "laptops", brand: "Apple", price: 2499 }
        },
        {
          content: "iPhone 15 Pro with A17 Pro chip and titanium design. Price: $999", 
          key: "iphone_15_pro",
          metadata: { category: "smartphones", brand: "Apple", price: 999 }
        },
        {
          content: "Samsung Galaxy S24 Ultra with S Pen and 200MP camera. Price: $1199",
          key: "galaxy_s24",
          metadata: { category: "smartphones", brand: "Samsung", price: 1199 }
        }
      ];

      // Add documents
      console.log("📝 Adding sample documents...");
      for (const doc of sampleDocs) {
        await this.opper.knowledge.add(this.knowledgeBaseId, {
          content: doc.content,
          key: doc.key,
          metadata: doc.metadata
        });
        console.log(`  ✅ Added: ${doc.key}`);
      }

      // Test querying
      console.log("🔍 Testing knowledge base queries...");
      const searchResults = await this.opper.knowledge.query(this.knowledgeBaseId, {
        query: "laptops for developers",
        topK: 2
      });

      console.log(`  📋 Found ${searchResults.length} relevant documents`);
      for (const result of searchResults) {
        console.log(`    - ${result.content.substring(0, 50)}... (score: ${result.score?.toFixed(3)})`);
      }

      return this.knowledgeBaseId;

    } catch (error) {
      console.error("❌ Knowledge base demo failed:", error);
      throw error;
    }
  }

  async testAICallsWithContext(): Promise<void> {
    printSection("AI Calls with Knowledge Context Demo");

    if (!this.knowledgeBaseId) {
      throw new Error("Knowledge base not created yet");
    }

    try {
      // Query knowledge base for context
      const contextDocs = await this.opper.knowledge.query(this.knowledgeBaseId!, {
        query: "smartphones comparison",
        topK: 3
      });

      const context = contextDocs.map(doc => doc.content).join('\n');

      console.log("🤖 Making AI call with knowledge base context...");
      
      // AI call with context
      const response = await this.opper.call({
        name: "product_comparison_with_context",
        instructions: `You are a product expert. Based on the provided product information, compare smartphones and make recommendations. Be specific about features and prices.`,
        inputSchema: {
          type: "object",
          properties: {
            question: { type: "string" },
            context: { type: "string" }
          },
          required: ["question"]
        },
        outputSchema: {
          type: "object",
          properties: {
            comparison: { type: "string" },
            recommendation: { type: "string" },
            key_differences: { type: "array", items: { type: "string" } }
          },
          required: ["comparison", "recommendation"]
        },
        input: {
          question: "Compare the available smartphones and recommend the best one",
          context: `Available products:\n${context}`
        },
        tags: {
          demo: "knowledge-enhanced-ai",
          type: "product-comparison"
        }
      });

          console.log("✅ AI Response:");
    const responseData = response.jsonPayload || {};
    console.log(`  📱 Comparison: ${responseData.comparison || 'N/A'}`);
    console.log(`  🎯 Recommendation: ${responseData.recommendation || 'N/A'}`);
    if (responseData.key_differences) {
      console.log("  🔍 Key Differences:");
      responseData.key_differences.forEach((diff: string, i: number) => {
        console.log(`    ${i + 1}. ${diff}`);
      });
    }

    } catch (error) {
      console.error("❌ AI calls with context failed:", error);
      throw error;
    }
  }

  async testStreamingWithTracing(): Promise<void> {
    printSection("Streaming with Basic Tracing Demo");

    try {
      console.log("🌊 Testing streaming function call...");
      
      const streamResponse = await this.opper.stream({
        name: "creative_writing_stream",
        instructions: "Write a creative short story about AI and humans working together. Make it engaging and optimistic.",
        inputSchema: {
          type: "object",
          properties: {
            theme: { type: "string" },
            tone: { type: "string" },
            length: { type: "string" }
          }
        },
        input: {
          theme: "AI-human collaboration",
          tone: "optimistic", 
          length: "short"
        },
        tags: {
          demo: "streaming-test",
          type: "creative-writing"
        }
      });

      console.log("✅ Streaming response received");
      console.log("📄 Stream result structure:", Object.keys(streamResponse));

    } catch (error) {
      console.error("❌ Streaming test failed:", error);
      throw error;
    }
  }

  async testAdvancedFunctionality(): Promise<void> {
    printSection("Advanced SDK Features Demo");

    try {
      // Test functions listing
      console.log("📋 Listing functions...");
      const functions = await this.opper.functions.list();
      console.log(`  ✅ Found ${functions.data?.length || 0} functions`);

      // Test language models
      console.log("🤖 Listing language models...");
      const models = await this.opper.languageModels.list();
      console.log(`  ✅ Found ${models.data?.length || 0} language models`);
      if (models.data && models.data.length > 0) {
        console.log(`  📝 Available models: ${models.data.slice(0, 3).map(m => m.name).join(', ')}`);
      }

      // Test traces
      console.log("🔍 Listing recent traces...");
      const traces = await this.opper.traces.list();
      console.log(`  ✅ Found ${traces.data?.length || 0} traces`);

      // Test embeddings
      console.log("🧮 Testing embeddings...");
      const embeddingResponse = await this.opper.embeddings.create({
        input: "This is a test text for embedding generation",
        model: "azure/text-embedding-3-large"
      });
      console.log(`  ✅ Generated embedding with ${embeddingResponse.data[0]?.embedding?.length || 0} dimensions`);

    } catch (error) {
      console.error("❌ Advanced functionality test failed:", error);
      throw error;
    }
  }

  async demonstrateComplexWorkflow(): Promise<void> {
    printSection("Complex Workflow Demo: Research Assistant");

    try {
      const researchQuery = "What's the best laptop for software development under $2000?";
      console.log(`🔬 Research Query: ${researchQuery}`);

      // Step 1: Search knowledge base
      console.log("  📖 Step 1: Searching knowledge base...");
      const relevantDocs = await this.opper.knowledge.query(this.knowledgeBaseId!, {
        query: researchQuery,
        topK: 3
      });

      // Step 2: Generate embedding for query analysis  
      console.log("  🧮 Step 2: Analyzing query semantics...");
      const queryEmbedding = await this.opper.embeddings.create({
        input: researchQuery,
        model: "azure/text-embedding-3-large"
      });

      // Step 3: AI-powered analysis
      console.log("  🤖 Step 3: Generating comprehensive analysis...");
      const context = relevantDocs.map(doc => 
        `${doc.content} (Relevance: ${doc.score?.toFixed(3)})`
      ).join('\n');

      const analysisResponse = await this.opper.call({
        name: "research_assistant_analysis",
        instructions: `You are a knowledgeable research assistant. Analyze the user's query and available product information to provide a comprehensive recommendation. Include specific reasons for your recommendation.`,
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            available_products: { type: "string" },
            budget_constraint: { type: "string" }
          },
          required: ["query", "available_products"]
        },
        outputSchema: {
          type: "object",
          properties: {
            recommendation: { type: "string" },
            reasoning: { type: "string" },
            alternatives: { type: "array", items: { type: "string" } },
            budget_analysis: { type: "string" }
          },
          required: ["recommendation", "reasoning"]
        },
        input: {
          query: researchQuery,
          available_products: context,
          budget_constraint: "under $2000"
        },
        tags: {
          workflow: "research-assistant",
          query_type: "product-recommendation"
        }
      });

      // Step 4: Present results
      console.log("  📊 Step 4: Research Results:");
      const analysisData = analysisResponse.jsonPayload || {};
      console.log(`    🎯 Recommendation: ${analysisData.recommendation || 'N/A'}`);
      console.log(`    💡 Reasoning: ${analysisData.reasoning || 'N/A'}`);
      console.log(`    💰 Budget Analysis: ${analysisData.budget_analysis || 'N/A'}`);
      
      if (analysisData.alternatives) {
        console.log("    🔄 Alternatives:");
        analysisData.alternatives.forEach((alt: string, i: number) => {
          console.log(`      ${i + 1}. ${alt}`);
        });
      }

      console.log(`  📈 Workflow completed successfully!`);
      console.log(`    - Knowledge base documents analyzed: ${relevantDocs.length}`);
      console.log(`    - Query embedding dimensions: ${queryEmbedding.data[0]?.embedding?.length || 0}`);
      console.log(`    - AI analysis completed with structured output`);

    } catch (error) {
      console.error("❌ Complex workflow failed:", error);
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    if (this.knowledgeBaseId) {
      try {
        console.log(`\n🧹 Cleaning up knowledge base: ${this.knowledgeBaseId}`);
        await this.opper.knowledge.delete(this.knowledgeBaseId);
        console.log("✅ Cleanup completed");
      } catch (error) {
        console.log(`⚠️ Warning: Could not delete knowledge base: ${error}`);
      }
    }
  }
}

// Original simple test functions
async function testBasicCall() {
  console.log("🧪 Testing basic Opper.call()...");
  
  const opper = new Opper({
    serverURL: OPPER_SERVER_URL,
    httpBearer: OPPER_API_KEY,
  });

  try {
    const result = await opper.call({
      name: "test_basic_math",
      instructions: "Solve the given math problem and show your work.",
      inputSchema: {
        type: "object",
        properties: {
          problem: { type: "string", description: "Math problem to solve" }
        },
        required: ["problem"]
      },
      outputSchema: {
        type: "object",
        properties: {
          answer: { type: "string", description: "The final answer" },
          steps: { type: "array", items: { type: "string" }, description: "Step by step solution" }
        },
        required: ["answer", "steps"]
      },
      input: { problem: "What is 15 * 23 + 7?" },
      tags: { test: "basic-call", category: "math" }
    });

    console.log("✅ Basic call successful!");
    const resultData = result.jsonPayload || {};
    console.log(`  Answer: ${resultData.answer || 'N/A'}`);
    console.log(`  Steps: ${resultData.steps?.join(' → ') || 'N/A'}`);
    return true;
  } catch (error) {
    console.error("❌ Basic call failed:", error);
    return false;
  }
}

async function testBasicStream() {
  console.log("\n🌊 Testing basic Opper.stream()...");
  
  const opper = new Opper({
    serverURL: OPPER_SERVER_URL,
    httpBearer: OPPER_API_KEY,
  });

  try {
    const result = await opper.stream({
      name: "test_creative_stream",
      instructions: "Write a haiku about technology.",
      input: { topic: "artificial intelligence" },
      tags: { test: "basic-stream", type: "poetry" }
    });

    console.log("✅ Stream call successful!");
    console.log("Stream result type:", typeof result);
    return true;
  } catch (error) {
    console.error("❌ Stream call failed:", error);
    return false;
  }
}

async function testListOperations() {
  console.log("\n📋 Testing list operations...");
  
  const opper = new Opper({
    serverURL: OPPER_SERVER_URL,
    httpBearer: OPPER_API_KEY,
  });

  try {
    const [functions, knowledge, models, traces] = await Promise.all([
      opper.functions.list(),
      opper.knowledge.list(),
      opper.languageModels.list(),
      opper.traces.list()
    ]);

    console.log("✅ List operations successful!");
    console.log(`  Functions: ${functions.data?.length || 0}`);
    console.log(`  Knowledge bases: ${knowledge.data?.length || 0}`);
    console.log(`  Language models: ${models.data?.length || 0}`);
    console.log(`  Traces: ${traces.data?.length || 0}`);
    
    return true;
  } catch (error) {
    console.error("❌ List operations failed:", error);
    return false;
  }
}

async function runComprehensiveDemo() {
  console.log("\n🚀 Running Comprehensive SDK Demo...");
  
  const opper = new Opper({
    serverURL: OPPER_SERVER_URL,
    httpBearer: OPPER_API_KEY,
  });

  const demo = new OpperComprehensiveExample(opper);

  try {
    // Run comprehensive demo
    await demo.createAndTestKnowledgeBase();
    await demo.testAICallsWithContext();
    await demo.testStreamingWithTracing();
    await demo.testAdvancedFunctionality();
    await demo.demonstrateComplexWorkflow();
    
    // Cleanup
    await demo.cleanup();

    console.log("\n🎉 Comprehensive demo completed successfully!");
    console.log("✨ All SDK features tested and working correctly.");
    
    return true;
  } catch (error) {
    console.error("❌ Comprehensive demo failed:", error);
    await demo.cleanup();
    return false;
  }
}

async function main() {
  console.log("🚀 Enhanced Opper SDK Test Suite");
  console.log("===============================");
  console.log(`Server URL: ${OPPER_SERVER_URL}`);
  console.log(`API Key: ${OPPER_API_KEY.substring(0, 10)}...`);
  console.log("");

  const tests = [
    { name: "Basic Call", fn: testBasicCall },
    { name: "Basic Stream", fn: testBasicStream }, 
    { name: "List Operations", fn: testListOperations },
    { name: "Comprehensive Demo", fn: runComprehensiveDemo }
  ];

  const results: { name: string; success: boolean }[] = [];

  for (const test of tests) {
    try {
      const success = await test.fn();
      results.push({ name: test.name, success });
    } catch (error) {
      console.error(`💥 Test ${test.name} threw an error:`, error);
      results.push({ name: test.name, success: false });
    }
  }

  console.log("\n📊 Test Results Summary");
  console.log("=======================");
  results.forEach(({ name, success }) => {
    const icon = success ? "✅" : "❌";
    console.log(`${icon} ${name}: ${success ? "PASSED" : "FAILED"}`);
  });

  const passed = results.filter(r => r.success).length;
  const total = results.length;
  console.log(`\n🎯 Overall: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log("🎉 All tests passed! The Opper SDK is working correctly.");
    process.exit(0);
  } else {
    console.log("⚠️ Some tests failed. Check the output above for details.");
    process.exit(1);
  }
}

// Handle CLI arguments
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
Enhanced Opper SDK Test Suite

Usage:
  npx tsx test-opper.ts

Environment Variables:
  OPPER_API_KEY or OPPER_HTTP_BEARER - Your Opper API key (required)
  OPPER_SERVER_URL - Opper server URL (default: https://api.opper.ai/v2)

Features:
  - Basic SDK functionality tests
  - Knowledge base creation and querying
  - AI calls with context from knowledge bases
  - Streaming functionality
  - Complex multi-step workflows
  - Embeddings and advanced features
  - Automatic cleanup

Examples:
  OPPER_API_KEY=your-key npx tsx test-opper.ts
`);
  process.exit(0);
}

// Run the tests
main().catch(error => {
  console.error("💥 Fatal error:", error);
  process.exit(1);
}); 