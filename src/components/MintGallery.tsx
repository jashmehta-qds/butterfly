import React, { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";

import { styled } from "@mui/material/styles";
import {
  Avatar,
  AvatarGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  ImageList,
  ImageListItem,
  Snackbar,
} from "@mui/material";
import ReactPlayer from "react-player/youtube";
import {
  useMetamask,
  useWalletConnect,
  useDisconnect,
  useAddress,
  useSDK,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, ethers } from "ethers";
import { ABI } from "./abi";
const CONTRACT_ADDRESS = "0xce224aae878ec6a8e4d6c3b2c9076a9edbe148de";
interface MintGalleryProps {
  isOpen: boolean;
  onClose(): void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root-MuiDialog-paper": {
    maxWidth: "1000vw",
  },
  "& .MuiDialog-paper": {
    width: "100vw !important",
    minWidth: "80vw",
  },
  "& .MuiPaper-root": {
    background: "#000",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "8px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
    margin: 0,
  },
}));



interface ItemData {
  id: number;
  img: string;
  title: string;
  videoLink: string;
  presoldWalletAddress?: string;
}

const itemData: ItemData[] = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Naïveté",
    videoLink: "https://youtu.be/MuSyrP4Qvnk?si=3vs74MlVNjsoOfq9",
    presoldWalletAddress: "0xafc093b1c8419f05d4de6ff54d38121c0d733752",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Doubt",
    videoLink: "https://youtu.be/iAgEIz3luvA?si=jETkTZTQrAV9mWeP",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Envy",
    videoLink: "https://youtu.be/dnuyQVdril8?si=GmOYf9eoDJdKnEZa",
    presoldWalletAddress: "0x083E5A2B332bbcEe4752A3b4aEd10F767026287E",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Anxiety",
    videoLink: "https://youtu.be/m943FFwD4TI?si=JvU2lnxaPrqhJ1Da",
    presoldWalletAddress: "0x2dE321329A3cE5A6871CeD3e6737b179e2Ce299C",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Pride",
    videoLink: "https://youtu.be/15W7EIasoCk?si=AW3qLNV0H1OfQLbT",
    presoldWalletAddress: "0x911Bb65A13AF3f83cd0b60bf113B644b53D7E438",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Rage",
    videoLink: "https://youtube.com/shorts/7TVgHvfcPY4?si=u4k0-nPR_dgNTfvE",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Composure",
    videoLink: "https://youtu.be/Vo18NDSfCRM?si=rcSQdfQLcYFqvfx8",
    presoldWalletAddress: "0xB06eef22e3fA5152fbcCFfe6099299dba1455938",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Agnosticism",
    videoLink: "https://youtu.be/xWJpXjwQX2A?si=zkImX7METSNteZTN",
    presoldWalletAddress: "0xb4bA39b90db6352B8cbA86bA81B6cfaCe482EB3a",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Empathy",
    videoLink: "https://youtu.be/2POufo5zjJo?si=9Qinl99PXm31W4UA",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Hope",
    videoLink: "https://youtube.com/shorts/1w4HwuEbHnQ?si=xe4M_A5y56MRwSll",
  },
  {
    id: 11,
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Conviction",
    videoLink: "https://youtu.be/nD5UKoW8OOw?si=bGiXWGDFjwaludme",
    presoldWalletAddress: "0x052D5C3a06AD80940447CA2692220ceFf5DF9952",
  },
  {
    id: 12,
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Grit",
    videoLink: "https://youtu.be/WY8TchKXRAk?si=0VaqiQNYJXfDMovl",
  },
  {
    id: 13,
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Ambition",
    videoLink: "https://youtube.com/shorts/iqKgisvKxJM?si=SYDdo26SWJHke6Mz",
  },
  {
    id: 14,
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Passion",
    videoLink: "https://youtube.com/shorts/l5JTapMrIlE?si=GntNA_tEAgl8wp3R",
    presoldWalletAddress: "0xEfEa98fFF3AE660fBE2Cca29e5a2a034Fb202103",
  },
  {
    id: 15,
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Flair",
    videoLink: "https://youtube.com/shorts/KtXIbCQt_cE?si=f-ON0ktsYRXigjol",
  },
  {
    id: 16,
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Grace",
    videoLink: "https://youtube.com/shorts/LOgOMSI3NjM?si=xWBCZ-amcG2c4Q_p",
  },
];

