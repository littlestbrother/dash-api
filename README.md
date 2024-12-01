# dash-api

TODO:
<!-- # POST punch -->
- post image to punch route
- get timestamp and location of punch image
- verify
- record punch

<!-- # POST downtimes -->
- create/delete downtime

<!-- severless CRON jobs -->
beginning of week task:
- replenish get out of jail free cards

exercise check:
- runs every weekday at 7:45/8:45 AM (daylights savings change)
- stop check if last punch was more than 24 hours ago (in case of emergency)
- check if today is an downtime
- check for punch
- use up get out of jail free card if possible

work check:
- runs every weekday at 9:45/10:45 AM (daylights savings change)
- stop check if last punch was more than 24 hours ago (in case of emergency)
- check if today is an downtime
- check for punch
- use up get out of jail free card if possible

mid-day work check:
- runs every weekday at 2:45/3:45 PM (daylights savings change)
- stop check if last punch was more than 24 hours ago (in case of emergency)
- check if today is an downtime
- check for punch
- use up get out of jail free card if possible

<!-- setup AWS cognito -->