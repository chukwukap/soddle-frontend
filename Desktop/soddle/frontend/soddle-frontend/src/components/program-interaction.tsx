// "use client";

// import { useState } from "react";
// import { useAnchorProgram } from "@/hooks/use-anchor-program";
// import { useWallet } from "@solana/wallet-adapter-react";
// import {
//   useEclipseCluster,
//   ECLIPSE_CLUSTERS,
// } from "@/hooks/use-eclipse-cluster";

// export function ProgramInteraction() {
//   const { program, cluster } = useAnchorProgram();
//   const { publicKey } = useWallet();
//   const { setCluster } = useEclipseCluster();
//   const [result, setResult] = useState<string | null>(null);

//   const handleInteraction = async () => {
//     if (!program || !publicKey) return;

//     try {
//       // Replace with your actual program interaction
//       const tx = await program.methods
//         .yourMethod()
//         .accounts({
//           user: publicKey,
//           // other accounts...
//         })
//         .rpc();
//       setResult(`Transaction successful: ${tx}`);
//     } catch (error) {
//       setResult(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <p>Current Cluster: {cluster}</p>
//         <select
//           onChange={(e) =>
//             setCluster(e.target.value as keyof typeof ECLIPSE_CLUSTERS)
//           }
//         >
//           {Object.keys(ECLIPSE_CLUSTERS).map((name) => (
//             <option key={name} value={name}>
//               {ECLIPSE_CLUSTERS[name as keyof typeof ECLIPSE_CLUSTERS].name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button onClick={handleInteraction}>Interact with Program</button>
//       {result && (
//         <p>
//           {result}{" "}
//           <a
//             href={`${
//               ECLIPSE_CLUSTERS[cluster as keyof typeof ECLIPSE_CLUSTERS]
//                 .explorer
//             }/tx/${result.split(": ")[1]}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             View on Explorer
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }
