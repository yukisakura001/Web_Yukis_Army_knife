import {
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Center,
  Tag,
  Link as ChakraLink,
} from "@yamada-ui/react";
import { Link } from "react-router-dom";

interface AppToolType {
  tag: string;
  Link: string;
  name: string;
  description: string;
  id: number;
}

export default function AppBox({ AppTool }: { AppTool: AppToolType }) {
  return (
    <div>
      <LinkBox
        as="article"
        maxW="sm"
        p="md"
        rounded="md"
        border="1px solid"
        borderColor="inherit"
        boxShadow="md"
        width="300px"
        height="200px"
      >
        <ChakraLink as={Link} to="/about">
          <Tag>{AppTool.tag}</Tag>
        </ChakraLink>

        <Heading size="md" my="sm">
          <Center>
            <LinkOverlay as={Link} to={AppTool.Link}>
              {AppTool.name}
            </LinkOverlay>
          </Center>
        </Heading>

        <Text>{AppTool.description}</Text>
      </LinkBox>
    </div>
  );
}
