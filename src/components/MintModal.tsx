import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect } from "react";
import styles from "./styles.module.css";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

interface MintModalProps {
  isOpen: boolean;
  onClose(): void;
}

const MintModal: React.FC<MintModalProps> = ({ onClose, isOpen }) => {
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

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Butterfly Bubble</h2>
          <p> [ 0 / 33 minted ]</p>
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
                cursor: buttonStyles.minusBtnColor === "white" ? "pointer" : "",
              }}
              onClick={() => decrementCount()}
            />
            <div style={mintCount}>
              <p>{totalCount}</p>
            </div>
            <AddCircleOutlineIcon
              sx={{
                color: buttonStyles.plusBtnColor,
                cursor: buttonStyles.plusBtnColor === "white" ? "pointer" : "",
              }}
              onClick={() => incrementCount()}
            />
          </div>
          <p>Total Cost : {(totalCount * 0.25).toFixed(2)} Ξ </p>
          <Button variant="contained" style={mintBtn}>
            Mint
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MintModal;
