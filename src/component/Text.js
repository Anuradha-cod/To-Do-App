export default function Text(props) {
  const text = props.text;
  const words = text.split(/[ ]+/);
  console.log(words);
  return (
    <div>
      {words.map((word) => {
        if (word[0] == "#")
          return (
            <span
              className="hashtag"
              onClick={(e) => {
                e.stopPropagation();
                props.onHashTagClick(word);
              }}
            >
              {word}
            </span>
          );
        return word;
      })}
    </div>
  );
}
