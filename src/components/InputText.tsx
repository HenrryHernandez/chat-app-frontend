interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const InputText = ({ text, setText }: Props) => {
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
