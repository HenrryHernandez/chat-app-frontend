interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export const InputText = ({ text, setText, placeholder }: Props) => {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="input-text"
      rows={1}
      placeholder={placeholder}
    />
  );
};
