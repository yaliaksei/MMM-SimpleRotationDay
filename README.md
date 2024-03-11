# MMM-SimpleRotationDay
MagicMirror module to display school rotation day details

## Installation

In the terminal, go to your's MagicMirror intsallation folder and execute the following command:

```
cd modules
```

Clone this repository

```
git clone https://github.com/yaliaksei/MMM-SimpleRotationDay.git
```

## Usage and config

Add following module configuration in config.js

```
...
{
	module: "MMM-SimpleRotationDay",
	position: "top_left", // any position of your choice
	config: {
    	// specify calendars to get today's events from
    	// calendar names should be defined in the default calendar module
		calendars: ["School"],
		// whether module should display tomorrow events
		showTomorrowAgenda: true,
		// if previous value is true, when module should start display them
		// use 24 hour format
		tomorrowAgendaStartsFrom: 18,
        // define schedule for every student in the following format:
        // stundentName - name of student
        // days - collection of days, where every entry is a key-value
        // with key as 'day' defines rotation day and value as 'encore' 
        // defines rotation activity
        rotationSchedules: [
					{
						studentName : "Jonh",
						days : [
							{
								day : "A Day",
								encore : "Gym"
							},
							{
								day : "B Day",
								encore : "Library"
							},
							{
								day : "C Day",
								encore : "Art"
							},
						]
					},
					{
						studentName : "Jack",
						days : [
							{
								day : "A Day",
								encore : "Music"
							},
							{
								day : "B Day",
								encore : "Design"
							},
							{
								day : "C Day",
								encore : "Library"
							},
						]
					} 
					]
	}
},
...
```
