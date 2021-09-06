import supertest from "supertest";
import app from "./server";
import { MYSTERIOUS_ROBED_FIGURE, ADVENTURE_ADMIN } from "./constants/characters";
import { CAVE_EXTERIOR, HANDFORTH_PARISH_COUNCIL } from "./constants/locations";

test("GET / responds with a welcome message from our mysterious robed figure", async () => {
  const response = await supertest(app).get("/");

  expect(response.body).toStrictEqual({
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

test("GET /help explains how it works", async () => {
  const response = await supertest(app).get("/help");

  expect(response.body).toMatchObject({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: ADVENTURE_ADMIN,
    },
  });
  expect(typeof response.body.speech.text).toBe("string");
  expect(response.body.options).toStrictEqual({ backToStart: "/" });
});


test("GET /quest/accept has our mysterious robed figure give a couple of further choices", async () => {
  const response = await supertest(app).get("/quest/accept");
  expect(response.body).toMatchObject({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
    },
  });
  expect(typeof response.body.speech.text).toBe("string");
  expect(Object.keys(response.body.options).length).toBeGreaterThanOrEqual(2);
});

test("GET /quest/decline responds with an apocalyptic message", async () => {
  const response = await supertest(app).get("/quest/decline");
  expect(response.body.location).toBe("Apocalypse");
  expect(response.body.speech.speaker.name).toBe("Titan, Destroyer of Worlds");
  expect(response.body.speech.text).toMatch("FOOL");
  expect(response.body.speech.text).toMatch(/mistake/i);
  expect(response.body.options).toStrictEqual({ restart: "/" });
});

test("GET /quest/start/impossible responds with instant 'death'", async () => {
  const response = await supertest(app).get("/quest/start/impossible");
  expect(response.body.location).toBeDefined();
  expect(response.body.speech.speaker.name).toBeDefined();
  expect(response.body.speech.text).toMatch(/fireball/i);
  expect(response.body.speech.text).toMatch(/dragon/i);
  expect(response.body.speech.text).toMatch(/excruciating/i);
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/hard gets you into quiet a pickle", async () => {
  const response = await supertest(app).get("/quest/start/hard");
  expect(response.body.location).toMatch("Ukraine");
  expect(response.body.speech.speaker.name).toBeDefined();
  expect(response.body.speech.text).toMatch(/Mad/i);
  expect(response.body.speech.text).toMatch(/hostile/i);
  expect(response.body.speech.text).toMatch(/remainder/i);
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/hard/employment gives you your main career prospect", async () => {
  const response = await supertest(app).get("/quest/start/hard/employment");
  expect(response.body.location).toBe("Ukraine");
  expect(response.body.speech.speaker.name).toMatch(/Dimitri/i);
  expect(response.body.speech.speaker.description).toMatch("cigar");
  expect(response.body.speech.text).toMatch(/arrange/i);
  expect(response.body.speech.text).toMatch(/Russian/i);
  expect(response.body.options).toMatchObject({ restart: "/", switchLevel: "/quest/start/easy" });
});

test("GET /quest/start/easy gives you a game on easy mode pretty much", async () => {
  const response = await supertest(app).get("/quest/start/easy");
  expect(response.body.location).toMatch("UK");
  expect(response.body.speech.speaker.name).toBeDefined();
  expect(response.body.speech.speaker.description).toMatch("pleasant");
  expect(response.body.speech.text).toMatch(/socialist/i);
  expect(response.body.speech.text).toMatch(/taxes/i);
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/easy/employment gives you your main career prospects in this socialist state", async () => {
  const response = await supertest(app).get("/quest/start/easy/employment");
  expect(response.body.location).toBe("UK");
  expect(response.body.speech.speaker.name).toMatch(/recruitment/i);
  expect(response.body.speech.speaker.description).toMatch("smile");
  expect(response.body.speech.text).toMatch(/up/i);
  expect(response.body.speech.text).toMatch(/benefits/i);
  expect(response.body.options).toMatchObject({ restart: "/", startWork: "/quest/start/easy/employment/work" });
});

test("GET /quest/start/easy/employment/work gives you your respectful work interactions", async () => {
  const response = await supertest(app).get("/quest/start/easy/employment/work");
  expect(response.body.location).toBe("UK");
  expect(response.body.speech.speaker.name).toMatch(/BOSS/i);
  expect(response.body.speech.text).toMatch(/TAKE/i);
  expect(response.body.speech.text).toMatch(/tIME/i);
  expect(response.body.options).toMatchObject({ restart: "/"});
});

