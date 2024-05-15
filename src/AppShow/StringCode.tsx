import React, { useState } from "react";
import jschardet from "jschardet";
import iconv from "iconv-lite";
import { Buffer } from "buffer";
import { Button, Input, Heading, Text } from "@yamada-ui/react";

const StringCode: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>("");
  const [encoding, setEncoding] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [targetEncoding, setTargetEncoding] = useState<string>("utf-8");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryContent = event.target?.result as string;
        const detectedEncoding = jschardet.detect(binaryContent);
        setEncoding(detectedEncoding.encoding || "Unknown");
        const decodedContent = iconv.decode(
          Buffer.from(binaryContent, "binary"),
          detectedEncoding.encoding || "utf-8"
        );
        setFileContent(decodedContent);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleConvertAndDownload = () => {
    // ここでターゲットの文字コードを指定します
    const encodedContent = iconv.encode(fileContent, targetEncoding);
    const blob = new Blob([encodedContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    // 元のファイル名に '-converted' サフィックスを追加
    const convertedFileName = fileName
      ? fileName.replace(/(\.[^.]*)$/, "-converted$1")
      : "converted.txt";

    const a = document.createElement("a");
    a.href = url;
    a.download = convertedFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Heading as="h1">文字コード判別および変換ツール</Heading>
      <Heading as="h2" style={{ marginTop: 10 }}>
        ファイルを選択
      </Heading>
      <Input type="file" onChange={handleFileChange} />
      {fileContent && (
        <div>
          <Heading as="h2" style={{ marginTop: 10 }}>
            判別結果
          </Heading>
          <p style={{ marginTop: "20px" }}>
            <Text>文字コード：{encoding}</Text>
          </p>
          <Heading as="h2" style={{ marginTop: 20 }}>
            変換してダウンロード
          </Heading>
          <label>
            <input
              type="radio"
              value="utf-8"
              checked={targetEncoding === "utf-8"}
              onChange={() => setTargetEncoding("utf-8")}
            />
            UTF-8
          </label>
          <label>
            <input
              type="radio"
              value="shift_jis"
              checked={targetEncoding === "shift_jis"}
              onChange={() => setTargetEncoding("shift_jis")}
            />
            Shift-JIS
          </label>
          <br />
          <Button onClick={handleConvertAndDownload}>ダウンロード</Button>
          <br />
          <Heading as="h2" style={{ marginTop: 20 }}>
            ファイル内容
          </Heading>
          <pre style={{ marginTop: 10 }}>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default StringCode;
