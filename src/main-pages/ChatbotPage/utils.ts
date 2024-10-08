import { callGetChatbotResponse, callPutChatbotCounselorQuestion } from "src/utils/apiCalls";

export const introductionWorkflow = {
  e1: {
    chatbotMessages: [
      "Hello there! I'm Cledge, your AI college advisor.",
      "I’m here to help you with any college-related questions",
      "One tip that I have for you is that you can ask me DETAILED and OBJECTIVE questions!",
      "Click on one of the questions below to try 👇",
    ],
    possibleChoices: {
      "Does it look good on college applications if I skip Spanish 3 for an academic year and take it in another year in high school?":
        "e2op1",
    },
  },
  e2op1: {
    chatbotMessages: [
      "There is no one-size-fits-all answer to this question, as each college has different policies regarding placement tests and credit for AP courses. However, it is generally a good idea to complete all required courses before applying to college. This will give you the best chance of being placed in the appropriate level classes when you begin college, and will also avoid the hassle of having to make up required courses later on.",
    ],
    possibleChoices: {
      "Also show me examples of bad questions": "e3op1",
      "I'm ready": "e3op2",
    },
  },
  e3op1: {
    chatbotMessages: [
      "Here’s a bad example!\n“How do I go about finding a list of colleges that will accept an average/good student to an engineering or technology program with lower costs? Is there a pre-published list or an app that I can use? For example, let’s say I want to get a list of colleges that may accept a student with about 3.6 GPA, 5 rigorous courses (AP/DE) and 1140 SAT score to mechanical engineering. And would cost about say $35k pre year?",
      "Why it's bad?",
      "There are multiple questions in this larger question. Break up questions into smaller pieces and ask them individually.",
      "Okay! Now bring in any questions you have!",
    ],
  },
  e3op2: {
    chatbotMessages: ["Okay! Now bring in any questions you have!"],
  },
};
export const downvoteWorkflow = {
  e1: {
    chatbotMessages: [
      "I'm sorry you didn't like the answer. Can you tell me why?",
    ],
    possibleChoices: {
      "Hard to read": "e2",
      "Not enough information": "e2",
      "Incorrectly classified question": "e2",
      "Not relavant to me": "e2",
      "Information is not accurate": "e2",
    },
  },
  e2: {
    chatbotMessages: [
      "Thank you for your feedback. Would you like me to try to answer the question again?",
    ],
    possibleChoices: {
      "Yes, go ahead": "e3op1",
      "No it's fine": "e3op2",
    },
  },
  e3op1: {
    backgroundAction: async (
      accountInfo: AccountInfo,
      question: string,
      answer: string,
      problem: string,
      questionParams?: QuestionParams,
      shouldCount?: boolean,
    ) => {
      const {response, responseId} = await callGetChatbotResponse(
        question,
        accountInfo.name,
        accountInfo.email,
        null,
        questionParams,
        shouldCount
      );
      return response;
    },
    chatbotMessages: [
      "Did this do a better job of answering your question?"
    ],
    possibleChoices: {
      "Yes it did, thank you!": "e3op4",
      "No, it did not": "e4"
    }
  },
  e3op2: {
    chatbotMessages: [
      "Understood. Feel free to ask another question."
    ]
  },
  e3op4: {
    chatbotMessages: [
      "Glad I could be of help. Feel free to ask another question!"
    ]
  },
  e4: {
    chatbotMessages: [
      "Sorry about that. Would you like a human counselor to give you a better answer?",
    ],
    possibleChoices: {
      "Yes, I would love a better response from a human counselor": "e5op1",
      "No it's fine": "e5op2",
    },
  },
  e5op1: {
    backgroundAction: async (
      accountInfo: AccountInfo,
      question: string,
      answer: string,
      problem: string,
      questionParams?: QuestionParams
    ) => {
      callPutChatbotCounselorQuestion({
        chatbotData: {
          email: accountInfo.email,
          name: accountInfo.name,
          resolved: false,
          question,
          answer,
          problem,
        },
      });
      return Promise.resolve("");
    },
    chatbotMessages: [
      "Got it! Our counselor will get back to you within 48 hours. Expect an email from: ayan@cledge.org",
    ],
  },
  e5op2: {
    chatbotMessages: [],
  },
};
export const getChatbotMessagesFormatted = (chatbotMessages: string[]) => {
  return chatbotMessages.map((message) => ({
    isOnLeft: true,
    message,
  }));
};
