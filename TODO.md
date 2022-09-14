Email & SMS notifications will be sent using AWS SNS
Use lambda functions to consume topic?

use SES for emails, SNS for sms

# TODO
- [x] add setup phone page
- [x] admin trpc stuff
  - [x] write add event logic
  - [x] kick logic
  - [x] delete event logic
- [x] user trpc stuff
  - [x] write subscribe logic; check if event doesn't collide with any already subscribed events
- [ ] if admin
  - [ ] add 'add event' button to `/events` page
  - [x] add 'delete event' button on `/events/[slug]` page
  - [ ] add 'X' button button on `/events` page
  - [ ] render subscribed users on `/events/[slug]` page
- [ ] aws
  - [ ] deploy lambda
  - [ ] deploy sfn
  - [ ] make sfn trigger lambda with wait state from input
  - [ ] 

# References
1. https://aws.plainenglish.io/send-an-email-notification-using-aws-lambda-c7a24751e969
2. 