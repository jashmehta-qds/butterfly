import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
import MintModal from "./MintModal";
export enum Tabs {
  mint = "Mint",
  collection = "Collection",
  vision = "Vision",
  artist = "Artist",
  journey = "Journey",
  claim = "Delegate Mint & Claim",
}
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  onMenuClick(type: Tabs, isMobile?: boolean): void;
  onMintOpen(type: string): void;
}

const drawerWidth = "100%";
const navItems: Tabs[] = [
  Tabs.mint,
  Tabs.collection,
  Tabs.vision,
  Tabs.artist,
  Tabs.journey,
  Tabs.claim

];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img
        style={{ marginTop: "1rem", height: 50, width: 50 }}
        src={"/logo720.png"}
        alt={"1"}
        loading="lazy"
      />
      <Typography variant="h6">
        <p className={styles.logofont}>Butterfly Bubble</p>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => {
                console.log("clicked", item);
                props.onMenuClick(item, true);
                if(item === Tabs.mint){props.onMintOpen("X");}
                if(item === Tabs.claim){props.onMintOpen("A");}
              }}
              sx={{ textAlign: "center", justifyContent:"center" }}
            >
              <p>{item}</p>
            </ListItemButton>
          </ListItem>
        ))}
        {/* <ListItem>
          <ListItemButton onClick={() => {}} sx={{ textAlign: "end" }}>
            <a target="_blank" href={"https://twitter.com/snoozedsneeze"}>
              <img src={"./twitterlogo.svg"}></img>
            </a>
          </ListItemButton>
        </ListItem> */}
        <div style={{ paddingTop: 20 }}>
          <a
            target="_blank"
            href={"https://twitter.com/snoozedsneeze"}
            style={{ paddingRight: 10 }}
          >
            <img
              src={"./twitterlogoblue.png"}
              style={{ width: 25, height: 25 }}
            ></img>
          </a>
          <a target="_blank" href={"https://instagram.com/snoozedsneeze"}>
            <img
              src={"./instagramlogocolor.png"}
              style={{ width: 25, height: 25 , marginRight: 10  }}
            ></img>
          </a>
          <a target="_blank" href={"https://opensea.io/collection/butterfly-bubble"}>
            <img
              src={"./osblue.png"}
              style={{ width: 25, height: 25 }}
            ></img>
          </a>
        </div>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component="nav" style={{ backgroundColor: "black" }}>
        <Toolbar style={{ backgroundColor: "rgba(0,0,0,0.4" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              style={{
                marginTop: "2rem",
                height: 75,
                width: 75,
                marginLeft: "calc(50% - 62px)",
                position: "absolute",
              }}
              src={"/logo720.png"}
              alt={"1"}
              loading="lazy"
            />
            <p className={styles.logofont}>Butterfly Bubble</p>
          </Typography>
          <div></div>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => {
                  console.log("clicked", item);
                  props.onMenuClick(item);
                  if(item === Tabs.mint){props.onMintOpen("X");}
                  if(item === Tabs.claim){props.onMintOpen("A");}
                }}
                key={item}
                sx={{ color: "#fff", alignContent:"center" }}
              >
                  <p>{item}</p>
              </Button>
            ))}
            <a
              target="_blank"
              href={"https://twitter.com/snoozedsneeze"}
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              <img
                src={"./twitterlogo.png"}
                style={{ width: 20, height: 20 }}
              ></img>
            </a>
            <a target="_blank" href={"https://instagram.com/snoozedsneeze"}>
              <img
                src={"./instagramlogo.png"}
                style={{ width: 20, height: 20, marginRight: 10 }}
              ></img>
            </a>
            <a target="_blank" href={"https://opensea.io/collection/butterfly-bubble"}>
            <img
              src={"./os.png"}
              style={{ width: 20, height: 20 }}
            ></img>
          </a>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
