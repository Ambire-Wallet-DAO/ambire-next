[![Netlify Status](https://api.netlify.com/api/v1/badges/dc28bfe3-33a1-4cdf-88cb-d129a4cec3d5/deploy-status)](https://app.netlify.com/sites/practical-montalcini-0d3675/deploys)
```
____ _  _ ___  _ ____ ____    _    ____ ____ ___  ____ ____ ___  ____ ____ ____ ___  
|__| |\/| |__] | |__/ |___    |    |___ |__| |  \ |___ |__/ |__] |  | |__| |__/ |  \ 
|  | |  | |__] | |  \ |___    |___ |___ |  | |__/ |___ |  \ |__] |__| |  | |  \ |__/ 
```                                                                                     
### A web3 endeavor into creating a Quest Based Leaderboard
  Using [Crew3.xyz](http://crew3.xyz/) & [Guild.xyz](https://guild.xyz) to manage use their front-ends to manage Quests & Roles.
  
  This app creates a leaderboard page that is populated by the Crew3 & Guild.xyz APIs. It displays the a table of data containing the User, their XP, and various roles that have been assigned by Guild.xyz
  
  This allows us to auto-assign XP within the Crew3 API once we've verified specific roles via Guild.xyz. 
  
  For example: A users has the roles Lens Frens (Follow us on Lens 10XP) & they hold $WALLET Token (10XP). Using the Guild.xyz API, we query the User's Wallet Address against our Guild ID, which returns true or false for all roles. Given Lens Frens & Hold $WALLET Token roles are True for the user, we push 20 XP to the user via their wallet address to Crew3 API.
  


_____________________________________
### Quest setup on Crew.xyz
<img width="400" alt="Screenshot 2022-11-21 at 8 18 47 AM" src="https://user-images.githubusercontent.com/139775/203105237-0a5208d5-f247-4afb-959e-0dc890a6e92d.png">

### Roles setup on Guild.xyz
<img width="400" alt="Screenshot 2022-11-21 at 8 19 57 AM" src="https://user-images.githubusercontent.com/139775/203105502-ece465cb-4999-49ec-b7b6-d10eee79291d.png">




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
