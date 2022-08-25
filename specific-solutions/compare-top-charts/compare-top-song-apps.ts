/*
    PART I: SPOTIFY
 */
import axios from "axios";
import * as dotenv from 'dotenv'
dotenv.config()
class APIController {
  clientId: string;
  clientSecret: string;
  constructor() {
    this.clientId = process.env.CLIENT_ID as string;
    this.clientSecret = process.env.CLIENT_SECRET as string;
  }

  async _getToken() {
    const result = await axios.post(
      "https://accounts.spotify.com/api/token/",
      {
        grant_type:"client_credentials"
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + btoa(this.clientId + ":" + this.clientSecret),
        },
      }
    );
    const data = await result.data.json()
    return data.access_token
  }

  //get genres
  //get top 10 afrobeats & top 10 globally
}

const newAPIController = new APIController()
