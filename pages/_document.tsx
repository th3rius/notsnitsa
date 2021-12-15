import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import api from "../lib/api";
import {SettingsResponse} from "@tryghost/content-api";

export interface MyDocumentProps {
  settings: SettingsResponse;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const settings = await api.settings.browse();
    return {...initialProps, settings};
  }

  render() {
    return (
      <Html lang={this.props.settings.lang}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lora&family=Open+Sans&display=swap"
            rel="stylesheet"
          />
          <meta property="og:title" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
