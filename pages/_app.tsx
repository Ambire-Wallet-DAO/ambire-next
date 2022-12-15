import { grommet, Grommet } from 'grommet';

// bg 24263D
// table header font 6F719A
// darker 1E2134
// body font E0E2EF

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '40px'
    },
    colors: {
      background: "transparent",
      text: "#E0E2EF",
      "heading-text": "#6F719A",
      border: "transparent",
      "accent": "#1E2134"
    }
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <Component {...pageProps} />
    </Grommet>
  );
}

export default MyApp;
