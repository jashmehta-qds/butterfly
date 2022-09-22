import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import {Cyclone} from "@mui/icons-material";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const TIMELINEITEMS = [
  {
    description: { title: "Genesis", subTitle: "30·Sep·22" },
    info: "",
    connector: "24 x 24",
    color: "rgba(0,255,255,0.2)",
    status: "",
    icon: undefined
  },
  // {
  //   description: { title: "Airdrop Snapshot", subTitle: "25·Nov·23" },
  //   info: "",
  //   connector: "",
  //   color: "rgba(0,0,255,0.2)",
  //   status: "",
  //   icon: <Cyclone />
  // },
  {
    description: { title: "Airdrop #1", subTitle: "25·Dec·22" },
    info: "25 December",
    connector: "30 x 30",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #2", subTitle: "25·Aug·23" },
    info: "25 December",
    connector: "36 x 36",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #3", subTitle: "25·Apr·24" },
    info: "25 December",
    connector: "42 x 42",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #4", subTitle: "25·Dec·24" },
    info: "25 December",
    connector: "48 x 48",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #5", subTitle: "25·Aug·25" },
    info: "25 December",
    connector: "54 x 54",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #6", subTitle: "25·Apr·26" },
    info: "25 December",
    connector: "60 x 60",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #7", subTitle: "25·Dec·26" },
    info: "25 December",
    connector: "66 x 66",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #8", subTitle: "25·Aug·27" },
    info: "25 December",
    connector: "72 x 72",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #9", subTitle: "25·Apr·28" },
    info: "25 December",
    connector: "78 x 78",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #10", subTitle: "25·Dec·28" },
    info: "25 December",
    connector: "84 x 84",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #11", subTitle: "25·Aug·29" },
    info: "25 December",
    connector: "90 x 90",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #12", subTitle: "25·Apr·30" },
    info: "25 December",
    connector: "98 x 98",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
  {
    description: { title: "Airdrop #13", subTitle: "25·Dec·30" },
    info: "25 December",
    connector: "108 x 108",
    color: "rgba(255,255,0,0.2)",
    status: "",
    icon: undefined
  },
];
export default function BubbleMap() {
  return (
    <Timeline position="alternate">
      {TIMELINEITEMS.map((item, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineConnector sx={{ marginTop: 1, marginBottom: 1 }} />
              <Box
                style={{
                  width: 75,
                  height: 50,
                  textAlign: "center",
                  backgroundColor: `${item.color}`,
                  borderRadius: 20,
                }}
              >
                <p style={{marginTop:"15px", fontSize: "small"}}>{item.icon ?? item.connector}</p>
              </Box>
            </TimelineSeparator>
            <TimelineContent sx={{ paddingTop: "1.5rem", px: 2 }}>
              <Typography sx={{ marginTop: "6px", marginLeft:"-10px",marginRight:"-10px" }}>
                {item.description.title}
              </Typography>

              <Typography> {item.description.subTitle}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
