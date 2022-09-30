import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ListItemAvatar, Avatar } from "@mui/material";
import { ABI } from "./abi";
import Moralis from "moralis-v1";
const CONTRACT_ADDRESS = "0x884B240451De381Cf15565A651D46283B6bDEb8F";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth:"80%",
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
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  const [buttonStyles, setButtonStyles] = React.useState<{
    plusBtnColor: string;
    minusBtnColor: string;
  }>({ plusBtnColor: "black", minusBtnColor: "lightgray" });
  const [totalCount, setTotalCount] = React.useState(1);
  const [totalAvailableSupply, setTotalAvailableSupply] =
    React.useState("????");
  const incrementCount = () => {
    if (totalCount < 3) setTotalCount((res) => (res += 1));
  };
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "mint",
    params: {
      quantity: totalCount,
    },
    msgValue: Moralis.Units.ETH(`${totalCount * 0.25}`.slice(0, 7)),
  });

  const supply = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "totalSupply",
  });

  useEffect(() => {
    if (isAuthenticated) supply.fetch();
  }, [isAuthenticated]);


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
                        signingMessage: "Welcome to Butterfly Bubble by SnoozedSneeze",
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
                        signingMessage: "Welcome to Butterfly Bubble by SnoozedSneeze",
                      });
                    }}
                    src={"./walletconnect.jpeg"}
                  ></Avatar>
                </ListItemAvatar>
              </div>
            )}
            {isAuthenticated && (
              <>
                <h2>Butterfly Bubble</h2>
                <p> {Number(supply.data)} / 33 Minted</p>
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
                  disabled={isFetching}
                  onClick={() => fetch()}
                >
                  <p style={{ padding: 0, margin: 0 }}>Mint</p>
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
                {error && !error.message.includes("MetaMask Tx Signature: User denied transaction signature.") && alert(error.message)}
              </>
            )}
          </Box>
        }
      </Modal>
    </>
  );
};

export default MintModal;
