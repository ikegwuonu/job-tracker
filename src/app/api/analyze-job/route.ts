import { type NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: `You are a career advisor AI. Analyze job descriptions and provide helpful insights for job seekers. 
      
      Your response should be in JSON format with exactly this structure:
      {
        "summary": "A concise 2-3 sentence summary of the job role and key responsibilities",
        "skills": ["skill1", "skill2", "skill3"]
      }
      
      For the skills array, provide exactly 3 of the most important technical or professional skills that a candidate should highlight in their resume for this position. Focus on skills that are explicitly mentioned or strongly implied in the job description.`,
      prompt: `Analyze this job description and provide a summary and 3 key skills to highlight:

${jobDescription}

Please respond with valid JSON only.`,
    });

    try {
      const analysis = JSON.parse(text);

      // Validate the response structure
      if (
        !analysis.summary ||
        !Array.isArray(analysis.skills) ||
        analysis.skills.length !== 3
      ) {
        throw new Error("Invalid response structure");
      }

      return NextResponse.json(analysis);
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      return NextResponse.json({
        summary:
          "This position offers an exciting opportunity to contribute to a dynamic team and grow your career in a challenging environment.",
        skills: ["Communication", "Problem Solving", "Teamwork"],
      });
    }
  } catch (error) {
    console.error("Error analyzing job description:", error);

    // Return a fallback response
    return NextResponse.json({
      summary:
        "Unable to analyze the job description at this time. Please try again later.",
      skills: ["Adaptability", "Critical Thinking", "Technical Skills"],
    });
  }
}
