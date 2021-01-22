import { Button, HStack, Link } from "@chakra-ui/react"
import NextLink from "next/link";

const TopMenu = () => {
  return (
    <HStack p={3}>
      <Button variant="ghost">Home</Button>
      <NextLink href="/flows">
        <Link>
          <Button variant="ghost">Flows</Button>
        </Link>
      </NextLink>
    </HStack>
  );
}

export default TopMenu