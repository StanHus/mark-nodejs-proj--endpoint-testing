import express from "express";
import {
  ADVENTURE_ADMIN,
  MYSTERIOUS_ROBED_FIGURE,
} from "./constants/characters";
import { CAVE_EXTERIOR, HANDFORTH_PARISH_COUNCIL } from "./constants/locations";

const app = express();

app.get("/", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

app.get("/help", (req, res) => {
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: ADVENTURE_ADMIN,
      text:
        "This is the endpoint adventure! It's based on the classic 'choose your own adventure' books of ye olden 20th century times. When you visit an endpoint, you're presented with a scene and some text, and then you have a few options to choose from - your simulate turning to a new page by hitting a new endpoint.",
    },
    options: {
      backToStart: "/",
    },
  });
});

app.get("/quest/accept", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Ah, yes, that is a wise decision. Now, tell me, what sort of questing experience do you have?",
    },
    options: {
      rookie: "/quest/start/easy",
      pro: "/quest/start/hard",
      "completed it, m8": "/quest/start/impossible",
    },
  });
});

app.get("/quest/decline", (req, res) => {
  res.json({
    location: "Apocalypse",
    speech: {
      speaker: {
        name: "Titan, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "You FOOL! You have made a mistake. Now you will suffer.",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/impossible", (req, res) => {
  res.json({
    location: "Apocalypse",
    speech: {
      speaker: {
        name: "Titan, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "Thats instant excruciating death by a fireball from a fierce dragon, mate",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/hard", (req, res) => {
  res.json({
    location: "Ukraine",
    speech: {
      speaker: {
        name: "President-Comedian",
        description: "A short but fierce looking demon-thing is pretty much on the nose here",
      },
      text: "You will spent the remainder of your days in this hostile country, which is the base location and inspiration for the Mad Max saga",
    },
    options: {
      restart: "/",
      employment: "/quest/start/hard/employment"
    },
  });
});

app.get("/quest/start/hard/employment", (req, res) => {
  res.json({
    location: "Ukraine",
    speech: {
      speaker: {
        name: "Dimitri, the mobster",
        description: "A tall thin man smoking a cigar",
      },
      text: "(*in a thick Russian accent*) I beliEve ve can aRRange sumting",
    },
    options: {
      restart: "/",
      switchLevel: "/quest/start/easy"
    },
  });
});

app.get("/quest/start/easy", (req, res) => {
  res.json({
    location: "UK",
    speech: {
      speaker: {
        name: "Jenny, the local counselor",
        description: "A pleasant lady with a nice perfume",
      },
      text: "You are gonna be living here, a socialist-leaning country that tries to look after everyone but those who pay taxes",
    },
    options: {
      restart: "/",
      employment: "/quest/start/easy/employment"
    },
  });
});

app.get("/quest/start/easy/employment", (req, res) => {
  res.json({
    location: "UK",
    speech: {
      speaker: {
        name: "Frederick, a recruitment agent",
        description: "A funny guy with a wide smile",
      },
      text: "Hi there, lets get you set up and get you contributing to other people's unemployment benefits fund",
    },
    options: {
      restart: "/",
      startWork: "/quest/start/easy/employment/work"
    },
  });
});

app.get("/quest/start/easy/employment/work", (req, res) => {
  res.json({
    location: "UK",
    speech: {
      speaker: {
        name: "Boss",
      },
      text: "Take your time",
    },
    options: {
      restart: "/",
    },
  });
});

export default app;
