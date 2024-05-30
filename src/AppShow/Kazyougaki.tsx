import { Heading, Textarea, Box, Button, useClipboard } from "@yamada-ui/react";
import { Markdown } from "@yamada-ui/markdown";
import { useState, ChangeEvent } from "react";

const Kazyougaki = () => {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
    setText2(get_input(event.target.value));
    setValue(get_input(event.target.value));
  }

  function replaceLeadingSpacesWithHash(input: string, txt: string): string {
    const leadingSpaces = input.match(/^\s*/);
    if (leadingSpaces) {
      const numSpaces = leadingSpaces[0].length;
      if (numSpaces > 0) {
        let replacement = "";
        for (let i = 0; i < Math.ceil(numSpaces / 2); i++) {
          replacement += txt;
        }
        return input.replace(/^\s*/, replacement);
      }
    }
    return input; // 空白がない場合やエラーの場合はそのまま返す
  }

  function countLeadingSpaces(input: string): number {
    const leadingSpaces = input.match(/^\s*/);
    if (leadingSpaces) {
      return leadingSpaces[0].length;
    } else {
      return 0; // No leading spaces
    }
  }

  function get_input(content: string): string {
    let arrayFromString = content.split("\n");
    let array: string[] = [];
    for (let i = 0; i < arrayFromString.length; i++) {
      if (
        i < arrayFromString.length - 1 &&
        countLeadingSpaces(arrayFromString[i + 1]) >
          countLeadingSpaces(arrayFromString[i])
      ) {
        array.push(
          replaceLeadingSpacesWithHash(
            arrayFromString[i].replace("- ", "# "),
            "#"
          )
        );
      } else if (
        i > 0 &&
        array[i - 1].startsWith("#") &&
        countLeadingSpaces(arrayFromString[i]) ===
          countLeadingSpaces(arrayFromString[i - 1])
      ) {
        array.push(
          replaceLeadingSpacesWithHash(
            arrayFromString[i].replace("- ", "# "),
            "#"
          )
        );
      } else if (
        i > 0 &&
        countLeadingSpaces(arrayFromString[i]) <
          countLeadingSpaces(arrayFromString[i - 1])
      ) {
        array.push(
          replaceLeadingSpacesWithHash(
            arrayFromString[i].replace("- ", "# "),
            "#"
          )
        );
      } else {
        array.push(replaceLeadingSpacesWithHash(arrayFromString[i], ""));
      }
    }
    return array.join("\n");
  }

  const { onCopy, value, setValue, hasCopied } = useClipboard();

  return (
    <>
      <Heading>箇条書き文書化</Heading>
      <Button variant="outline" onClick={onCopy}>
        変換後をコピー
      </Button>
      <Textarea
        autosize
        minRows={4}
        placeholder="箇条書きを書いてください"
        value={text}
        onChange={handleChange}
      />

      <Box style={{ marginTop: 10 }}>
        <Markdown>{text2}</Markdown>
      </Box>
    </>
  );
};

export default Kazyougaki;
