import api from "lib/api";

import {SettingsResponse} from "@tryghost/content-api";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

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
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
