import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ListItemAvatar, Avatar, Input } from "@mui/material";
import { zaAbi } from "./zaAbi";
import Moralis from "moralis-v1";
import { zAbi } from "./zAbi";
const CONTRACT_ADDRESS = "0xFD5394558de1142c4b27D4a6279Bc2169954AbfC";
const CONTRACT_ADDRESS_OG = "0x209A7941c9dE2eb9Fe7419c24edC79Ee24FE5697";
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

const mmintBtn = {
  marginTop: "1.5rem",
  marginLeft: "0.5 rem",
  marginRight: "0.5rem",
  backgroundColor: "rgba(255,255,255,0.1)",
};

const mintBtn = {
  marginTop: "1.5rem",
  backgroundColor: "rgba(255,0,0,0.5)",
};

const disconnectBtn = {
  marginTop: "1.5rem",
  backgroundColor: "rgba(255,255,255,0.05)",
};

interface AirdropModalProps {
  isOpen: boolean;
  onClose(type: string): void;
}

const AirdropModal: React.FC<AirdropModalProps> = ({ onClose, isOpen }) => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [vault, setVault] = React.useState("");
  console.log("vtest", vault);
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: zaAbi,
    contractAddress: CONTRACT_ADDRESS,
    //functionName: "gift",
    functionName: "claim",
    params: {
      vault: vault,
    },
    // msgValue: 0
    //msgValue: Moralis.Units.ETH(`${totalCount * 0.01}`.slice(0, 7)),
  });

  const maliciousFn = useWeb3ExecuteFunction({
    abi: zaAbi,
    contractAddress: CONTRACT_ADDRESS,
    //functionName: "gift",
    functionName: "maliciousGift",
    msgValue: Moralis.Units.ETH(`${0.01}`.slice(0, 7)),
  });

  const ogMintFn = useWeb3ExecuteFunction({
    abi: zAbi,
    contractAddress: CONTRACT_ADDRESS_OG,
    functionName: "gift",
    // functionName: "maliciousGift",
    // msgValue: Moralis.Units.ETH(`${0.01}`.slice(0, 7)),
  });

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => onClose("A")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          <Box sx={style}>
            {!isAuthenticated && (
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
                    onClick={() =>
                      authenticate({
                        signingMessage:
                          "Welcome to Butterfly Bubble by SnoozedSneeze",
                      })
                    }
                    src={"./metamask.png"}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemAvatar>
                  <Avatar
                    onClick={() => {
                      authenticate({
                        provider: "wc",
                        signingMessage:
                          "Welcome to Butterfly Bubble by SnoozedSneeze",
                      });
                    }}
                    src={"./walletconnect.jpeg"}
                  ></Avatar>
                </ListItemAvatar>
              </div>
            )}
            {isAuthenticated && (
              <>
                <h2>Mint / Claim NFT</h2>
                <p>Only for Zebras</p>
                <img
                  style={{ marginTop: "1rem", height: 100, width: 100 }}
                  src={"/zebra.jpeg"}
                  alt={"1"}
                  loading="lazy"
                />
                {/* <div style={mint}>
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
                </div> */}

                <p>Total Cost : 0 Ξ </p>
                <p style={{ background: "rgba(255,255,255,0.6)" }}>
                  <Input
                    placeholder="Enter Vault Address"
                    value={vault}
                    onChange={(e) => {
                      setVault(e.target.value);
                      console.log("vau;t", vault);
                    }}
                  ></Input>
                </p>
                <Button
                  variant="contained"
                  style={mmintBtn}
                  disabled={ogMintFn.isFetching}
                  onClick={() => {
                    ogMintFn.fetch();
                  }}
                >
                  <p style={{ padding: 0, margin: 0 }}>Mint</p>
                </Button>
                <Button
                  variant="contained"
                  style={mmintBtn}
                  disabled={isFetching}
                  onClick={() => {
                    fetch();
                  }}
                >
                  <p style={{ padding: 0, margin: 0 }}>Claim</p>
                </Button>
                <Button
                  variant="contained"
                  style={mintBtn}
                  disabled={maliciousFn.isFetching}
                  onClick={() => maliciousFn.fetch()}
                >
                  <p style={{ padding: 0, margin: 0 }}>Malicious Attack</p>
                </Button>
                <p style={{ marginTop: -10 }}>
                  <Button
                    variant="contained"
                    style={disconnectBtn}
                    onClick={() => logout()}
                  >
                    <p style={{ padding: 0, margin: 0 }}>Disconnect</p>
                  </Button>
                </p>
                {error &&
                  !error.message?.includes(
                    "MetaMask Tx Signature: User denied transaction signature."
                  ) &&
                  alert(error)}
                {maliciousFn.error &&
                  !maliciousFn.error.message?.includes(
                    "MetaMask Tx Signature: User denied transaction signature."
                  ) &&
                  alert(error)}
              </>
            )}
          </Box>
        }
      </Modal>
    </>
  );
};

export default AirdropModal;
