import OpenAI from "openai";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

export const parseEntry = asyncHandler(async (req, res, next) => {
    const SYSTEM_PROMPT_TEMPLATE = `
You are a veterinary health data assistant. Your task is to extract structured pet health data from natural language input provided by pet owners. Your final answer must be exactly one valid JSON object in this exact structure. Do not add any explanation, commentary, or markdown syntax. If any field is missing in the user input, leave it empty.

If the date in the input is relative (like "today" or "yesterday"), convert it to the ISO date format "YYYY-MM-DD" assuming today's date is {{TODAY}}.

For weight, output only the numeric value in kilograms without units.

For the medication route field, choose one of these values: "oral", "injection", "topical", "eye drops", "other". Only set the route if the input clearly indicates how it is given. For example, if the text mentions "with food", "feeding", "eating" or "swallowing", set route to "oral". If it says "topical" or "injection", use that. If there is no clear hint about the route, leave it empty. If the dosage mentions "once a day with food", infer that the route is "oral".

If the medication mentions a duration (like "for 5 days" or "for 10 days"), set startDate as the date of the visit (or today) and calculate endDate by adding the duration in days. Use ISO date format "YYYY-MM-DD" assuming today's date is {{TODAY}}.

Output exactly ONE valid JSON object. Do not repeat the JSON or include multiple JSON blocks. Do not add any formatting or markdown syntax like \`\`\`json. Do not add any text like "json", "Copy", "Edit" or any instructions for the user.

{
  "petName": "",
  "vetVisit": {
    "date": "",
    "reason": "",
    "vet": "",
    "notes": ""
  },
  "weight": {
    "date": "",
    "weight": ""
  },
  "medication": {
    "name": "",
    "reason": "",
    "dosage": "",
    "route": "",
    "startDate": "",
    "endDate": "",
    "comment": ""
  },
  "vaccination": {
    "name": "",
    "date": "",
    "interval": "",
    "vet": "",
    "comment": ""
  }
}
`;

    const todayISO = new Date().toISOString().split("T")[0];
    const SYSTEM_PROMPT = SYSTEM_PROMPT_TEMPLATE.replaceAll(
        "{{TODAY}}",
        todayISO
    );

    const MOCK_MODE = process.env.MOCK_AI === "true";

    const { userInput } = req.body;

    if (!userInput) {
        throw new errorResponse("User input is required", 400);
    }

    if (MOCK_MODE) {
        // Mock response for testing purposes
        console.log("Mock AI mode enabled. Returning mock response.");
        return res.json({
            success: true,
            data: {
                petName: "Mock Pet",
                vetVisit: {
                    date: todayISO,
                    reason: "Routine checkup",
                    vet: "",
                    notes: "No issues found.",
                },
                weight: {
                    date: todayISO,
                    weight: "5.0",
                },
                medication: {
                    name: "",
                    reason: "",
                    dosage: "",
                    route: "",
                    startDate: "",
                    endDate: "",
                    comment: "",
                },
                vaccination: {
                    name: "",
                    date: "",
                    interval: "",
                    vet: "",
                    comment: "",
                },
            },
        });
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Call OpenAI API to parse the user input
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userInput },
        ],
        max_tokens: 1500,
        temperature: 0.2,
    });

    const aiText = completion.choices[0].message.content;

    let aiData;
    try {
        aiData = JSON.parse(aiText);
    } catch (error) {
        throw new errorResponse("Failed to parse AI response as JSON", 500);
    }

    res.json({
        success: true,
        data: aiData,
    });
});
