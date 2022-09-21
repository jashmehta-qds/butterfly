import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./ProTip";
import { ImageList, Toolbar, ImageListItem, Grid, Paper } from "@mui/material";
import styles from "./components/styles.module.css";
import { CONTENT } from "./components/constants";
import BubbleMap from "./components/BubbleMap";
import DrawerAppBar, { Tabs } from "./components/TopBar";

export default function App() {
  // const video = React.useRef<HTMLVideoElement>(null);
  const [videoMuted, setVideoMuted] = React.useState<boolean>(true);
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const visionRef = React.useRef<HTMLDivElement>(null);
  const journeyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setVideoMuted(false);
    }, 100);
  });
  const scrollTo = (type: Tabs, isMobile?: boolean) => {
    console.log("Type,", type);
    switch (type) {
      case Tabs.about:
        aboutRef.current?.scrollIntoView(
          isMobile ? true : { behavior: "smooth" }
        );
        break;
      case Tabs.vision:
        visionRef.current?.scrollIntoView(
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
    <Box sx={{ display: "flex" }}>
      <DrawerAppBar onMenuClick={scrollTo} />
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
            controls
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
          {aboutRef && (
            <div ref={aboutRef} style={{ paddingTop: 10 }}>
              <Box className={styles.card}>
                <p className={styles.cardTitle}>{CONTENT.COLLECTION.HEADER}</p>

                {CONTENT.COLLECTION.BODY}
                <p className={styles.cardTitle}>{CONTENT.ARTIST.HEADER}</p>
                <div style={{ textAlign: "justify" }}>
                  {CONTENT.ARTIST.BODY}
                </div>
              </Box>
            </div>
          )}
          {journeyRef && (
            <div ref={journeyRef} style={{ paddingTop: 10 }}>
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
          backgroundColor: "rgba(0,0,0,0.8)",
          paddingRight: "1.75rem",
          bottom: 0,
          textAlign: "end",
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
