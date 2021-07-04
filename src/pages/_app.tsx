import { ButtonProps, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Layout } from 'components/Layout';
import { Provider } from 'react-redux';
import store from 'store';
import 'styles/styles.scss';
import 'styles/technical_test.scss';

type MappingType = Partial<Record<ButtonProps['variant'], string | number>>;

const styledBy = (property: string, mapping: MappingType) => (props: Record<string, any>) => mapping[props[property]];
const styledByVariant = (mapping: MappingType) => styledBy('variant', mapping);

const theme = createMuiTheme({
  palette: {
    primary: { main: '#000', dark: '#E35D78', light: '#F68092' },
    secondary: { main: '#FFF' },
    text: { primary: '#606060' },
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto'].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 100,
        textTransform: 'none',
        fontSize: 16,
        color: styledByVariant({
          contained: 'white',
          outlined: '#3FB0AA',
        }),
        backgroundColor: styledByVariant({
          contained: '#F68092',
        }),
        borderWidth: styledByVariant({
          contained: 2,
          outlined: 2,
        }),
        borderStyle: 'solid',
        borderColor: styledByVariant({
          contained: '#F68092',
          outlined: '#3FB0AA',
        }),
        '&:hover': {
          color: styledByVariant({
            outlined: 'white',
          }),
          backgroundColor: styledByVariant({
            contained: '#E35D78',
            outlined: '#3FB0AA',
          }),
          borderColor: styledByVariant({
            contained: '#E35D78',
            outlined: '#3FB0AA',
          }),
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout title={Component.pageTitle} subtitle={Component.pageSubtitle}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
