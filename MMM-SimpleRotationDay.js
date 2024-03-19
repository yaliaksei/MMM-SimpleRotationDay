/* MagicMirror²
 * Module: MMM-SimpleRotationDay
 *
 * Description: display today's school rotation (encore) day.
 * Depends on default calendar module broadcasted events
 * 
 * By Aliaksei Sery
 * MIT Licensed.
 */
Module.register("MMM-SimpleRotationDay", {
	// Default module config.
	defaults: {
		//update every 5 minutes
		updateInterval: 5 * 60 * 1000,
		//fade speed
		fadeSpeed: 4000,
		//initial load delay
		initialLoadDelay: 0,
		//retry delay
		retryDelay: 2500,
		// rotation calendar name as defined in default 'calendar' module
        rotationCalendar: "",
        rotationSchedule: [],
		showTomorrowRotation: true,
		tomorrowRotationStartsFrom: 18,
	  },

	start: function () {
		Log.info("Starting module: " + this.name);

        this.events = [];

		setInterval(() => {
		  this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

    notificationReceived: function(notification, payload, sender) {
	    if (notification === "CALENDAR_EVENTS") {
			this.events = payload.map(e => {
                e.startDate = new Date(+e.startDate);
				return e;
			}).filter( e => {
				if (e.calendarName == this.config.rotationCalendar) {
					return true;
				}
		    });

            this.updateDom();
        }
    }, 

	getDom: function() {
		const wrapper = document.createElement("table");
        wrapper.setAttribute("class", "simple_rotation_day bright")
        
        events = this.events;
        today = new Date();
		var hour = today.getHours();

		// get tomorrow date
		var tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 1);

		if (hour >= this.config.tomorrowRotationStartsFrom
			&& this.config.showTomorrowRotation
		  ) {
			eventDate = tomorrow
			headerWrapper = document.createElement("tr");
			headerWrapper.innerHTML = "Tomorrow"
		} else {
			eventDate = today
			headerWrapper = document.createElement("tr");
			headerWrapper.innerHTML = "Today"
		}

		wrapper.appendChild(headerWrapper);

        for (var e in events) {
			var event = events[e];
            if(eventDate.getDate() == event.startDate.getDate() 
                && eventDate.getFullYear() == event.startDate.getFullYear() 
                && eventDate.getMonth() == event.startDate.getMonth()) {

                    schedules = this.config.rotationSchedules;
                    for (var s in schedules) {
                        
                        studentName = schedules[s].studentName;
                        Log.log("Getting rotation for " + studentName)        
                        for (var r in schedules[s].days) {
                            if (schedules[s].days[r].day == event.title) {
                                eventWrapper = document.createElement("tr");
								eventWrapper.innerHTML = studentName;
                                titleWrapper = document.createElement("td");
                                titleWrapper.innerHTML = schedules[s].days[r].encore;
                                eventWrapper.appendChild(titleWrapper);
                                wrapper.appendChild(eventWrapper);
                            }
                        }
                    }
                break;
            }
        }

        return wrapper;
	}
});
