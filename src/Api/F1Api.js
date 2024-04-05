import axios from "axios";

const F = axios.create({
  baseURL:
    "https://api.openf1.org/v1/drivers?country_code=GBR&meeting_key=1140",
});

const C = axios.create({
  baseURL: "https://api.openf1.org/v1/sessions?session_name=Race&year=2024",
});

export const getF = () => F.get("/");

export const getC = () => C.get("/");
