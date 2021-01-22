import "../styles/globals.css";
import TopMenu from "../components/TopMenu";
import { Box, ChakraProvider } from "@chakra-ui/react";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TopMenu />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
