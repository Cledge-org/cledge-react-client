type questionId = string;
type tag = string;
type key = string;

export interface UnMappedValues {
   [questionId: questionId]: tag;
}

interface QuestionMappings {
   [questionId: questionId]: {
      [tag: tag]: any;
   };
}

export interface MappedValues {
   [key: key | questionId]: { low_val: number | null, high_val: number | null, preferenceLevel?: number };
}

export default function getQuestionMappings(data: UnMappedValues, questionMappings: QuestionMappings): MappedValues {
   const mappedValues: MappedValues = {};

   for (const [questionId, tag] of Object.entries(data)) {
      if (questionMappings[questionId]) {
         mappedValues[questionId] = questionMappings[questionId][tag];
      } else {
         mappedValues[questionId] = {
            low_val: null,
            high_val: null,
            preferenceLevel: 1,
         };
      }
   }

   return mappedValues;
}