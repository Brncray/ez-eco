# Welcome to ez-econ!

Ez-Econ is an NPM library designed for use in a discord bot, although it can be used in any other application. 


# Easy Startup

```js
import { eco } from "ez-eco"; 

await eco.register("MONGODB_LINK_HERE"); 

await eco.configure({
daily: 10,
weekly: 10,
job: 30,
daily_enabled: true, 
weekly_enabled: true, 
job_enabled: true
}); 
```
**Note that you should not use ``eco.register`` if you already have a mongoose connection.**

You can check the **status** of the mongoose connection with ``console.log(await  eco.status());``

