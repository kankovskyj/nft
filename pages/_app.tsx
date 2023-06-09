import { Lucid } from "lucid-cardano";
import "use-cardano/styles/use-cardano.css";
import "../styles/globals.css";
import "../styles/use-cardano-overrides.css";

import { DefaultLayout } from "layouts/DefaultLayout";
import type { AppProps } from "next/app";
import {
  CardanoProvider,
  CardanoToaster,
  UseCardanoOptions,
} from "use-cardano";

const options: UseCardanoOptions = {
  allowedNetworks: ["Testnet"],
  testnetNetwork: "Preprod",
  node: {
    provider: "blockfrost-proxy",
    proxyUrl: "/api/blockfrost",
  },
};

const lucid = await Lucid.new();

const privateKey = lucid?.utils.generatePrivateKey(); // Bech32 encoded private key
console.log(privateKey);

lucid.selectWalletFromPrivateKey(privateKey);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CardanoProvider options={options}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>

      <CardanoToaster />
    </CardanoProvider>
  );
}
