import { generateText, generateObject } from 'ai';
import { defaultModel, selectModel } from '../ai/config';
import { GrantApplication, EligibilityResult, WorkflowResult } from './types';
import { z } from 'zod';

/**
 * Multi-step Grant Eligibility Checker Workflow
 *
 * This workflow demonstrates the Vercel AI SDK workflow pattern with:
 * 1. Initial analysis of grant application
 * 2. Research and fact-checking against grant database
 * 3. Refined eligibility determination with recommendations
 */
export async function grantEligibilityWorkflow(
  application: GrantApplication
): Promise<WorkflowResult<EligibilityResult>> {
  "use workflow";

  const startTime = Date.now();
  const steps: string[] = [];

  try {
    // Step 1: Initial Analysis
    steps.push('initial-analysis');
    const initialAnalysis = await analyzeApplication(application);

    // Step 2: Research Grant Database
    steps.push('research-grants');
    const grantMatches = await researchAvailableGrants(
      application,
      initialAnalysis
    );

    // Step 3: Fact-Check and Validate
    steps.push('fact-check');
    const validationResult = await validateEligibility(
      application,
      initialAnalysis,
      grantMatches
    );

    // Step 4: Generate Final Recommendation
    steps.push('final-recommendation');
    const finalResult = await generateFinalRecommendation(
      application,
      initialAnalysis,
      grantMatches,
      validationResult
    );

    return {
      success: true,
      data: finalResult,
      metadata: {
        duration: Date.now() - startTime,
        steps,
        model: 'claude-3-5-sonnet-20241022',
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: {
        duration: Date.now() - startTime,
        steps,
      },
    };
  }
}

// Step 1: Analyze the application
async function analyzeApplication(application: GrantApplication) {
  const { text } = await generateText({
    model: selectModel('balanced'),
    messages: [
      {
        role: 'user',
        content: `Analyze this grant application and identify key factors for eligibility:

Applicant: ${application.applicantName}
Organization Type: ${application.organizationType}
Location: ${application.location}
Revenue: ${application.revenue ? `$${application.revenue}` : 'Not provided'}
Project: ${application.projectDescription}
Funding Request: $${application.fundingAmount}
Purpose: ${application.purpose}

Provide:
1. Key strengths
2. Potential concerns
3. Organization profile assessment
4. Project viability assessment`,
      },
    ],
    temperature: 0.3,
  });

  return text;
}

// Step 2: Research available grants (simulated - would connect to real database)
async function researchAvailableGrants(
  application: GrantApplication,
  analysis: string
) {
  // In production, this would query your Supabase database
  // For now, we'll use AI to simulate grant matching
  const { object } = await generateObject({
    model: selectModel('balanced'),
    schema: z.object({
      matches: z.array(
        z.object({
          grantName: z.string(),
          matchScore: z.number().min(0).max(100),
          reason: z.string(),
          eligibilityCriteria: z.array(z.string()),
        })
      ),
    }),
    messages: [
      {
        role: 'user',
        content: `Based on this analysis, identify potential grant programs that might be a good match:

${analysis}

Organization: ${application.organizationType}
Location: ${application.location}
Purpose: ${application.purpose}
Amount: $${application.fundingAmount}

Return 3-5 potential grant matches with scores.`,
      },
    ],
  });

  return object.matches;
}

// Step 3: Validate eligibility with fact-checking
async function validateEligibility(
  application: GrantApplication,
  analysis: string,
  grantMatches: Array<{
    grantName: string;
    matchScore: number;
    reason: string;
    eligibilityCriteria: string[];
  }>
) {
  const { object } = await generateObject({
    model: selectModel('complex'),
    schema: z.object({
      eligible: z.boolean(),
      score: z.number().min(0).max(100),
      matchedCriteria: z.array(z.string()),
      concerns: z.array(z.string()),
      factCheckResults: z.array(
        z.object({
          claim: z.string(),
          verified: z.boolean(),
          note: z.string(),
        })
      ),
    }),
    messages: [
      {
        role: 'user',
        content: `Validate the eligibility of this application with fact-checking:

ANALYSIS:
${analysis}

GRANT MATCHES:
${JSON.stringify(grantMatches, null, 2)}

APPLICATION DATA:
${JSON.stringify(application, null, 2)}

Perform rigorous fact-checking and validation:
1. Verify claims against standard eligibility criteria
2. Check for inconsistencies
3. Assess realistic funding expectations
4. Validate organization type compatibility

Provide an overall eligibility score (0-100) and specific concerns.`,
      },
    ],
  });

  return object;
}

// Step 4: Generate final recommendation
async function generateFinalRecommendation(
  application: GrantApplication,
  analysis: string,
  grantMatches: any[],
  validation: any
): Promise<EligibilityResult> {
  const { object } = await generateObject({
    model: selectModel('balanced'),
    schema: z.object({
      eligible: z.boolean(),
      score: z.number().min(0).max(100),
      reasoning: z.string(),
      matchedCriteria: z.array(z.string()),
      concerns: z.array(z.string()),
      recommendations: z.array(z.string()),
      grantSuggestions: z.array(
        z.object({
          name: z.string(),
          matchScore: z.number(),
          reason: z.string(),
        })
      ),
    }),
    messages: [
      {
        role: 'user',
        content: `Generate a final eligibility determination and recommendations:

VALIDATION RESULTS:
${JSON.stringify(validation, null, 2)}

GRANT MATCHES:
${JSON.stringify(grantMatches, null, 2)}

Provide:
1. Final eligible/not eligible determination
2. Overall score (0-100)
3. Clear reasoning
4. Specific matched criteria
5. Areas of concern
6. Actionable recommendations for improving the application
7. Top 3 grant suggestions with match scores`,
      },
    ],
  });

  return object;
}