const MintGallery = ({ isOpen, onClose }: MintGalleryProps) => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnect = useDisconnect();
  const address = useAddress();
  const sdk = useSDK();
  const [contract, setContract] = React.useState<SmartContract<BaseContract>>();
  const [error, setError] = React.useState<string>();
  const isMismatched = useNetworkMismatch();
  const [isSelectedTokenMinted, setIsSelectedTokenMinted] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      return setContract(await sdk?.getContract(CONTRACT_ADDRESS, ABI));
    };
    fetchData();
  }, [sdk]);

  useEffect(() => {
    if (isSelectedTokenMinted) {
      const _disconnect = async () => await disconnect();
      _disconnect();
      setSelectedImageIndex(null);
    }
  }, [isSelectedTokenMinted]);

  const mintContract = async () => {
    const mintFn = await contract
      ?.call("mint", selectedImageIndex ? selectedImageIndex + 1 : null, {
        value: ethers.utils.parseEther((0.00036).toString()), // send 0.1 ether with the contract call
      })
      .then(() => {
        setIsMinted(true);
      })
      .catch((res: any) => setError(res.toString()));
  };

  const claimContract = async () => {
    const mintFn = await contract
      ?.call("claim", selectedImageIndex ? selectedImageIndex + 1 : null, {
        value: ethers.utils.parseEther((0.000036).toString()), // send 0.1 ether with the contract call
      })
      .catch((res: any) => setError(res.toString()));
  };

  useEffect(() => {
    const _ownerOf = async () => {
      const _sel = (selectedImageIndex ?? 0) + 1;

      console.log("comeon", _sel, ethers.utils.parseUnits((1).toString()));
      const x = await contract?.call
        ("ownerOf", _sel)
        .then((res: any) => {
          console.log("response", res)
          setIsMinted(true);
          setError("already minted");
        })
        .catch(() => {})
    };

    console.log(selectedImageIndex);
    if (selectedImageIndex !== null) {
      _ownerOf();
    }
  }, [selectedImageIndex]);

  const errorReason = () => {
    if (error?.includes("Internal JSON-RPC")) return "Change your Network";
    if (error?.includes("insufficient funds")) return "Insufficient Balance";
    else return error;
  };

  // const isMintableDisabled = () => {
  //   if (
  //     selectedImageIndex &&
  //     itemData[selectedImageIndex]?.presoldWalletAddress !== undefined &&
  //     itemData[selectedImageIndex]?.presoldWalletAddress?.toLowerCase() !==
  //       address?.toLowerCase()
  //   )
  //     return true;
  //   else if (isMinted) return true;
  //   else return false;
  // };


  const isMintableDisabled = useMemo(() =>
   {
    console.log(isMinted)
    if (
        selectedImageIndex &&
        itemData[selectedImageIndex]?.presoldWalletAddress !== undefined &&
        itemData[selectedImageIndex]?.presoldWalletAddress?.toLowerCase() !==
          address?.toLowerCase()
      )
        return true;
      else if (isMinted) return true;
      else return false;}, [isMinted, selectedImageIndex])
  useEffect(() => {
    if (isMismatched) setError("Change your Network to Ethereum Mainnet");
    else setOpenSnack(true);
  }, [error, isMismatched]);

  const ImgMetadata = ({
    _activeImageIndex,
  }: {
    _activeImageIndex: number | null;
  }) => {
    return (
      <Button
        sx={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "black",
          ":hover": {
            background: "#18181b",
          },
          textTransform: "none",
        }}
        variant="contained"
        size="small"
        onClick={() => {
          console.log("im clicked");
          setSelectedImageIndex(_activeImageIndex);
        }}
      >
        Buy
      </Button>
    );
  };

  const showButton = (index: number) => {
    setActiveImageIndex(index);
  };

  const hideButton = () => {
    setActiveImageIndex(null);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={() => {
          setSelectedImageIndex(null);
          setIsMinted(false)
          onClose();
        }}
        aria-labelledby="mint-gallery-title"
        open={isOpen}
      >
        <DialogContent dividers>
          {selectedImageIndex !== null ? (
            <Grid container spacing={2} className="md:flex">
              <Grid item xs={12} md={8}>
                <div style={{ maxWidth: "100%" }}>
                  <ReactPlayer
                    url={itemData[selectedImageIndex]?.videoLink}
                    width={"100%"}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                <h2>Processed Feed</h2>
                <img
                  style={{ marginTop: "1rem", height: 100, width: 100 }}
                  src={"/logo-123.gif"}
                  alt={"1"}
                  loading="lazy"
                />
                <p>Cost : 0.36 Ξ</p>
                <p>Selected Gem : {itemData[selectedImageIndex]?.title}</p>
                {itemData[selectedImageIndex]?.presoldWalletAddress && (
                  <p>
                    This item is reserved for{" "}
                    {itemData[selectedImageIndex]?.presoldWalletAddress?.slice(
                      0,
                      4
                    )}
                    ...
                    {itemData[selectedImageIndex]?.presoldWalletAddress?.slice(
                      -4
                    )}
                  </p>
                )}

                {address === undefined ? (
                  <>
                    <AvatarGroup
                      style={{ justifyContent: "center", gap: "48px" }}
                    >
                      <Avatar
                        sx={{ cursor: "pointer" }}
                        variant="rounded"
                        onClick={() => setSelectedImageIndex(null)}
                        src="./go-back-2.png"
                      />
                      <Avatar
                        sx={{ cursor: "pointer" }}
                        variant="rounded"
                        onClick={connectWithMetamask}
                        src={"./metamask.png"}
                      ></Avatar>

                      <Avatar
                        sx={{ cursor: "pointer" }}
                        variant="rounded"
                        onClick={connectWithWalletConnect}
                        src={"./walletconnect.jpeg"}
                      ></Avatar>
                    </AvatarGroup>
                  </>
                ) : (
                  <div
                    style={{
                      gap: 24,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      sx={{
                        bgcolor: "#18181b",
                        ":hover": { bgcolor: "#20201d" },
                      }}
                      onClick={() => {
                        setSelectedImageIndex(null);
                        setIsMinted(false)
                        setError(undefined);
                      }}
                    >
                      Go Back
                    </Button>
                    <Button
                      sx={{
                        bgcolor: "#18181b",
                        ":hover": { bgcolor: "#20201d" },
                      }}
                      disabled={isMintableDisabled}
                      onClick={() =>
                        itemData[selectedImageIndex]?.presoldWalletAddress
                          ? claimContract()
                          : mintContract()
                      }
                    >
                      Mint
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          ) : (
            <ImageList cols={isMobile ? 2 : 4} gap={8}>
              {itemData.map((item, idx) => (
                <ImageListItem
                  key={item.id}
                  onMouseOver={() => showButton(idx)}
                  onMouseOut={hideButton}
                >
                  <img
                    srcSet={`./${item.id}.jpg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`./${item.id}.jpg?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      filter: activeImageIndex === idx ? "blur(4px)" : "",
                    }}
                  />
                  {activeImageIndex === idx ? (
                    <ImgMetadata _activeImageIndex={activeImageIndex} />
                  ) : (
                    <></>
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={onMintOpen} variant="contained">
            Mint
          </Button>
        </DialogActions> */}

        <Snackbar
          open={openSnack && address !== undefined && error !== undefined}
          autoHideDuration={6000}
          onClose={handleClose}
          message={
            <>
              <h2>Transaction Error</h2>
              <p>{errorReason()}</p>
            </>
          }
        ></Snackbar>
      </BootstrapDialog>
    </div>
  );
};

export default MintGallery;
