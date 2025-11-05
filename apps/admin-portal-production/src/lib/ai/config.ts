import { anthropic } from '@ai-sdk/anthropic';
import { createAnthropic } from '@ai-sdk/anthropic';

// Initialize Anthropic provider with API key from environment
const anthropicProvider = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Default model configuration
export const defaultModel = anthropicProvider('claude-3-5-sonnet-20241022');

// Alternative models for different use cases
export const models = {
  // Fast, cost-effective for simple tasks
  haiku: anthropicProvider('claude-3-5-haiku-20241022'),

  // Balanced performance and cost
  sonnet: anthropicProvider('claude-3-5-sonnet-20241022'),

  // Most capable for complex reasoning
  opus: anthropicProvider('claude-3-opus-20240229'),
};

// Model selection helper
export function selectModel(complexity: 'simple' | 'balanced' | 'complex' = 'balanced') {
  switch (complexity) {
    case 'simple':
      return models.haiku;
    case 'complex':
      return models.opus;
    case 'balanced':
    default:
      return models.sonnet;
  }
}
