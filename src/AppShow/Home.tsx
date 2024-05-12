import AppBox from "../components/AppBox";
import { Wrap } from "@yamada-ui/react";

const Home = () => {
  interface AppToolType {
    tag: string;
    Link: string;
    name: string;
    description: string;
    id: number;
  }
  const App_dictionary = [
    {
      id: 1,
      name: "箇条書き文章化",
      description: "",
      tag: "テキスト",
      Link: "/Kazyougaki",
    },
    {
      id: 2,
      name: "箇条書き2",
      description: "解説2",
      tag: "tag1",
      Link: "/about",
    },
    {
      id: 3,
      name: "箇条書き3",
      description: "解説3",
      tag: "tag1",
      Link: "/about",
    },
  ];
  return (
    <Wrap gap="md">
      {App_dictionary.map((AppTool: AppToolType) => (
        <AppBox key={AppTool.id} AppTool={AppTool} />
      ))}
    </Wrap>
  );
};

export default Home;
