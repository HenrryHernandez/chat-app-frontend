interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const InputText = ({ text, setText }: Props) => {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="input-text"
      rows={1}
    />
  );
};
