import {NextApiRequest, NextApiResponse} from "next";
import {YoutubeTranscript} from "youtube-transcript"
const { Configuration, OpenAIApi } = require("openai");
export const config = {
    api: {
        externalResolver: true,
    },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const {videoId} = JSON.parse(req.body);
    if (videoId) {
        try {
            let description = await getVideoDescription(videoId);
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

export function getVideoDescription(videoId: string): Promise<String> {
    return new Promise(async (res, err) => {
        try {
            let transcript = YoutubeTranscript.fetchTranscript(videoId);
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            })
            const openai = new OpenAIApi(configuration);
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
            });
            let description = chat_completion.choices[0].message.content;
            res(description);
        }
        catch (e) {
            err(e)
        }
    })
}