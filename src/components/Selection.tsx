import { Link } from "react-router-dom";

type languageObj = {
  name: string;
  code: string;
};

const languages: languageObj[] = [
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "French",
    code: "fr",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "Japanese",
    code: "ja",
  },
];

const Selection = () => {
  return (
    <div id="selection">
      {languages.map(({ name, code }: languageObj) => (
        <Link key={code} to={`/learn?lan=${code}`}>
          {name}
          <br />
        </Link>
      ))}
    </div>
  );
};

export default Selection;
