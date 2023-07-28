import {NextApiRequest, NextApiResponse} from "next";
import {YoutubeTranscript} from "youtube-transcript"
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
export const config = {
    api: {
        externalResolver: true,
    },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    let {url} = JSON.parse(req.body);
    console.log("Video Id Request: ", url)
    if (url) {
        try {
            let description = await getVideoDescription(url);
            resolve.status(200).send(description);
        }
        catch (e) {
            resolve.status(500).send(e)
        }
    }
    else {
        resolve.status(400).send("No videoId provided");
    }
}

export function getVideoDescription(url: string): Promise<String> {
    return new Promise(async (res, err) => {
        try {
            let transcript;
            await YoutubeTranscript.fetchTranscript(url).then((transcript_response) => {
                if (transcript_response) {
                    // Take the "text" property of each transcript object and join them into a single string
                    transcript = transcript_response.map((t) => t.text).join(" ");
                }
            });
            transcript = transcript.replace("[Music]", "");
            console.log("Transcript: ", transcript);
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            })
            const openai = new OpenAIApi(configuration);
            console.log("Init OpenAI");
            let description;
            const chat_completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that creates descriptions for YouTube videos based on their transcripts.",
                    },
                    {
                        "role": "user",
                        "content": `Make an engaging description for this video: ${transcript}`,
                    },
                ],
                n: 1,
                temperature: 0.9,
            }).then((response) => {
                description = response.data.choices[0].message.content;;
            });
            console.log("Description inside: " + description)
            res(description);
        }
        catch (e) {
            err(e)
        }
    })
}