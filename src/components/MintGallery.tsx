import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MintModal from "./MintModal";
import ReactPlayer from "react-player/youtube";

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
  img: string;
  title: string;
  videoLink: string;
}

const itemData: ItemData[] = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    videoLink: "https://youtu.be/q_Rn-sUn2w4",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
  },
];

const MintGallery = ({ isOpen, onClose }: MintGalleryProps) => {
  const [mintOpen, setMintOpen] = React.useState(false);

  const onMintClose = () => {
    setMintOpen(false);
  };

  const onMintOpen = () => {
    setMintOpen(true);
  };

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
        onClick={() => {
          console.log("im clicked");
          setSelectedImageIndex(_activeImageIndex);
        }}
      >
        Buy
      </Button>
    );
  };

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const showButton = (index: number) => {
    setActiveImageIndex(index);
  };

  const hideButton = () => {
    setActiveImageIndex(null);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
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
                <h2>Process Feed</h2>
                <img
                  style={{ marginTop: "1rem", height: 100, width: 100 }}
                  src={"/logo-latest.png"}
                  alt={"1"}
                  loading="lazy"
                />
                <p>Cost : 0.33 Ξ</p>
                <p>Selected Gem : Anxiety</p>
                <Button
                  sx={{
                    bgcolor: "#18181b",
                    ":hover": { bgcolor: "#20201d" },
                  }}
                  onClick={() => setMintOpen(true)}
                >
                  Mint
                </Button>
              </Grid>
            </Grid>
          ) : (
            <ImageList cols={4} gap={8}>
              {itemData.map((item, idx) => (
                <ImageListItem
                  key={item.img}
                  onMouseOver={() => showButton(idx)}
                  onMouseOut={hideButton}
                >
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
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
      </BootstrapDialog>
      <MintModal isOpen={mintOpen} onClose={onMintClose} />
    </div>
  );
};

export default MintGallery;
