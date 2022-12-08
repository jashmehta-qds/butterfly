import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect } from "react";
import { ListItemAvatar, Avatar } from "@mui/material";
import { ABI } from "./abi";
const CONTRACT_ADDRESS = "0x884B240451De381Cf15565A651D46283B6bDEb8F";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetworkMismatch,
  useSDK
} from "@thirdweb-dev/react";
import { useWalletConnect } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, ethers } from "ethers";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "80%",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  backgroundColor: "rgba(0,0,0)",
  color: "white",
};

const mint = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: "1.5rem",
  color: "black",
};

const mintCount = {
  fontSize: "1.5rem",
  color: "white",
};

const mintBtn = {
  marginTop: "1.5rem",
  backgroundColor: "rgba(255,255,255,0.1)",
};

const disconnectBtn = {
  marginTop: "1.5rem",
  backgroundColor: "rgba(255,255,255,0.05)",
};

interface MintModalProps {
  isOpen: boolean;
  onClose(): void;
}

const MintModal: React.FC<MintModalProps> = ({ onClose, isOpen }) => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnect = useDisconnect();
  const address = useAddress();
  const sdk = useSDK();
  const [totalAvailableSupply, setTotalAvailableSupply] =
    React.useState("????");
  const [contract, setContract] = React.useState<SmartContract<BaseContract>>();
  const [error, setError] = React.useState<string>();
  const isMismatched = useNetworkMismatch();

  useEffect(() => {
    const fetchData = async () => {
      return setContract(await sdk?.getContract(CONTRACT_ADDRESS, ABI));
    };
    fetchData();
  }, [sdk]);

  useEffect(() => {
    if (isMismatched) setError("Change your Network to Ethereum Mainnet");
  }, [error, isMismatched]);

  useEffect(() => {
    const supply = async () => {
      setTotalAvailableSupply(
        ((await contract?.call("totalSupply")) as Number).toString()
      );
    };
    supply();
  }, [contract]);

  const mintContract = async () => {
    const mintFn = await contract
      ?.call("mint", totalCount, {
        value: ethers.utils.parseEther((0.25 * totalCount).toString()), // send 0.1 ether with the contract call
      })
      .catch((res: any) => setError(res.toString()));
  };

  const [buttonStyles, setButtonStyles] = React.useState<{
    plusBtnColor: string;
    minusBtnColor: string;
  }>({ plusBtnColor: "black", minusBtnColor: "lightgray" });
  const [totalCount, setTotalCount] = React.useState(1);

  const incrementCount = () => {
    if (totalCount < 3) setTotalCount((res) => (res += 1));
  };

  useEffect(() => {
    if (totalCount > 2) {
      setButtonStyles({
        plusBtnColor: "rgba(255,255,255,0.4)",
        minusBtnColor: "white",
      });
    } else if (totalCount < 2) {
      setButtonStyles({
        plusBtnColor: "white",
        minusBtnColor: "rgba(255,255,255,0.4)",
      });
    } else {
      setButtonStyles({ plusBtnColor: "white", minusBtnColor: "white" });
    }
  }, [totalCount]);

  const decrementCount = () => {
    if (totalCount > 1) setTotalCount((res) => (res -= 1));
  };

  const errorReason = () => {
    if (error?.includes("Internal JSON-RPC")) return "Change your Network";
    if (error?.includes("insufficient funds")) return "Insufficient Balance";
    else return error;
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          <Box sx={style}>
            {!address && !error && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10,
                  gap: 50,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    onClick={connectWithMetamask}
                    src={"./metamask.png"}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemAvatar>
                  <Avatar
                    onClick={connectWithWalletConnect}
                    src={"./walletconnect.jpeg"}
                  ></Avatar>
                </ListItemAvatar>
              </div>
            )}
            {address && !error && (
              <>
                <h2>Butterfly Bubble</h2>
                <p> {totalAvailableSupply} / 33 Minted</p>
                <img
                  style={{ marginTop: "1rem", height: 100, width: 100 }}
                  src={"/logo720.png"}
                  alt={"1"}
                  loading="lazy"
                />
                <div style={mint}>
                  <RemoveCircleOutlineIcon
                    sx={{
                      color: buttonStyles.minusBtnColor,
                      cursor:
                        buttonStyles.minusBtnColor === "white" ? "pointer" : "",
                    }}
                    onClick={() => decrementCount()}
                  />
                  <div style={mintCount}>
                    <p>{totalCount}</p>
                  </div>
                  <AddCircleOutlineIcon
                    sx={{
                      color: buttonStyles.plusBtnColor,
                      cursor:
                        buttonStyles.plusBtnColor === "white" ? "pointer" : "",
                    }}
                    onClick={() => incrementCount()}
                  />
                </div>
                <p>Total Cost : {(totalCount * 0.25).toFixed(2)} Ξ </p>
                <Button
                  variant="contained"
                  style={mintBtn}
                  disabled={false}
                  onClick={() => mintContract()}
                >
                  <p style={{ padding: 0, margin: 0 }}>Mint</p>
                </Button>
                <p style={{ marginTop: -10 }}>
                  <Button
                    variant="contained"
                    style={disconnectBtn}
                    onClick={disconnect}
                  >
                    <p style={{ padding: 0, margin: 0 }}>Disconnect</p>
                  </Button>
                </p>
              </>
            )}
            {address && error && (
              <>
                <h2>Transaction Error</h2>
                <p>{errorReason()}</p>
                <Button
                  variant="contained"
                  style={mintBtn}
                  disabled={false}
                  onClick={() => setError(undefined)}
                >
                  Dismiss
                </Button>
              </>
            )}
          </Box>
        }
      </Modal>
    </>
  );
};

export default MintModal;
