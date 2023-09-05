
export interface SignUpMCQProps {
  questionData: SignUpMCQInput
}

export interface SignUpMCQInput {
  question: string,
  options: SignUpMCQOption[]
}

interface SignUpMCQOption {
  optionText: string,
  optionValue: any
}

export default function SignUpMCQ(props: SignUpMCQProps) {
  return (
    <div>
      <p>{props.questionData.question}</p>
      {props.questionData.options.map((option) => {
        return (
          <div>
            <p>{option.optionText}</p>
          </div>
        )
      })}
    </div>
  )
}