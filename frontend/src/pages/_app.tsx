import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/utils/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

const rootElement = () => document.getElementById("__next");

export const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    primary: {
      main: "#568124", // green
      light: "#E5E9E0", // green gray
    },
    secondary: {
      main: "#8D8D8D", // dark gray
      light: "#D9D9D9", // medium gray
    },
    warning: {
      main: "#D67300", // orange
      light: "#F1E8DC", // muted orange
    },
    error: {
      main: "#CB2F2F", // red
      light: "#EDCDCD", // muted red
    },
    background: {
      default: "#FFFFFF",
    },
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

// Note: default retry is 3 times.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Layout>
              <Head>
                <title>LFBI Volunteer Platform</title>
              </Head>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
