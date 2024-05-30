import { Heading, Button, Text, Textarea } from "@yamada-ui/react";
import { useState } from "react";

const Roulette = () => {
  const [content, setContent] = useState<string[]>([]);
  const [randomContent, setRandomContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valueList = e.target.value.split("\n");
    for (let i = 0; i < valueList.length; i++) {
      if (valueList[i] === "") {
        valueList.splice(i, 1);
        i--;
      }
    }
    setContent([...valueList]);
  };

  const handle = () => {
    const random = Math.floor(Math.random() * content.length);
    setRandomContent(content[random]);
  };

  return (
    <>
      <Heading as="h1">抽選</Heading>
      <Textarea
        onChange={handleChange}
        autosize
        placeholder="項目を改行で分けてください"
        minRows={4}
      ></Textarea>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handle}>スタート</Button>
        <Heading as="h2" style={{ marginTop: 30 }}>
          結果
        </Heading>
        <Text fontSize="6xl">{randomContent}</Text>
      </div>
    </>
  );
};

export default Roulette;
