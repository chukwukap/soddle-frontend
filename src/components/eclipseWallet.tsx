import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ECLIPSE_CLUSTERS, useEclipseCluster } from "@/hooks/useEclipseCluster";
import { useEffect } from "react";
import Button2 from "@/components/ui/button2";
import { useProgram } from "@/hooks/useProgram";
const EclipseWallets = () => {
  const { publicKey, disconnect, connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const { cluster, setCluster } = useEclipseCluster();
  const getProgram = useProgram();

  useEffect(() => {
    if (connected) {
      const program = getProgram();
      if (program) {
        console.log("Connected to Soddle program");
      }
    }
  }, [connected, getProgram]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Connect to Eclipse</h2>
        <select
          className="select select-bordered w-full max-w-xs"
          value={cluster.name}
          onChange={(e) => setCluster(e.target.value as any)}
        >
          {Object.entries(ECLIPSE_CLUSTERS).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
        <Button2
          onClick={connected ? handleDisconnect : handleConnect}
          backgroundColor="#181716"
          borderColor="#2FFF2B"
          className="w-full"
        >
          {connecting
            ? "Connecting..."
            : connected
            ? "Disconnect"
            : "Connect Wallet"}
        </Button2>
        {connected && (
          <div className="alert alert-success">
            <div>
              <span>Connected: {publicKey?.toBase58().slice(0, 8)}...</span>
            </div>
          </div>
        )}
        {connected && (
          <div className="alert alert-info">
            <div>
              <span>Ready to play Soddle!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EclipseWallets;
