import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Toolbar, Paper } from "@mui/material";
import styles from "./components/styles.module.css";
import { CONTENT } from "./components/constants";
import BubbleMap from "./components/BubbleMap";
import DrawerAppBar, { Tabs } from "./components/TopBar";
import MintModal from "./components/MintModal";
import AirdropModal from "./components/AirdropModal";

export default function App() {
  // const video = React.useRef<HTMLVideoElement>(null);
  const [videoMuted, setVideoMuted] = React.useState<boolean>(true);
  const collectionRef = React.useRef<HTMLDivElement>(null);
  const visionRef = React.useRef<HTMLDivElement>(null);
  const artistRef = React.useRef<HTMLDivElement>(null);
  const journeyRef = React.useRef<HTMLDivElement>(null);
  const [mintOpen, setMintOpen] = React.useState(false);
  const [airdropOpen, setAirdropOpen] = React.useState(false);
  const [zmintOpen, setZmintOpen] = React.useState(false);

  const onMintClose = (type?:string) => {
    if (type === "A") setAirdropOpen(false);
    else if (type === "M") setZmintOpen(false);
    else setMintOpen(false);
  };

  const onMintOpen = (type: string) => {
    console.log("t",type);
    if (type === "A") setAirdropOpen(true);
    else if (type === "M") setZmintOpen(true);
    else setMintOpen(true);
  };
  React.useEffect(() => {
    setTimeout(() => {
      setVideoMuted(false);
    }, 100);
  });
  const scrollTo = (type: Tabs, isMobile?: boolean) => {
    console.log("Type,", type);
    switch (type) {
      case Tabs.collection:
        collectionRef.current?.scrollIntoView(
          isMobile ? true : { behavior: "smooth" }
        );
        break;
      case Tabs.vision:
        visionRef.current?.scrollIntoView(
          isMobile ? true : { behavior: "smooth" }
        );
        break;
      case Tabs.artist:
        artistRef.current?.scrollIntoView(
          isMobile ? true : { behavior: "smooth" }
        );
        break;
      case Tabs.journey:
        journeyRef.current?.scrollIntoView(
          isMobile ? true : { behavior: "smooth" }
        );
        break;
        default :
        collectionRef.current?.scrollIntoView(
          isMobile ? true : { behavior: "smooth" }
        );
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAppBar onMenuClick={scrollTo} onMintOpen={onMintOpen} />
      <Box
        component="main"
        sx={{ p: 0, width: "100%", height: "100vh", background: "black" }}
        className={styles.videoWrapper}
      >
        <Toolbar />
        {
          <video
            loop
            autoPlay
            muted
            playsInline={true}
            controls={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "fixed",
            }}
          >
            <source src="/welcome.mp4" type="video/mp4" />
          </video>
        }
        <Box style={{ color: "white", position: "sticky" }}>
          <Toolbar />

          {collectionRef && (
            <div ref={collectionRef} style={{ paddingTop: 10 }}>
              <Box className={styles.card}>
                <p className={styles.cardTitle}>{CONTENT.COLLECTION.HEADER}</p>
                <div style={{ textAlign: "justify" }}>
                  {CONTENT.COLLECTION.BODY}
                </div>
              </Box>
              <Box className={styles.cardOpaque}>
                <img
                  src={"./democratization.png"}
                  style={{
                    height: "70%",
                    width: "70%",
                    maxHeight: 700,
                    maxWidth: 700,
                  }}
                />
                <p style={{ paddingBottom: 20 }}>
                  For instance, this is one of the 33 butterflies in the
                  collection
                </p>
              </Box>
            </div>
          )}
          <MintModal isOpen={mintOpen} onClose={() => onMintClose("x")} />
          <AirdropModal
            isOpen={airdropOpen}
            onClose={onMintClose}
          />
          {visionRef && (
            <div ref={visionRef} style={{ paddingTop: 10 }}>
              <Box className={styles.card}>
                <div style={{ textAlign: "justify" }}>
                  <p className={styles.cardTitle}>{CONTENT.VISION.HEADER}</p>
                  {CONTENT.VISION.BODY}
                </div>
              </Box>
            </div>
          )}
          {artistRef && (
            <div ref={artistRef} style={{ paddingTop: 10 }}>
              <Box className={styles.card}>
                <p className={styles.cardTitle}>{CONTENT.ARTIST.HEADER}</p>
                <div style={{ textAlign: "justify" }}>
                  {CONTENT.ARTIST.BODY}
                </div>
              </Box>
            </div>
          )}
          {journeyRef && (
            <div
              ref={journeyRef}
              style={{ paddingTop: 10, paddingBottom: "20%" }}
            >
              <Box className={styles.card}>
                <p className={styles.cardTitle}>Journey</p>
                <BubbleMap />
              </Box>
            </div>
          )}
        </Box>
      </Box>
      <Paper
        sx={{
          width: "100%",
          height: "5%",
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.7)",
          bottom: 0,
          textAlign: "center",
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Typography variant="caption" color="white">
          Copyright ©2022 · [Created by GMWeb3 Studios]
        </Typography>
      </Paper>
    </Box>
  );
}
