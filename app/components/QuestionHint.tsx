export const QuestionHint = ({
  listItems,
}: {
  listItems: {
    label: string;
    hint: string;
  }[];
}) => {
  return (
    <ul>
      {listItems.map((listItem) => (
        <li key={listItem.label} className="mb-1">
          <span className="font-medium">{listItem.label}</span> —{" "}
          {listItem.hint}
        </li>
      ))}
    </ul>
  );
};
