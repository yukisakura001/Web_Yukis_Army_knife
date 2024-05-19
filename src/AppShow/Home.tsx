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
      description: "構造化された箇条書きに見出しをつけて見やすくするツールです",
      tag: "テキスト",
      Link: "/Kazyougaki",
    },
    {
      id: 2,
      name: "文字コード変換",
      description:
        "テキストファイルの文字コードを表示・変換することができるツールです",
      tag: "テキスト",
      Link: "/StringCode",
    },
    {
      id: 3,
      name: "ルーレット",
      description: "ルーレットを回して選択をランダムに行うツールです",
      tag: "小物",
      Link: "/Roulette",
    },
  ];
  return (
    <Wrap gap="md" style={{ justifyContent: "center" }}>
      {App_dictionary.map((AppTool: AppToolType) => (
        <AppBox key={AppTool.id} AppTool={AppTool} />
      ))}
    </Wrap>
  );
};

export default Home;
