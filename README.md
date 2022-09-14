# eventify

When an event is created, a step function is initialized such that it will invoke a lambda function at 30m before that event starts. If the event starts in less than 30m, no emails will be sent.
