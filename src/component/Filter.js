export default function Filter(props) {
  return (
    <div>
      {props.filters.map((filter) => (
        <span>{filter}</span>
      ))}
    </div>
  );
}
