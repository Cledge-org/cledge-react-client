
export interface SignUpTextInput {
  onChange?: Function,
  placeholder?: string,
  value: any,
  type?: string
}

export default function SignUpText(props: SignUpTextInput) {
  return (
    <div className="">
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        value={props.value}
      />
    </div>
  )
}