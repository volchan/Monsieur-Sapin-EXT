import axios from "axios";
import { FETCH_CLIPS } from "./types";

import keys from "../config/keys";

export const fetchClips = () => async dispatch => {
  const url = `https://api.twitch.tv/kraken/clips/top?channel=${
    keys.channel
  }&limit=20`;
  const res = await axios.get(url, {
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": keys.twitchClientID
    }
  });
  dispatch({ type: FETCH_CLIPS, payload: res.data });
};
