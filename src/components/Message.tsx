interface Props {
  message: string;
}

export const Message = ({ message }: Props) => {
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  );
};
