import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjIzZTcxMmJkNDRiMGZkYjcyY2Q3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDg5NDY2OSwiZXhwIjoxNjYxMTUzODY5fQ.JCsTEV2LEeriHldmiQWH1o5GA9-9gjgTmqWW7bhtWHo";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {
    token: `Bearer ${TOKEN}`,
  },
});
