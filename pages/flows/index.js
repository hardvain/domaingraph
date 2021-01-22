import { Box, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
const Flows = () => {
  return (
    <Box>
      <NextLink href="/flows/new">
        <Link>
          <Button>New Flow</Button>
        </Link>
      </NextLink>
    </Box>
  );
};

export default Flows;