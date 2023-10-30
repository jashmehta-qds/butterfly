import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Toolbar, Paper } from "@mui/material";
import styles from "./components/styles.module.css";
import { CONTENT } from "./components/constants";
import BubbleMap from "./components/BubbleMap";
import DrawerAppBar, { Tabs } from "./components/TopBar";
import MintGallery from "./components/MintGallery";
import ReactPlayer from "react-player/youtube";

export default function App() {
  // const video = React.useRef<HTMLVideoElement>(null);
  const [videoMuted, setVideoMuted] = React.useState<boolean>(true);
  const collectionRef = React.useRef<HTMLDivElement>(null);
  const processRef = React.useRef<HTMLDivElement>(null);
  const visionRef = React.useRef<HTMLDivElement>(null);
  const artistRef = React.useRef<HTMLDivElement>(null);
  const journeyRef = React.useRef<HTMLDivElement>(null);
  const [mintGalleryOpen, setMintGalleryOpen] = React.useState(false);

  const onMintClose = () => {
    setMintGalleryOpen(false);
  };

  const onMintOpen = () => {
    setMintGalleryOpen(true);
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
      case Tabs.process:
        processRef.current?.scrollIntoView(
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
    }
  };
  return (
    <Box sx={{ display: "flex", background: "black" }}>
      <DrawerAppBar onMenuClick={scrollTo} onMintOpen={onMintOpen} />
      <Box
        component="main"
        sx={{ p: 0, width: "100%", height: "100vh", background: "black" }}
        className={styles.videoWrapper}
      >
        <Toolbar />

        <Box
          style={{ color: "white", position: "sticky", background: "black" }}
        >
          <Toolbar />

          {collectionRef && (
            <div ref={collectionRef} style={{ paddingTop: 10 }}>
              <Box className={styles.card}>
                <p className={styles.cardTitle}>{CONTENT.COLLECTION.HEADER}</p>
                <div style={{ textAlign: "justify" }}>
                  {CONTENT.COLLECTION.BODY}
                </div>
              </Box>
              <Box className={styles.cardVideo}>
              <ReactPlayer
                    url={"https://youtu.be/q_Rn-sUn2w4"}
   
                  />
              </Box>
            </div>
          )}
          <MintGallery isOpen={mintGalleryOpen} onClose={onMintClose} />
          {processRef && (
            <div ref={processRef} style={{ paddingTop: 10 }}>
              <Box className={styles.card}>
                <div style={{ textAlign: "justify" }}>
                  <p className={styles.cardTitle}>{CONTENT.PROCESS.HEADER}</p>
                  {CONTENT.PROCESS.BODY}
                </div>
              </Box>
            </div>
          )}
          {visionRef && (
            <div ref={visionRef} style={{ paddingTop: 10 }} className="bg-dark">
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
                <div style={{ textAlign: "justify" }}>
                  <p className={styles.cardTitle}>{CONTENT.JOURNEY.HEADER}</p>
                  {CONTENT.JOURNEY.BODY}
                </div>
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
          Copyright © {new Date().getFullYear()} · [Created by GMWeb3 Studios]
        </Typography>
      </Paper>
    </Box>
  );
}
