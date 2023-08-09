interface Props {
  text: string;
}

// Component fluidtext will take a prop {text} and displays an svg with a text that is responsive to the width of the container and the text is centered vertically and horizontally in the container 
const FluidText = ({ text }: Props) => {
  return (
      <svg
        viewBox="0 0 100 18">
        <text x="0" y="15">
          {text}
        </text>
      </svg>
  );
};

export default FluidText;
