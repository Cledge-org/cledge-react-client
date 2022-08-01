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
export const getChatbotMessagesFormatted = (chatbotMessages: string[]) => {
  return chatbotMessages.map((message) => ({
    isOnLeft: true,
    message,
  }));
};
